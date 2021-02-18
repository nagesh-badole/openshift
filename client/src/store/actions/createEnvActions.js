// content actions
export const SET_COVER_DATA = 'SET_COVER_DATA'
export const setCoverData = coverData => ({
    type: SET_COVER_DATA,
    payload: coverData,
})

// content actions
export const SET_TUTORIAL_DATA = 'SET_TUTORIAL_DATA'
export const setTutorialData = tutorialData => ({
    type: SET_TUTORIAL_DATA,
    payload: tutorialData,
})

// content actions
export const SET_DOCUMENT_DATA = 'SET_DOCUMENT_DATA'
export const setDocumentData = documentdata => ({
    type: SET_DOCUMENT_DATA,
    payload: documentdata,
})

// content actions
export const SET_TILE_DATA = 'SET_TILE_DATA'
export const setTileData = tiledata => ({
    type: SET_TILE_DATA,
    payload: tiledata,
})

// content actions
export const SET_PARENT_REPO_AVAILABLE = 'SET_PARENT_REPO_AVAILABLE'
export const setNoParentRepo = parentRepo => ({
    type: SET_PARENT_REPO_AVAILABLE,
    payload: parentRepo,
})

export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const setloggedIn = loggenInFlag => ({
  type: SET_LOGGED_IN,
  payload: loggenInFlag,
})

export const SET_LOGGEDIN_USERINFO = 'SET_LOGGEDIN_USERINFO'
export const setLoggedInUserInfo = userInfo => ({
  type: SET_LOGGEDIN_USERINFO,
  payload: userInfo,
})

export function cloneParent(contribute_to) {

    let repoUrl = ''
    let repoName = ''

    if (contribute_to === 'labguide') {
        repoUrl = process.env.REACT_APP_LABGUIDE_BASE_REPO
        repoName = process.env.REACT_APP_LABGUIDE_BASE_REPO_NAME
    } else if (contribute_to === 'data_explorer') {
        repoUrl = process.env.REACT_APP_DATAEXPLORER_BASE_REPO
        repoName = process.env.REACT_APP_DATAEXPLORER_BASE_REPO_NAME
    } else {
        repoUrl = process.env.REACT_APP_DATAEXPLORER_BASE_REPO
        repoName = process.env.REACT_APP_DATAEXPLORER_BASE_REPO_NAME
    }

    if (repoUrl !== '' && repoName !== '') {

        return (dispatch) => {

            fetch(process.env.REACT_APP_API_BASE_URL + '/' + 'api/v1/clone-parent?repoUrl=' + repoUrl + '&repoName=' + repoName, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            )
                .then((res) => res.json())
                .then((res) => {
                    if (res.error) {
                        if (res.error.httpStatusCode === 404) {
                            dispatch(setNoParentRepo(true));
                        }
                        throw res.error;
                    } else {
                        if (res.response === 'deleted') {
                            dispatch(cloneParent())
                        } else {
                            console.log(res)
                            dispatch(readStackFile(repoName))
                        }
                    }
                })
                .catch((error) => {

                    console.log("error", error);
                });
        };
    }

}

export function readStackFile(repoName) {
    return (dispatch) => {

        fetch(process.env.REACT_APP_API_BASE_URL + '/' + repoName + '/_files/stacks.json?v='+Date.now(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {

                    if (res.error.httpStatusCode === 404) {
                        dispatch(setNoParentRepo(true));
                    }
                    throw res.error;
                } else {
                   
                    dispatch(setStacksMasterData(res));
                    //create a array of id + name if all dataset stacks to be used in notebook
                    const datasetItems = []
                    res.filter(function (tile) {
                        if (tile.category_label[0] === 'Dataset') {
                            if(tile.tag[0] === 'S3') {
                                // if we can get the buckets here , we can push the same here to be dynamically set when user choose
                                datasetItems.push({id: tile.de_catalog_id , text: tile.title, dataType: tile.tag[0], buckets: tile.buckets});
                            } else {
                                datasetItems.push({id: tile.de_catalog_id , text: tile.title, dataType: tile.tag[0], buckets: []});
                            }
                            
                        }
                    });
                    dispatch(setDatasetsType(datasetItems))
                    dispatch(readDynamicMetaConfig(repoName));
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
}

// read the meta form foelds to be created and stotre in store. create fields as per this in meta data section
export function readDynamicMetaConfig(repoName) {
    return (dispatch) => {

        fetch(process.env.REACT_APP_API_BASE_URL + '/' + repoName + '/_files/meta_config.json', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {

                    if (res.error.httpStatusCode === 404) {
                        dispatch(setNoParentRepo(true));
                    }
                    throw res.error;
                } else {
                    dispatch(setMetaConfig(res));
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
}

// content actions
export const SET_STACKS_MASTER_DATA = 'SET_STACKS_MASTER_DATA'
export const setStacksMasterData = stackData => ({
    type: SET_STACKS_MASTER_DATA,
    payload: stackData,
})


// content actions
export const SET_META_CONFIG_DATA = 'SET_META_CONFIG_DATA'
export const setMetaConfig = metaConfig => ({
    type: SET_META_CONFIG_DATA,
    payload: metaConfig,
})

// content actions
export const SET_DATASET_TYPES = 'SET_DATASET_TYPES'
export const setDatasetsType = datasets => ({
    type: SET_DATASET_TYPES,
    payload: datasets,
})
