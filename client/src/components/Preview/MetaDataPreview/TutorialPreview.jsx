import React, { useEffect, useState } from 'react';

import './stackDashboard.scss';
import { Link } from "react-router-dom";
import { Edit24, ArrowLeft16, CheckmarkOutline24 } from "@carbon/icons-react";
import { Tabs, Tab, SkeletonPlaceholder, Button, ToastNotification, Accordion, AccordionItem, TooltipDefinition } from 'carbon-components-react';
import ReactMarkdown from 'react-markdown/with-html';
import './Header.scss';
import './OperatorDetails.scss';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import logoImage from './../../../assets/images/dataset.png'
import { Helmet } from 'react-helmet';

import {
    Close32,
    Help24,
    RowCollapse24,
    RowExpand24
} from "@carbon/icons-react";
import MetaData from '../../Forms/Contribution/MetaData/MetaData';

const TutorialPreview = ({
    props,
    tileData,
    dataSets,
    documentData,
    coverData,
    tutorialData
}) => {

    const [tabState, setState] = useState({ selectedTab: 0 })
    const [installState, setInstallState] = useState({
        currentStackInstalled: false
    })

    const bucket = documentData.bucketName[0];

    return (
        <Layout>
            <div className={`contentContainer`}>
                <div className="stackdahsboard__layout">
                    <div id="overlay"></div>
                    <div id='layout'>
                        <div id='main' className='open'>
                            <div className="stackDashboard__container">
                                <>
                                    <div className='custompage-header'>
                                        <div className="customPagebreadcrumb">
                                            <Link className="breadcrumb_homeLink go-to-catalog" >
                                                <ArrowLeft16 />
                                            Go to Catalog
                                        </Link>
                                        </div>
                                    </div>
                                    <div className={'custompage-header-banner '}>
                                        {/* <div className="custom-svg">
                                        
                                        <svg width="32" height="32">
                                        <path d="M29.707 19.293l-3-3a1 1 0 00-1.414 0L16 25.586V30h4.414l9.293-9.293a1 1 0 000-1.414zM19.586 28H18v-1.586l5-5L24.586 23zM26 21.586L24.414 20 26 18.414 27.586 20zM18 18v-4h2v4zM14 18v-6h2v6zM10 18V8h2v10z" />
                                        <path d="M12 30H6a2.002 2.002 0 01-2-2V4a2.002 2.002 0 012-2h16a2.002 2.002 0 012 2v10h-2V4H6v24h6z" />
                                        <path fill="none" d="M0 0h32v32H0z" />
                                        </svg>

                                    </div> */}
                                        <div className="tile-icon">
                                            {tileData.selectedImgPreview ?
                                                tileData.selectedImgPreview !== undefined && <img src={tileData.selectedImgPreview} />
                                                :
                                                <img height="" src={logoImage} />
                                            }
                                            {/* <img height="" src={URL.createObjectURL(catalog.selectedLogo)} alt="" /> */}
                                        </div>
                                        <div className="custom-header">
                                            <div>
                                                <div className='custom-header-title'>
                                                    <h3>{tileData.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                <div className="dashboard__tabs meta-data-preview">
                                    <Tabs
                                        selected={tabState.selectedTab}
                                        tabContentClassName='Container__right-sidebar-tabs--content'
                                    // onSelectionChange={newSelection => {
                                    //     setState({...tabState, selectedTab: newSelection})
                                    // }}
                                    >

                                        <Tab id="stack_operator_commands" label="Installer">
                                            <div className={`some-content`}>
                                                {/* <OperatorDetails project={selectedStackData} commandsArray={commandsToExecute} executeButton={true} /> */}
                                                <div className="ProjectDetailsContainer">
                                                    <div className="ProjectDetails">
                                                        {documentData.installTime !== '' && documentData.installTime !== undefined && documentData.installTime !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Install Time:</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.installTime} minutes
                                                                </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.type !== '' && tileData.type !== undefined && tileData.type !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Type:</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {tileData.type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.datasetBuckets.length > 0 && tileData.type == "Notebook" &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Bucket Name :</span>
                                                                <div className="BoldFont">
                                                                    <div className={(documentData.datasetBuckets.length > 1) ? 'fade-effect' : ''}>
                                                                        <span>{documentData.datasetBuckets[0]}</span>
                                                                        {documentData.datasetBuckets.length > 1 ? (
                                                                            [<span>,</span>,
                                                                            <span className='number'>
                                                                                <TooltipDefinition align='center'
                                                                                    tooltipText={documentData.datasetBuckets.join(', ')}
                                                                                >
                                                                                    +
                                                                            {documentData.datasetBuckets.length - 1}
                                                                                </TooltipDefinition>
                                                                            </span>]
                                                                        ) : (
                                                                                null
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.datasetS3Buckets.length > 0 && tileData.tag == "S3" && tileData.type == "Dataset" &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Bucket Name :</span>
                                                                <div className="BoldFont">
                                                                    <div className={(documentData.datasetS3Buckets.length > 1) ? 'fade-effect' : ''}>
                                                                        <span>{documentData.datasetS3Buckets[0]}</span>
                                                                        {documentData.datasetS3Buckets.length > 1 ? (
                                                                            [<span>,</span>,
                                                                            <span className='number'>
                                                                                <TooltipDefinition align='center'
                                                                                    tooltipText={documentData.datasetS3Buckets.join(', ')}
                                                                                >
                                                                                    +
                                                                            {documentData.datasetS3Buckets.length - 1}
                                                                                </TooltipDefinition>
                                                                            </span>]
                                                                        ) : (
                                                                                null
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.tag !== '' && tileData.tag !== undefined && tileData.tag !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Tag:</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {tileData.tag}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.type === "Dataset" && tileData.selectedDatasetCategories.length > 0 &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Categories:</span>
                                                                <div className="BoldFont">
                                                                    <div className={(tileData.selectedDatasetCategories.length > 1) ? 'fade-effect' : ''}>
                                                                        <span>{tileData.selectedDatasetCategories[0].label}</span>
                                                                        {tileData.selectedDatasetCategories.length > 1 ? (
                                                                            [<span>,</span>,
                                                                            <span className='number'>
                                                                                <TooltipDefinition align='center'
                                                                                   tooltipText={tileData.selectedDatasetCategories.map(function (element) {
                                                                                    return element.label;
                                                                                }).join(', ')}
                                                                                >
                                                                                    +
                                                                            {tileData.selectedDatasetCategories.length - 1}
                                                                                </TooltipDefinition>
                                                                            </span>]
                                                                        ) : (
                                                                                null
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.type === "Notebook" && tileData.selectedNotebookCategories.length > 0 &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Categories:</span>
                                                                <div className="BoldFont">
                                                                    <div className={(tileData.selectedNotebookCategories.length > 1) ? 'fade-effect' : ''}>
                                                                        <span>{tileData.selectedNotebookCategories[0].label}</span>
                                                                        {tileData.selectedNotebookCategories.length > 1 ? (
                                                                            [<span>,</span>,
                                                                            <span className='number'>
                                                                                <TooltipDefinition align='center'
                                                                                    tooltipText={tileData.selectedNotebookCategories.map(function (element) {
                                                                                        return element.label;
                                                                                    }).join(', ')}
                                                                                >
                                                                                    +
                                                                            {tileData.selectedNotebookCategories.length - 1}
                                                                                </TooltipDefinition>
                                                                            </span>]
                                                                        ) : (
                                                                                null
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.lastUpdated !== '' && documentData.lastUpdated !== undefined && documentData.lastUpdated !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Last Updated:</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.lastUpdated}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.preferredPlatform !== '' && documentData.preferredPlatform !== undefined && documentData.preferredPlatform !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Preferred Platform :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.preferredPlatform}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.managedBy !== '' && documentData.managedBy !== undefined && documentData.managedBy !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Managed By :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.managedBy}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.contact !== '' && documentData.contact !== undefined && documentData.contact !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Contact :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.contact.join(', ')}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.license !== '' && documentData.license !== undefined && documentData.license !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>License and Use Rights :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.license}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.cloudService !== '' && documentData.cloudService !== undefined && documentData.cloudService !== null && tileData.tag == "S3" &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>cloud Service :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.cloudService}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.region !== '' && documentData.region !== undefined && documentData.region !== null && tileData.tag == "S3" &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Region :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.region}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.tag === "CSV" && documentData.sourceRepo !== '' && documentData.sourceRepo !== undefined && documentData.sourceRepo !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Source Repo :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.sourceRepo}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.type === "Notebook" && documentData.notebookSourceUrl !== '' && documentData.notebookSourceUrl !== undefined && documentData.notebookSourceUrl !== null && tileData.type == "Notebook" &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Source Repo :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.notebookSourceUrl}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {tileData.type === "Dataset" && documentData.usageExample !== '' && documentData.usageExample !== undefined && documentData.usageExample !== null &&
                                                            <div className="ProjectDetailsItem">
                                                                <span>Usage Example (Url) :</span>
                                                                <div className="BoldFont">
                                                                    <span >
                                                                        {documentData.usageExample}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                        {documentData.datasetCatalogId !== '' && documentData.datasetCatalogId !== undefined && documentData.datasetCatalogId !== null && tileData.type == "Notebook" &&
                                                            < div className="ProjectDetailsItem">
                                                                <span>Dataset Catalog Id:</span>
                                                        <div className="BoldFont">
                                                            <span >
                                                                {documentData.datasetCatalogId}
                                                            </span>
                                                        </div>
                                                    </div>
                                                        }
                                                        {documentData.gitUrl !== '' && documentData.gitUrl !== undefined && documentData.gitUrl !== null &&
                                                        <div className="ProjectDetailsItem">
                                                            <span className="fade-effect">Git url</span>
                                                            <div className="BoldFont">
                                                                <span >
                                                                    {documentData.gitUrl}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {/* Executation Section */}
                                            <div className="execute_section">
                                                <div className="executeButton">
                                                    <Button kind='primary' tabIndex={0}>
                                                        {tileData.type === "Dataset" ? "Deploy Dataset" : "Deploy Notebook"}
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="OperatorDetails">
                                                {/* <div className="commands_section">
                                                        <Accordion>
                                                            <AccordionItem open={true} title="Commands">
                                                                <div className="CardContent">
                                                                    <div className="CommandBlock" >
                                                                        <span className="CodeInstruction">
                                                                        Command Name
                                                                        </span>
                                                                        <div className="CodeBlock">sample command : export ip_addr=$(ifconfig eth1 | grep inet | cut -f2 -d:)</div>
                                                                    </div>
                                                                </div>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    </div> */}
`

                                                </div>
                                            </div>
                                        </Tab>
{/* 
                                    <Tab id={'dashBoard'} label="Documentation">
                                        <div className={`some-content`}>
                                            <ReactMarkdown
                                                source={coverData.cover}
                                                escapeHtml={false}
                                            />
                                        </div>
                                    </Tab> */}
                                    </Tabs>
                            </div>
                        </div>
                    </div>
                    {
                        tutorialData.isTutorialAvailable ? 
                        (<>
                            {/* <div onClick = {() => onDivload()} id="seperator"></div> */}
                                <div id='right'>
                                    <div>
                                        <div className='content'>
                                            <openlabs-guide 
                                                // appenPrefix={process.env.REACT_APP_GUIDE_PANEL_PREFIX}
                                                // commitId = {commitId}
                                                // catalogId={selectedCatalogId} 
                                                metadata={JSON.stringify(documentData)}
                                                appLayout="accordion"
                                                appTheme="g90"
                                                footerPath="footer.md"
                                                tutorials={JSON.stringify(tutorialData.tutorials)}
                                                demos={JSON.stringify(tutorialData.demos)}
                                                usefulLinks={JSON.stringify(tutorialData.usefulLinks)}
                                                footerContent={tutorialData.footer_content}
                                                images={JSON.stringify(tutorialData.images)}
                                                >
                                            </openlabs-guide>
                                            <Helmet>
                                                <script src={process.env.PUBLIC_URL + '/js/openlabs-guide.js'} />
                                                {/* <script src="/assets/js/openlabs-guide.js"></script> */}
                                            </Helmet>
                                        </div>
                                    </div>
                                </div>
                        </>) : ''
                    }
                </div>
            </div>
            </div>
        </Layout >
    )
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    dataSets: state.createEnvDetails.dataSets,
    documentData: state.createEnvDetails.documentData,
    coverData: state.createEnvDetails.coverData,
    tutorialData: state.createEnvDetails.tutorialData
})

export default connect(mapStateToProps)(TutorialPreview)

