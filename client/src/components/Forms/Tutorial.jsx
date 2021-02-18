// import React, { useEffect, useState } from 'react'
// import homeStyles from './Tutorial.scss'
// import { connect } from 'react-redux'
// import { FormGroup, Form, TextInput, TextArea, ToastNotification } from 'carbon-components-react'
// import { useHistory } from "react-router-dom";
// import { TrashCan16, AddAlt16 } from "@carbon/icons-react";
// import { Button } from 'carbon-components-react';
// import store from '../../store/store'
// import { setTutorialsData} from '../../store/actions/createEnvActions'
// import * as footercontent from '../../helpers/footer-content.json'
// import * as tutorialcontent from '../../helpers/tutorial-content.json'

// const Tutorial = ({
//     stacksData, documentsData
// }) => {

//     let history = useHistory();
//     const tutorialObj = { description: 'A sample stack tutorial to try on operator playground', duration: '1 minute', tutorial_name: 'sample', title: 'My Sample Stack Tutorial', tutorial_content: tutorialcontent.content}
//     const usefulLinkObj = { description: '', url: '', title: ''}
//     const demoObj = { description: '', url: '', title: ''}
    
//     const [formState, setFormState] = useState({
//         name: 'My Sample Stack Tutorial',
//         appLayout: 'accordion',
//         appTheme: 'g90',
//         footer: 'footer.md',
//         footer_content: footercontent.content,
//         tutorials: [{...tutorialObj}],
//         usefulLinks: [],
//         demos: [],
//         "isTutorialSaved": false
//     });

//     const [isValidating, setIsValidating] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);

//     const addTutorial = () => {
//         setFormState({
//             ...formState,
//             tutorials: [
//                 ...formState.tutorials,
//                 {...tutorialObj}
//             ]
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteTutorial = () => {
//         let temp = [...formState.tutorials]
//         temp.pop()
//         setFormState({
//             ...formState,
//             tutorials: temp
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const addUsefulLink = () => {
//         setFormState({
//             ...formState,
//             usefulLinks: [
//                 ...formState.usefulLinks,
//                 {...usefulLinkObj}
//             ]
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteUsefulLink = () => {
//         let temp = [...formState.usefulLinks]
//         temp.pop()
//         setFormState({
//             ...formState,
//             usefulLinks: temp
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const addDemo = () => {
//         setFormState({
//             ...formState,
//             demos: [
//                 ...formState.demos,
//                 {...demoObj}
//             ]
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteDemo = () => {
//         let temp = [...formState.demos]
//         temp.pop()
//         setFormState({
//             ...formState,
//             demos: temp
//         })
//         if (formState.isTutorialSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const handleChange = (field, value) => {
//         switch (field) {
//             case 'name':
//                 setFormState({
//                     ...formState,
//                     name: value
//                 })
//                 if (formState.isTutorialSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'footer_content':
//                 setFormState({
//                     ...formState,
//                     footer_content: value
//                 })
//                 if (formState.isTutorialSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'tutorials':
//                 const updatedTutorials = [...formState.tutorials]
//                 updatedTutorials[value.dataset.idx][value.className.split(' ')[1]] = value.value
//                 setFormState({...formState, tutorials: updatedTutorials});
//                 if (formState.isTutorialSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'usefulLinks':
//                 const updatedUsefulLinks = [...formState.usefulLinks]
//                 updatedUsefulLinks[value.dataset.idx][value.className.split(' ')[1]] = value.value
//                 setFormState({...formState, usefulLinks: updatedUsefulLinks});
//                 if (formState.isTutorialSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'demos':
//                 const updatedDemos = [...formState.demos]
//                 updatedDemos[value.dataset.idx][value.className.split(' ')[1]] = value.value
//                 setFormState({...formState, demos: updatedDemos});
//                 if (formState.isTutorialSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             default: return
//         }
//     }

//     const preventForm = (e) => {
//         e.preventDefault();
//         let currentFormData = formState;
//         currentFormData["isTutorialSaved"] = true;
//         setFormState(currentFormData);
//         saveTutorialData(store, history, stacksData, documentsData, formState)
//         setIsSaved(true);
//     }

//     const validation = () => {
//         setIsValidating(true);
//     }
    
//     useEffect(() => {
       
//     }, [])

//     console.log (formState)
//     return (
//             <div className={`document_content`}>
//                 <Form  onSubmit={preventForm}>
//                     {/* Name  */}
//                     <FormGroup legendText="" className="bx--col">
//                         <TextInput
//                             id="name"
//                             invalidText="A valid value is required"
//                             labelText="Name"
//                             placeholder=""
//                             value={formState.name}
//                             onChange={(event) => handleChange('name', event.target.value)}
//                             invalid={isValidating ? (formState.name ? false : true) : false}
//                             required='true'
//                         />
//                     </FormGroup> 

//                     {/* AppLayout  */}
//                     {/* <FormGroup legendText="" className="bx--col-lg-4 bx--col-md-8">
//                         <TextInput
//                             id="appLayouts"
//                             invalidText="A valid value is required"
//                             labelText="App Layout"
//                             value={formState.appLayout}
//                             placeholder=""
//                             readOnly
//                             required
//                         />
//                     </FormGroup> */}

//                     {/* AppTheme  */}
//                     {/* <FormGroup legendText="" className="bx--col-lg-4 bx--col-md-8">
//                         <TextInput
//                             id="apptheme"
//                             invalidText="A valid value is required"
//                             labelText="App Theme"
//                             value={formState.appTheme}
//                             placeholder=""
//                             readOnly
//                             required
//                         />
//                     </FormGroup> */}

//                     {/* Footer  */}
//                     <FormGroup legendText="" className="bx--col">
//                         <TextInput
//                             id="footer"
//                             invalidText="A valid value is required"
//                             labelText="Footer"
//                             value={formState.footer}
//                             placeholder=""
//                             readOnly
//                             required
//                         />
//                     </FormGroup>

//                     {/* Cover content  */}
//                     <FormGroup legendText="" className="bx--col">
//                         <TextArea
//                             cols={50}
//                             id="footer content"
//                             invalidText="A valid value is required"
//                             labelText="Footer Content"
//                             placeholder=""
//                             rows={4}
//                             value={formState.footer_content}
//                             onChange={(event) => handleChange('footer_content', event.target.value)}
//                             invalid={isValidating ? (formState.footer_content ? false : true) : false}
//                             required='true'
//                         />
//                     </FormGroup>

//                     {/* Tutorial */}
//                     <div className="form-element-container addmore-section">
//                         <strong>Tutorials</strong>
//                         {
//                             formState.tutorials.map((tutorial, index) => {
//                             const tutorialDesc = `tutorial-desc-${index}`;
//                             const tutorialDuration = `tutorial-duration-${index}`;
//                             const tutorialTitle = `tutorial-title-${index}`;
//                             const tutorial_name = `tutorial-name-${index}`;
//                             const tutorial_content = `tutorial-content-${index}`;
//                             return (
//                                 // <strong htmlFor={cmdDesc}>{`Command #${index + 1}`}</strong>
//                                 <div key={`tutorial-${index}`} className="addmore-form">
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={tutorialTitle}
//                                             invalidText="A valid value is required"
//                                             labelText="Title"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('tutorials', event.target)}
//                                             value={formState.tutorials[index].title}
//                                             data-idx={index}
//                                             className="title"
//                                             required='true'
//                                             invalid={isValidating ? (formState.tutorials[index].title ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={tutorial_name}
//                                             invalidText="A valid value is required"
//                                             labelText="File Name"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('tutorials', event.target)}
//                                             value={formState.tutorials[index].tutorial_name}
//                                             data-idx={index}
//                                             className="tutorial_name"
//                                             required='true'
//                                             invalid={isValidating ? (formState.tutorials[index].tutorial_name ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={tutorialDuration}
//                                             invalidText="A valid value is required"
//                                             labelText="Duration"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('tutorials', event.target)}
//                                             value={formState.tutorials[index].duration}
//                                             data-idx={index}
//                                             className="duration"
//                                             required='true'
//                                             invalid={isValidating ? (formState.tutorials[index].duration ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextArea
//                                             cols={50}
//                                             id={tutorialDesc}
//                                             invalidText="A valid value is required"
//                                             labelText="Description"
//                                             placeholder=""
//                                             rows={4}
//                                             value={formState.tutorials[index].description}
//                                             className="description"
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.tutorials[index].description ? false : true) : false}
//                                             onChange={(event) => handleChange('tutorials', event.target)}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextArea
//                                             cols={50}
//                                             id={tutorial_content}
//                                             invalidText="A valid value is required"
//                                             labelText="Content"
//                                             placeholder=""
//                                             rows={4}
//                                             value={formState.tutorials[index].tutorial_content}
//                                             className="tutorial_content"
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.tutorials[index].tutorial_content ? false : true) : false}
//                                             onChange={(event) => handleChange('tutorials', event.target)}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );      
//                             })
//                         }
//                         <div className="command-op-section">
//                             <a className={formState.tutorials.length === 1 ? 'disable' : ''} href="#" onClick={formState.tutorials.length !== 1 && deleteTutorial} target="_self">
//                                 <TrashCan16 />Remove
//                             </a>
//                             <a onClick={addTutorial} target="_self">
//                                 <AddAlt16 />Add more
//                             </a>
//                         </div>
//                     </div>

//                     {/* Useful Links */}
//                     <div className="form-element-container addmore-section">
//                         <strong>Useful Links</strong>
//                         {
//                             formState.usefulLinks.map((usefulLink, index) => {
//                             const usefulLinkDesc = `usefulLink-desc-${index}`;
//                             const usefulLinkURL = `usefulLink-duration-${index}`;
//                             const usefulLinkTitle = `usefulLink-title-${index}`;
//                             return (
//                                 // <strong htmlFor={cmdDesc}>{`Command #${index + 1}`}</strong>
//                                 <div key={`usefulLink-${index}`} className="addmore-form">
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={usefulLinkTitle}
//                                             invalidText="A valid value is required"
//                                             labelText="Title"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('usefulLinks', event.target)}
//                                             value={formState.usefulLinks[index].title}
//                                             data-idx={index}
//                                             className="title"
//                                             required='true'
//                                             invalid={isValidating ? (formState.usefulLinks[index].title ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={usefulLinkURL}
//                                             invalidText="A valid value is required"
//                                             labelText="URL"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('usefulLinks', event.target)}
//                                             value={formState.usefulLinks[index].url}
//                                             data-idx={index}
//                                             className="url"
//                                             required='true'
//                                             invalid={isValidating ? (formState.usefulLinks[index].url ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextArea
//                                             cols={50}
//                                             id={usefulLinkDesc}
//                                             invalidText="A valid value is required"
//                                             labelText="Description"
//                                             placeholder=""
//                                             rows={4}
//                                             value={formState.usefulLinks[index].description}
//                                             className="description"
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.usefulLinks[index].description ? false : true) : false}
//                                             onChange={(event) => handleChange('usefulLinks', event.target)}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );      
//                             })
//                         }
//                         <div className="command-op-section">
//                             <a className={formState.usefulLinks.length === 0 ? 'disable' : ''} href="#" onClick={formState.usefulLinks.length !== 0 && deleteUsefulLink} target="_self">
//                                 <TrashCan16 />Remove
//                             </a>
//                             <a onClick={addUsefulLink} target="_self">
//                                 <AddAlt16 />Add more
//                             </a>
//                         </div>
//                     </div>

//                     {/* Demos */}
//                     <div className="form-element-container addmore-section">
//                         <strong>Demo</strong>
//                         {
//                             formState.demos.map((demo, index) => {
//                             const demoDesc = `demo-desc-${index}`;
//                             const demoURL = `demo-url-${index}`;
//                             const demoTitle = `demo-title-${index}`;
//                             return (
//                                 // <strong htmlFor={cmdDesc}>{`Command #${index + 1}`}</strong>
//                                 <div key={`demo-${index}`} className="addmore-form">
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={demoTitle}
//                                             invalidText="A valid value is required"
//                                             labelText="Title"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('demos', event.target)}
//                                             value={formState.demos[index].title}
//                                             data-idx={index}
//                                             className="title"
//                                             required='true'
//                                             invalid={isValidating ? (formState.demos[index].title ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={demoURL}
//                                             invalidText="A valid value is required"
//                                             labelText="URL"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('demos', event.target)}
//                                             value={formState.demos[index].url}
//                                             data-idx={index}
//                                             className="url"
//                                             required='true'
//                                             invalid={isValidating ? (formState.demos[index].url ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextArea
//                                             cols={50}
//                                             id={demoDesc}
//                                             invalidText="A valid value is required"
//                                             labelText="Description"
//                                             placeholder=""
//                                             rows={4}
//                                             value={formState.demos[index].description}
//                                             className="description"
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.demos[index].description ? false : true) : false}
//                                             onChange={(event) => handleChange('demos', event.target)}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );      
//                             })
//                         }
//                         <div className="command-op-section">
//                             <a className={formState.demos.length === 0 ? 'disable' : ''} href="#" onClick={formState.demos.length !== 0 && deleteDemo} target="_self">
//                                 <TrashCan16 />Remove
//                             </a>
//                             <a onClick={addDemo} target="_self">
//                                 <AddAlt16 />Add more
//                             </a>
//                         </div>
//                     </div>
//                     <FormGroup>
//                         <div className="footer-content">
//                             {
//                                 isSaved && 
//                                 <span className="success-msg">Tutorial Data Saved Successfully</span>
//                             }
//                             <Button kind='primary' type="submit" onClick={validation} tabIndex={0}>Save Tutorial Details</Button>
//                         </div>
//                     </FormGroup>
                    
//                 </Form>
//             </div>
//     )
// }

// const saveTutorialData = (store, history, stacksData, documentsData, formState) => {
//    //set data in store
//    store.dispatch(setTutorialsData(formState))

//    console.log("----------------check-------------")
   
//    console.log(stacksData.isStacksSaved)
//    console.log(documentsData.isDocumentSaved)
//    console.log(formState.isTutorialSaved)

// }

// const mapStateToProps = state => ({
//     stacksData: state.createEnvDetails.stacksData,
//     documentsData: state.createEnvDetails.documentsData
// })

// export default connect(mapStateToProps)(Tutorial)
