import * as actions from '../actions/createEnvActions'

export const initialState = {
    coverData: {},
    documentData: {},
    tileData: {},
    tutorialData: {},
    contibuteTo: 'data_explorer',
    stacksMasterData: null,
    metaConfigData: '',
    dataSets: null,
    loggedIn: false,
    userInfo: ''
}

export default function createEnvreducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_COVER_DATA:
            return { ...state, coverData: action.payload }
        case actions.SET_DOCUMENT_DATA:
            return { ...state, documentData: action.payload }
        case actions.SET_TILE_DATA:
            return { ...state, tileData: action.payload }
        case actions.SET_TUTORIAL_DATA:
            return { ...state, tutorialData: action.payload }
        case actions.SET_PARENT_REPO_AVAILABLE:
            return { ...state, parentRepoClonned: action.payload }
        case actions.SET_STACKS_MASTER_DATA:
            return { ...state, stacksMasterData: action.payload }
        case actions.SET_META_CONFIG_DATA:
            return { ...state, metaConfigData: action.payload }
        case actions.SET_DATASET_TYPES:
            return { ...state, dataSets: action.payload }
        case actions.SET_LOGGED_IN:
            return { ...state, loggedIn: action.payload }
        case actions.SET_LOGGEDIN_USERINFO:
            return { ...state, userInfo: action.payload }
        default:
            return state
    }
}
