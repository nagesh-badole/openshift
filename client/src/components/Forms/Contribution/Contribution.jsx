import React, { useState, useEffect } from 'react';
import './Contribution.scss';
import { connect } from 'react-redux';
import Layout from '../../Layout/Layout';
import store from '../../../store/store';
import 'carbon-components/css/carbon-components.min.css';
import 'github-markdown-css';
import * as DATA from '../../../helpers/config.json';
import _map from 'lodash/map';
import CatalogDetails from './CatalogDetails/CatalogDetails';
import ProductDetails from './ProductDetails/ProductDetails';
import MetaData from './MetaData/MetaData';
import { Tab, TabPanel, Tabs, TabList } from 'react-web-tabs';
import "react-web-tabs/dist/react-web-tabs.css";
import { cloneParent } from '../../../store/actions/createEnvActions';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'
import { Button } from 'carbon-components-react';
import { Download24 } from "@carbon/icons-react";
import * as CONTENT from '../../../helpers/cover-content.json';
import TutorialDetails from './TutorialDetails/TutorialDetails';

const Contribution = ({ contibuteTo, tileData, documentData, coverData, tutorialData }) => {

    // get the parent repo clonned, this will help for getting stacks.json and also dynamic form fields incase of metadata
    useEffect(() => {
        if (contibuteTo !== undefined && contibuteTo !== '' && contibuteTo !== null) {
            store.dispatch(cloneParent(contibuteTo))
        }
    }, [contibuteTo])

    let stackJson = {};
    let documentJson = {};
    let tutorialJson = {};

    const createJson = () => {
        let categoryArray = []
        if (tileData.type == "Dataset") {
            if (tileData.selectedDatasetCategories && tileData.selectedDatasetCategories.length > 0 && tileData.selectedDatasetCategories !== undefined) {
                tileData.selectedDatasetCategories.forEach((selected) => categoryArray.push(selected.label));
            }

        } else if (tileData.type == "Notebook") {
            if (tileData.selectedNotebookCategories && tileData.selectedNotebookCategories.length > 0 && tileData.selectedNotebookCategories !== undefined) {
                tileData.selectedNotebookCategories.forEach((selected) => categoryArray.push(selected.label));
            }

        } else if (tileData.type == "API") {
            if (tileData.selectedApiCategories && tileData.selectedApiCategories.length > 0 && tileData.selectedApiCategories !== undefined) {
                tileData.selectedApiCategories.forEach((selected) => categoryArray.push(selected.label));
            }
        } else if (tileData.type == "Operators") {
            if (tileData.selectedOperatorCategories && tileData.selectedOperatorCategories.length > 0 && tileData.selectedOperatorCategories !== undefined) {
                tileData.selectedOperatorCategories.forEach((selected) => categoryArray.push(selected.label));
            }
        } else if (tileData.type == "Course") {
            if (tileData.selectedCourseCategories && tileData.selectedCourseCategories.length > 0 && tileData.selectedCourseCategories !== undefined) {
                tileData.selectedCourseCategories.forEach((selected) => categoryArray.push(selected.label));
            }
        }
        let catalog_id = tileData.title.replace(/\s/g, "_");
        catalog_id = tileData.type == "Dataset" ? catalog_id + "_dataset_" + Date.now() : 
            tileData.type == "Notebook" ? catalog_id + "_notebook_" + Date.now() : 
            tileData.type == "API" ? catalog_id + "-api_" + Date.now() :
            tileData.type == "Operators" ? catalog_id + "-operator_" + Date.now() :
            catalog_id + "-course_" + Date.now()

        stackJson = {
            "title": tileData.title,
            "description": tileData.description,
            "logo": tileData.selectedLogo ? '_images/' + tileData.selectedLogo.name : "_images/dataset.png",
            "enabled": true,
            "category_label": [tileData.type],
            "document": "", 
            "stack_id": catalog_id,
            "de_catalog_id": catalog_id,
            "type": tileData.type,
            "categories": categoryArray,
            "tag": tileData.tag ? [tileData.tag] : [],
            "has_api": tileData.type == "API" ? true : documentData.hasApi , 
            "has_dataset": tileData.type == "Dataset" ? true : documentData.hasDataset, 
            "is_certified": documentData.isCertified, 
            "has_support" : documentData.hasSupport,  
            "git_url": "",
            "git_commit": "",
            "installTime": documentData.installTime + " minutes"
        }

        documentJson = {
            "name": tileData.title,
            "description": tileData.description,
            "logo": tileData.selectedLogo ? '_images/' + tileData.selectedLogo.name : "_images/dataset.png",
            "has_supporting_content": (tileData.type == "Operators" || tileData.type == "Course") && tutorialData.isTutorialAvailable ? true : false,
            "stack_id": catalog_id,
            "de_catalog_id": catalog_id,  
            "type" : tileData.type, 
            "Categories": categoryArray,
            "source_repo":  (tileData.type === "API") || (tileData.type === "Operators")|| (tileData.type === "Notebook") || (tileData.type == "Dataset" && tileData.tag === "CSV") ? documentData.source_repo : '',
            "cover": "cover.md",
            "use_explorer_dataset": documentData.isUsingExistingDataset,
            "explorer_catalog_id": documentData.datasetCatalogId && documentData.datasetCatalogId !== '' ? documentData.datasetCatalogId : '',
            "use_catalog_dataset": "", 
            "is_s3_type": documentData.datasetType == "S3",
            "buckets": tileData.tag == "S3" ? documentData.datasetS3Buckets : documentData.datasetBuckets,
            "meta": {
                "Install Time": [
                    documentData.installTime + " minutes"
                ],
                "Type": [
                    tileData.type
                ],
                "Dataset": [
                    tileData.type == "Notebook" && documentData.isUsingExistingDataset ? documentData.datasetNotebookTitle : ''
                ],
                "Tag": tileData.tag ? [tileData.tag] : [],
                "Categories": categoryArray,
                "Catalog Id": [
                    catalog_id
                ],
                "buckets": documentData.datasetCatalogId && documentData.datasetCatalogId.length > 0 ? documentData.datasetBuckets : '',
                // "license_and_use_rights": [documentData.license],
                // "last_updated": [documentData.lastUpdated],
                // "contact": [documentData.contact],
                // "preferred_platform": [documentData.preferredPlatform],
                // "usage_example": [documentData.usageExample],
                // "managed_by": [documentData.managedBy]
                "Contact": documentData.contact,
                ...documentData.meta
            },

            "commands": documentData.commands,
            "deployment_information": {
               "Dataset" : "/home/student/projects/"+catalog_id,
               "API" : "/home/student/projects/"+catalog_id,
               "Operator_Project" : "NA",
               "Deployment_Namespace" : "my-"+catalog_id+"-operator-app",
             },
            "display": [
                {
                    "name": "Developer Dashboard",
                    "url": "##DNS.host##/codeserver",
                    "enabled": true
                }
            ]
        }

        tutorialJson = {
            "name": tutorialData.name,
            "appLayout": tutorialData.appLayout,
            "appTheme": tutorialData.appTheme,
            "footer": tutorialData.footer,
            "tutorials": tutorialData.tutorials,
            "usefulLinks": tutorialData.usefulLinks,
            "demos": tutorialData.demos
        }
    }

    const createZip = () => {
        createJson();
        var zip = new JSZip()

        var img = zip.folder("_images");

        // removal of extra fields , put checks related to what type this is and remove fields which are not required
        let tempDocumentdata = { ...documentJson }
        if (documentJson.meta.Type[0] === 'Dataset') {
            delete tempDocumentdata.meta.Command
            delete tempDocumentdata.deployment_information.API
            delete tempDocumentdata.deployment_information.Operator_Project
            delete tempDocumentdata.deployment_information.Deployment_Namespace
            if (documentJson.meta.Tag[0] === 'CSV') {
                delete tempDocumentdata.buckets
                delete tempDocumentdata.use_explorer_dataset
                delete tempDocumentdata.explorer_catalog_id
                delete tempDocumentdata.is_s3_type
                delete tempDocumentdata.meta.buckets
                delete tempDocumentdata.meta.datasetNotebookTitle
            } else if (documentJson.meta.Tag[0] === 'S3') {
                delete tempDocumentdata.use_explorer_dataset
                delete tempDocumentdata.explorer_catalog_id
                delete tempDocumentdata.is_s3_type
                delete tempDocumentdata.source_repo
                delete tempDocumentdata.meta.datasetNotebookTitle
            }
        } else if (documentJson.meta.Type[0] === 'Notebook') {
            delete tempDocumentdata.meta.Tag
            delete tempDocumentdata.meta.usage_example
            delete tempDocumentdata.meta.Command
            delete tempDocumentdata.deployment_information
            if (!documentJson.use_explorer_dataset) {
                delete tempDocumentdata.buckets
                // delete tempDocumentdata.use_explorer_dataset
                delete tempDocumentdata.explorer_catalog_id
                delete tempDocumentdata.is_s3_type
                delete tempDocumentdata.meta.buckets
                delete tempDocumentdata.meta.datasetNotebookTitle
            } else if (documentJson.use_explorer_dataset) { }
        } else if (documentJson.meta.Type[0] === 'API') {
            delete tempDocumentdata.meta.Tag
            delete tempDocumentdata.meta.usage_example
            delete tempDocumentdata.explorer_catalog_id
            delete tempDocumentdata.meta.buckets
            delete tempDocumentdata.buckets
            delete tempDocumentdata.meta.datasetNotebookTitle
            delete tempDocumentdata.meta.Dataset
            delete tempDocumentdata.commands
            delete tempDocumentdata.deployment_information.Dataset
            delete tempDocumentdata.deployment_information.Operator_Project
            delete tempDocumentdata.deployment_information.Deployment_Namespace
        } else if (documentJson.meta.Type[0] === 'Operators') {
            delete tempDocumentdata.meta.Tag
            delete tempDocumentdata.meta.usage_example
            delete tempDocumentdata.explorer_catalog_id
            delete tempDocumentdata.meta.buckets
            delete tempDocumentdata.buckets
            delete tempDocumentdata.meta.datasetNotebookTitle
            delete tempDocumentdata.de_catalog_id
            delete tempDocumentdata.meta.Dataset
            delete tempDocumentdata.deployment_information.Dataset
            delete tempDocumentdata.deployment_information.API
        } else if (documentJson.meta.Type[0] === 'Course') {
            delete tempDocumentdata.meta.Tag
            delete tempDocumentdata.meta.usage_example
            delete tempDocumentdata.explorer_catalog_id
            delete tempDocumentdata.meta.buckets
            delete tempDocumentdata.buckets
            delete tempDocumentdata.meta.datasetNotebookTitle
            delete tempDocumentdata.de_catalog_id
            delete tempDocumentdata.meta.Dataset
            delete tempDocumentdata.deployment_information
            delete tempDocumentdata.commands
        }

        let tempStackdata = { ...stackJson }
        if (tempStackdata.tag.length == 1 && tempStackdata.tag[0] == "") {
            tempStackdata.tag.pop()
        }

        zip.file("stacks.json", JSON.stringify(tempStackdata, undefined, 2));
        zip.file("cover.md", coverData.cover);

        zip.file("document.json", JSON.stringify(tempDocumentdata, undefined, 2));
        zip.file("readme.md", CONTENT.readme.join('\n'));

        if ( (tileData.type == "Operators" || tileData.type == "Course") && tutorialData.isTutorialAvailable) {
            let tempTutorialData = { ...tutorialJson }

            //tutorial folder creation
            var tutorial = zip.folder("tutorials");
            var index = 0;
            tempTutorialData.tutorials.forEach((tut) => {
                tutorial.file(tut.tutorial_name, tut.tutorial_content.text)
                delete tempTutorialData.tutorials[index].tutorial_content;
                index++;
            })

            tutorial.file("footer.md", tutorialData.footer_content);
            tutorial.file("tutorial.json", JSON.stringify(tempTutorialData, undefined, 2));

            if (tutorialData.images && tutorialData.images.length > 0 && tutorialData.images !== null && tutorialData !== undefined) {
                tutorialData.images.forEach((image) => img.file(image.name, image.fileData, { base64: true }))
            }
        }


        if (tileData.selectedLogo) {
            img.file(tileData.selectedLogo.name, tileData.selectedLogo, { base64: true });
        }

        if (coverData.images && coverData.images.length > 0 && coverData.images !== null && coverData.images !== undefined) {
            coverData.images.forEach((image) => img.file(image.name, image.fileData, { base64: true }))
        }

        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "Contribute.zip");
        });

    }


    return (
        <Layout>
            {/* <div className="contribute-title">
                Contribute
            </div> */}
            <div id="content__section" className="body">
                <Tabs
                    defaultTab="vertical-tab-one"
                    vertical
                    onChange={() => { document.getElementById('content__section').scrollTo(0, 0); }}
                    className="vertical-tabs">

                    <TabList>
                        <Tab tabFor="vertical-tab-one">Tile Info</Tab>
                        <Tab tabFor="vertical-tab-two">Meta Data</Tab>
                        {
                            (tileData.type == "Operators" || tileData.type == "Course" )  && 
                            <Tab tabFor="vertical-tab-three">Tutorials</Tab>
                        }
                        {/* <Tab tabFor="vertical-tab-three">Tutorials</Tab> */}
                        <Tab tabFor="vertical-tab-four">Cover Info</Tab>
                        <Tab tabFor="vertical-tab-five">Download</Tab>
                    </TabList>

                    <TabPanel tabId="vertical-tab-one">
                        <CatalogDetails />
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-two">
                        <MetaData />
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-three">
                        <TutorialDetails />
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-four">
                        <ProductDetails />
                    </TabPanel>

                    <TabPanel tabId="vertical-tab-five">
                        <div className="dowload-tab">
                            {/* {console.log('status...',tileData.isValidated, documentData.isValidated, coverData.isValidated, tutorialData.isValidated)} */}
                            {/* <Button size="small" onClick={createZip} className="downlaod-zip-disabled">Download</Button> */}
                            {
                                tileData.isValidated && documentData.isValidated && coverData.isValidated && tutorialData.isValidated?
                                    (<div>
                                        <h2><Download24 style={{ marginRight: '0.5rem' }} /> Your contribution content is ready!</h2>
                                        <br />
                                        <Button size="small" onClick={createZip} className="downlaod-zip">Download</Button>
                                        <br /><br />
                                        <div className="after-download-instructions">
                                            Please refer the readme in the downloaded content for instructions on next step
                                        </div>
                                    </div>) :
                                    <div className="before-download-instructions">
                                        <h4>Please complete the contribution process to proceed with download</h4>
                                        <br /><br />
                                        <Button size="small" disabled onClick={createZip} className="downlaod-zip-disabled">Download</Button>
                                    </div>
                            }
                        </div>
                    </TabPanel>
                </Tabs>

                {/* <div className="form">
                    <div className="catalog-body">
                        <div id="catalog-details">
                            <CatalogDetails />
                        </div>
                        <hr></hr>
                        <div id="meta-data" style={{ marginBottom: '4%' }}>
                            <MetaData />
                        </div>
                        <hr />
                        <div id="cover-data" style={{ marginBottom: '18%' }}>
                            <ProductDetails />
                        </div>
                    </div>
                </div> */}
            </div>
        </Layout>
    )
}

const scrollPositionTo = (elementId) => {
    const element = document.getElementById(elementId)
    if (element && element !== undefined && element !== null) {
        element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    documentData: state.createEnvDetails.documentData,
    coverData: state.createEnvDetails.coverData,
    tutorialData: state.createEnvDetails.tutorialData,
    contibuteTo: state.createEnvDetails.contibuteTo
})

export default connect(mapStateToProps)(Contribution)
