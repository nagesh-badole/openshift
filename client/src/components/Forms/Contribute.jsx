// import React, { useEffect, useState } from 'react'
// import './Contribute.scss'
// import { connect } from 'react-redux'
// import Layout from '../Layout/Layout'
// import { Button } from 'carbon-components-react'
// import store from '../../store/store'
// import * as DATA from './../../helpers/config.json'
// import 'carbon-components/css/carbon-components.min.css';
// import { Accordion, AccordionItem } from 'carbon-components-react';
// import { setDocumentsData } from '../../store/actions/createEnvActions'
// import JSZip from 'jszip'
// import { saveAs } from 'file-saver'
// import Stack from './Stack'
// import Document from './Document'
// import Tutorial from './Tutorial'
// import 'github-markdown-css'
// import structure from '../../assets/images/structure.png'
// import tutorial_structure from '../../assets/images/tutorial.png'
// import stacks_img from '../../assets/images/stacks.png'
// import document_img from '../../assets/images/document.png'
// import tutorial_base from '../../assets/images/tutorial_base.png'
// import tutorial_sample from '../../helpers/tutorial_sample.json'
// import document_sample from '../../helpers/document_sample.json'
// import stack_sample from '../../helpers/stacks_sample.json'
// import * as footercontent from '../../helpers/footer-content.json'
// import * as tutorialcontent from '../../helpers/tutorial-content.json'
// import * as covercontent from '../../helpers/cover-content.json'
// import commit_img from '../../assets/images/full_commit.png'
// import git_url from '../../assets/images/git_url.png'

// const Contribute = ({ stacksData, documentsData, tutorialsData }) => {

//     // create a zip with sample data from config
//     const createZipWithSampleData = () => {
//         var zip = new JSZip()
//         zip.file("stacks.json", JSON.stringify(stack_sample, undefined, 2));
//         // Generate cover.md
//         zip.file("cover.md", covercontent.content);
//         // create document.json
//         zip.file("document.json", JSON.stringify(document_sample, undefined, 2));
//         // create document.json
//         zip.file("README.md", "##Sample Stack created using Playground Stack Creator");
//         //create images folder
//         zip.folder("_images")
//         //create tutorials folder
//         zip.folder("sample-app")
//         //create tutorials folder
//         zip.folder("tutorials")
//         // Generate md file for tutorial
//         zip.folder("tutorials").file('Sample_tutorial_1.md', tutorialcontent.content);
//         // Generate footer.md in tutorial folder
//         zip.folder("tutorials").file("footer.md", footercontent.content)
//         //create tutorials json
//         zip.folder("tutorials").file("tutorial.json", JSON.stringify(tutorial_sample, undefined, 2));
//         zip.generateAsync({ type: "blob" }).then(function (content) {
//             saveAs(content, "StackBuilder.zip");
//         });
//     }

//     const createZip = () => {
//         console.log("inside stacks");
//         console.log(stacksData);
//         // create a file with jzip module
//         var zip = new JSZip()

//         console.log('stacks data', stacksData)
//         // create stack.json
//         zip.file("stacks.json", JSON.stringify(stacksData, undefined, 2));
//         console.log('cover.md', documentsData.cover_content)
//         // Generate cover.md
//         zip.file("cover.md", documentsData.cover_content);

//         let tempDocumentdata = { ...documentsData }

//         delete tempDocumentdata.cover_content
//         console.log('document.json', tempDocumentdata)
//         // create document.json
//         zip.file("document.json", JSON.stringify(tempDocumentdata, undefined, 2));
//         console.log('README.md', '##Sample readme content')
//         // create document.json
//         zip.file("readme.md", "#Dummy Readme Content");


//         //create images folder
//         zip.folder("_images")

//         //create tutorials folder
//         zip.folder("sample-app")

//         let tempTutorialData = { ...tutorialsData }

//         if (Object.keys(tempTutorialData).length !== 0) {
//             //create tutorials folder
//             zip.folder("tutorials")

//             // Generate md file for tutorial
//             console.log((tutorialsData))

//             for (let i = 0; i < tempTutorialData.tutorials.length; i++) {
//                 tempTutorialData.tutorials[i].tutorial_name = tempTutorialData.tutorials[i].tutorial_name + '.md'
//                 zip.folder("tutorials").file(tempTutorialData.tutorials[i].tutorial_name, tempTutorialData.tutorials[i].tutorial_content);
//                 delete tempTutorialData.tutorials[i].tutorial_content
//             }

//             console.log('footer.md', tutorialsData.footer_content)
//             // Generate footer.md in tutorial folder
//             zip.folder("tutorials").file("footer.md", tutorialsData.footer_content)

//             delete tempTutorialData.footer_content

//             console.log('tutorial.json', tempTutorialData)
//             //create tutorials json
//             zip.folder("tutorials").file("tutorial.json", JSON.stringify(tempTutorialData, undefined, 2));
//         }

//         zip.generateAsync({ type: "blob" }).then(function (content) {
//             saveAs(content, "StackBuilder.zip");
//         });

//     }


//     return (
//         <Layout>
//             <div className="contribute-title">
//                 Contribute
//             </div>
//             <div className="contribute-body">
//                 <div className={`bg-img markdown-body`}>

//                     {/*contribution div*/}
//                     <div className="contribution-guide">
//                         <h3 style={{ marginLeft: '10rem' }}>Contribution Guide</h3>
//                         <p>We encourage the developer community to contribute to :</p>
//                         <ul>
//                             <li><strong>Stacks</strong></li>
//                             <li><strong>Datasets</strong></li>
//                             <li><strong>API Collection</strong></li>
//                         </ul>
//                         <p>Each Stack/Dataset/API Collection requires a Git Repository to be created with a predefined folder structure as shown below.</p>
//                         <img src={structure} alt={`folder structure`} />
//                         <p>Following are the steps that will help to do the same.</p>
//                         <ul>
//                             <li>
//                                 <p><span className="download_sample" onClick={() => createZipWithSampleData()}>Download</span> the sample stack folder with sample data and start editing each file in your favorite editor.</p>
//                             </li>
//                             <li>
//                                 <p>Fill in all the necessary details in the forms on right and your folder will be created with the data you entered.</p>
//                             </li>
//                         </ul>

//                         <p>Checkout below guidelines on filling each form : </p>
//                         <ul>
//                             <li className="contribute_sample" onClick={() => scrollPositionTo('stacks_guide_focus')}>
//                                 Stack details
//                         </li>
//                             <li className="contribute_sample" onClick={() => scrollPositionTo('documents_guide_focus')}>
//                                 Document details
//                         </li>
//                             <li className="contribute_sample" onClick={() => scrollPositionTo('tutorials_guide_focus')}>
//                                 Tutorial details
//                          </li>
//                             <li className="contribute_sample" onClick={() => scrollPositionTo('what_to_do_next_focus')}>
//                                 Done with data entry ?
//                          </li>
//                         </ul>
//                     </div>

//                     {/*stacks div*/}
//                     <div id="stacks_guide">
//                         <h3 style={{ marginLeft: '13rem' }}>
//                             <div id="stacks_guide_focus">Stacks.json</div>
//                         </h3>

//                         <p>Data entered here will be used to render the tile on the home page</p>
//                         <img src={stacks_img} alt="stack page"></img>
//                         <ul>
//                             <li>Title: Title of the tile.</li>
//                             <li>Description: A small description about the stack.</li>
//                             <li>Languages: choose programming languages which the stack is comprised of.</li>
//                             <li>Enabled: Flag which will enable or disable tile on the landing page.</li>
//                             <li>stack_id : unique identifier for the stack, can include - or _ and [a-z]. Please do not use [1-9] or [A-Z]. Also, please make sure its not used in any other stack while raising pull request.</li>
//                             <li>Type: type of stack.</li>
//                             <li>Logo: Logo appearing on tile , auto selected based on type of stack.</li>
//                             <li>Categories: Depending on type,  choose various categories which will be used for filters.</li>
//                             <li>Has Dataset: set to true if you are creating a dataset or a stack which has a dataset included.</li>
//                             <li>Has Api: set to true if you are creating a API Collection or a stack which has a API Collection included.</li>
//                             <li>installTime: estimated time for your stack to get installed.</li>
//                             <li>GIT url: git url from where operator playground can clone the stack.</li>
//                             <li>Git Commit: commit id which you want the operator playground to clone.</li>
//                         </ul>
//                     </div>

//                     <div id="documents_guide">
//                         <h3 style={{ marginLeft: '12rem' }}>
//                             <div id="documents_guide_focus">
//                                 Documents.json
//                            </div>
//                         </h3>

//                         <p>Data entered here will be rendered on the stack builder dashboard</p>
//                         <img src={document_img} alt="document section" />
//                         <ul>
//                             <li>Title: (Auto filled from Step 1)</li>
//                             <li>Description: (Auto filled from Step 1)</li>
//                             <li>Platform: Currently only one value is supported</li>
//                             <li>Cover: cover.md: File name for the cover file which will have basic readme about the stack</li>
//                             <li>Cover content: Enter valid md content to be rendered
// 	                            <image />
//                             </li>
//                             {/* <li>Name: (Auto filled from Step 1)</li>
//                             <li>Type: (Auto filled from Step 1)</li>
//                             <li>stack_id: (Auto filled from Step 1)</li>
//                             <li>Logo: (Auto filled from Step 1)</li> */}
//                             <li>Display: These are the various tabs seen. By default there will be three tabs :
// 			                    <ol>
//                                     <li>Stack installer</li>
//                                     <li>Developer Dashboard (VS code editor)</li>
//                                     <li>Terminal</li>
//                                 </ol>
//                                 <p>Click on add more if you need more tabs</p>
//                                 <ul>
//                                     <li>Name: Name of the tab</li>
//                                     <li>Url: ##DNS.host##/codeserver (Anything put between ## will be replaced with actual values from VM metadata) </li>
//                                     <li>Enabled: Show / Hide tab on the UI</li>
//                                 </ul>
//                             </li>
//                             <li>Commands: All the commands required to install the stack. please test all  the commands and add in sequence of execution
//                                 <ol>
//                                     <li>Description : Some description about the commands</li>
//                                     <li>Exec : Command to be executed</li>
//                                 </ol>
//                             </li>
//                             <li>Has Supporting content: This flag is used to define whether content has a tutorial content or not. Based on this guide panel will be activated.
// 	                            <image />
//                             </li>
//                         </ul>
//                     </div>

//                     <div id="tutorials_guide">
//                         <h3 style={{ marginLeft: '12rem' }}>
//                             <div id="tutorials_guide_focus">Tutorials.json</div>
//                         </h3>
//                         <p>Data entered here will be rendered in the Guide panel on the right</p>
//                         <img src={tutorial_base} alt='guide panel'></img>
//                         <ul>
//                             <li>Name: Name to tutorial Section</li>
//                             <li>Footer: footer.md - this is the filename where all footer contents of guide will reside</li>
//                             <li>Footer content:  Valid md content which will appear in the footer</li>
//                             <li>
//                                 <p>Tutorials: Single or Multiple tutorials to help users play with your stack</p>
//                                 <image />
//                                 <ol>
//                                     <li>Title: Title of the tutorial. </li>
//                                     <li>File name: This will be name of the tutorial file with .md extension</li>
//                                     <li>Duration: Time required to go through the tutorial</li>
//                                     <li>Description: Short description about the tutorial</li>
//                                     <li>Tutorial Content: valid md tutorial content with syntax as defined in sample , maintain syntax so that content is rendered properly!</li>
//                                     <br />
//                                     <img src={tutorial_structure} alt="tutorial"></img>
//                                 </ol>
//                             </li>

//                             <li><p>Useful Links: Any external links to refer? </p>
//                                 <image />
//                                 <ol>
//                                     <li>Title: Name of the link.</li>
//                                     <li>Description: Short description about the link.</li>
//                                     <li>URL: Link which will be opened in a new tab.  </li>
//                                 </ol>
//                             </li>

//                             <li>
//                                 <p>Demos: Have any links to demos about your contribution? </p>
//                                 <image />
//                                 <ol>
//                                     <li>Title: Give a name to your demo.</li>
//                                     <li>Description: Short description describing your demo.</li>
//                                     <li>URL: Link to demo which will open in a new tab. </li>
//                                 </ol>
//                             </li>
//                         </ul>
//                     </div>


//                     <div id="what_to_do_next">
//                         <h4 style={{ marginLeft: '13rem' }}>
//                             <div id="what_to_do_next_focus">Done with data entry ?
//                             </div>
//                         </h4>
//                         <ul>
//                             <li>
//                                 Go to github.com and create a PUBLIC repository and host all the contents you created.
//                             </li>
//                             <li>
//                                 Copy Git url(HTTPS) and commit id (full sha commit id) and put the values in stack.json
//                                 <br />
//                                 <img src={git_url} alt='git url'></img>
//                                 <img src={commit_img} alt='commit id'></img>
//                             </li>
//                             <li>
//                                 Clone the repo <span className="contribute_sample">https://github.com/operator-playground-io/operator-playground-website</span>
//                             </li>
//                             <li>
//                                 Put your stack.json file contents in _files/stacks.json of cloned repo. (please verify the stack_id entered by you is not already present in the file)
//                             </li>
//                             <li>
//                                 Raise Pull request , let admin approve and merge the same.
//                             </li>
//                             <li>
//                                 Once merged , access the operator playground and see your contributed stack / dataset / api collection in action.
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="form">
//                     <Accordion>
//                         <AccordionItem onClick={() => scrollPositionTo('stacks_guide_focus')} open title="Stack details">
//                             <Stack />
//                         </AccordionItem>
//                         <AccordionItem onClick={() => scrollPositionTo('documents_guide_focus')} title="Document details">
//                             <Document />
//                         </AccordionItem>
//                         <AccordionItem title="Tutorial details" className={!documentsData.has_supporting_content ? 'accordion-disabled' : ''}>
//                             <Tutorial />
//                         </AccordionItem>
//                     </Accordion>
//                     <br />
//                     <div style={{ float: 'right', paddingBottom: '15px' }}>
//                         {/* <Button kind='ghost' style={{ marginRight: '1rem' }}>Cancel</Button> */}
//                         <Button kind='primary' disabled={(stacksData.isStacksSaved && documentsData.isDocumentSaved) ? (documentsData.has_supporting_content ? (tutorialsData.isTutorialSaved ? false : true) : false) : true} onClick={createZip} tabIndex={0}>Create Zip</Button>
//                     </div>
//                 </div>
//             </div>
//         </Layout >
//     )
// }

// const scrollPositionTo = (elementId) => {
//     const element = document.getElementById(elementId)
//     if (element && element !== undefined && element !== null) {
//         element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
//     }
// }

// const mapStateToProps = state => ({
//     stacksData: state.createEnvDetails.stacksData,
//     documentsData: state.createEnvDetails.documentsData,
//     tutorialsData: state.createEnvDetails.tutorialsData
// })

// export default connect(mapStateToProps)(Contribute)
