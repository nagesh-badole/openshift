// import React, { useEffect, useState } from 'react'
// import homeStyles from './Document.scss'
// import { connect } from 'react-redux'
// import { FormGroup, Dropdown, Form, TextInput, TextArea, Checkbox} from 'carbon-components-react'
// import { useHistory } from "react-router-dom";
// import { AddAlt16, TrashCan16 } from "@carbon/icons-react";
// import { Button } from 'carbon-components-react';
// import store from '../../store/store'
// import { setDocumentsData } from '../../store/actions/createEnvActions'
// import * as DATA from '../../helpers/config.json'
// import * as covercontent from '../../helpers/cover-content.json'

// const Document = ({
//     stacksData,
//     name,
//     description,
//     logo,
//     stack_id,
//     type,
//     categories,
//     installTime,
//     language
// }) => {

//     let history = useHistory();
//     const commandObj = { description: '', exec: '' }
//     const displayObj = { name: '', url: '', enabled: false }

//     const [formState, setFormState] = useState({
//         name: '',
//         description: '',
//         logo: '',
//         has_supporting_content : false,
//         stack_id: '',
//         type: '',
//         categories: [],
//         platform: 'Kubernetes',
//         cover: 'cover.md',
//         cover_content: covercontent.content,
//         commands: [],
//         display: [{ name: 'Developer Dashboard', url: '##DNS.host##/codeserver', enabled: true }],
//         buckets: [],
//         meta: {
//             "Install time": '',
//             "Language": [],
//             "categories": []
//         },
//         "isDocumentSaved": false
//     });

//     const [isValidating, setIsValidating] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
      
//     const addCommand = () => {
//         setFormState({
//             ...formState,
//             commands: [
//                 ...formState.commands,
//                 { ...commandObj }
//             ]
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteCommand = () => {
//         let temp = [...formState.commands]
//         temp.pop()
//         setFormState({
//             ...formState,
//             commands: temp
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const addDisplay = () => {
//         setFormState({
//             ...formState,
//             display: [
//                 ...formState.display,
//                 { ...displayObj }
//             ]
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteDisplay = () => {
//         let temp = [...formState.display]
//         temp.pop()
//         setFormState({
//             ...formState,
//             display: temp
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const addBucket = () => {
//         setFormState({
//             ...formState,
//             buckets: [
//                 ...formState.buckets,
//                 ''
//             ]
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const deleteBucket = () => {
//         let temp = [...formState.buckets]
//         temp.pop()
//         setFormState({
//             ...formState,
//             buckets: temp
//         })
//         if (formState.isDocumentSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const handleChange = (field, value) => {
//         switch (field) {
//             // case 'name':
//             //     setFormState({
//             //         ...formState,
//             //         name: value
//             //     })
//             //     break;
//             // case 'description':
//             //     setFormState({
//             //         ...formState,
//             //         description: value
//             //     })
//             //     break;
//             // case 'logo':
//             //     setFormState({
//             //         ...formState,
//             //         logo: value
//             //     })
//             //     break;
//             case 'has_supporting_content':
//                 if (value) {
//                     const element = document.getElementById('tutorials_guide_focus')
//                     if (element && element !==undefined && element !== null) {
//                         element.scrollIntoView({behavior: "smooth", inline: "nearest"});
//                     }
//                 }
//                 console.log(value)
//                 setFormState({
//                     ...formState,
//                     has_supporting_content: value
//                 })
//                 if (formState.isDocumentSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             // case 'stack_id':
//             //     setFormState({
//             //         ...formState,
//             //         stack_id: value
//             //     })
//             //     break;
//             // case 'type':
//             //     setFormState({
//             //         ...formState,
//             //         type: value,
//             //         categories: [],
//             //         meta: {
//             //             ...formState.meta,
//             //             "categories": []
//             //         }
//             //     })
//             //     break;
//             // case 'platform':
//             //     setFormState({
//             //         ...formState,
//             //         platform: value
//             //     })
//             //     break;
//             // case 'cover':
//             //     setFormState({
//             //         ...formState,
//             //         cover: value
//             //     })
//             //     break;
//             case 'cover_content':
//                 setFormState({
//                     ...formState,
//                     cover_content: value
//                 })
//                 if (formState.isDocumentSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             // case 'categories':
//             //     let temp = []
//             //     value.forEach((ele) => temp.push(ele.id))
//             //     setFormState({
//             //         ...formState,
//             //         categories: temp,
//             //         meta: {
//             //             ...formState.meta,
//             //             "categories": temp
//             //         }
//             //     })
//             //     break;
//             // case 'install_time':
//             //     setFormState({
//             //         ...formState,
//             //         meta: {
//             //             ...formState.meta,
//             //             "Install time": value
//             //         }
//             //     })
//             //     break;
//             // case 'language':
//             //     let tempLanguage = []
//             //     value.forEach((ele) => tempLanguage.push(ele.id))
//             //     setFormState({
//             //         ...formState,
//             //         meta: {
//             //             ...formState.meta,
//             //             "Language": tempLanguage
//             //         }
//             //     })
//             //     break;
//             case 'commands':
//                 const updatedCommands = [...formState.commands]
//                 updatedCommands[value.dataset.idx][value.className.split(' ')[1]] = value.value
//                 setFormState({ ...formState, commands: updatedCommands });
//                 if (formState.isDocumentSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'display':
//                 const updatedDisplay = [...formState.display]
//                 updatedDisplay[value.index][value.className] = value.value
//                 setFormState({ ...formState, display: updatedDisplay });
//                 if (formState.isDocumentSaved) {
//                     setIsValidating(false)
//                 }
//                 setIsSaved(false)
//                 break;
//             case 'buckets':
//                 console.log (value)
//                 const updatedBuckets = [...formState.buckets]
//                 updatedBuckets[value.dataset.idx] = value.value
//                 setFormState({ ...formState, buckets: updatedBuckets });
//                 if (formState.isDocumentSaved) {
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
//         currentFormData["isDocumentSaved"] = true;
//         setFormState(currentFormData);
//         saveDocumentData(store, history, stacksData, formState)
//         setIsSaved(true)
//     }

//     const validation = () => {
//         setIsValidating(true);
//     }

//     useEffect(() => {
//        setFormState({
//         name: name,
//         description: description,
//         logo: logo,
//         has_supporting_content : false,
//         stack_id: stack_id,
//         type: type,
//         categories: categories,
//         platform: 'Kubernetes',
//         cover: 'cover.md',
//         cover_content: covercontent.content,
//         commands: [],
//         display: [{ name: 'Developer Dashboard', url: '##DNS.host##/codeserver', enabled: true}],
//         buckets: [],
//         meta: {
//             "Install time": [installTime],
//             "Language": language,
//             "categories": categories
//         }
//     })
//     }, [
//         stacksData,
//         name,
//         description,
//         logo,
//         stack_id,
//         type,
//         categories,
//         installTime,
//         language
//     ])

//     console.log(formState)
//     return (
//         <div className={`document_content`}>
//             <Form onSubmit={preventForm}>
//                 {/* Name  */}
//                 <FormGroup legendText="" className="bx--col">
//                     <TextInput
//                         id="name"
//                         invalidText="A valid value is required"
//                         labelText="Name"
//                         placeholder=""
//                         value={formState.name}
//                         readonly
//                         onChange={(event) => handleChange('name', event.target.value)}
//                         invalid={isValidating ? (formState.name ? false : true) : false}
//                         required='true'
//                     />
//                 </FormGroup>

//                 {/* Description  */}
//                 <FormGroup legendText="" className="bx--col">
//                     <TextArea
//                         cols={50}
//                         id="description"
//                         invalidText="A valid value is required"
//                         labelText="Description"
//                         placeholder=""
//                         rows={4}
//                         value={formState.description}
//                         onChange={(event) => handleChange('description', event.target.value)}
//                         required='true'
//                         readonly
//                     />
//                 </FormGroup>

//                 {/* Logo  */}
//                 {/* <FormGroup legendText="" className="bx--col">
//                         <TextInput
//                             id="logo"
//                             invalidText="A valid value is required"
//                             labelText="Logo"
//                             placeholder="eg: _logo/logoname.png"
//                             value={formState.logo}
//                             onChange={(event) => handleChange('logo', event.target.value)}
//                             invalid={isValidating ? (formState.logo ? false : true) : false}
//                             required='true'
//                             readonly
//                         />
//                     </FormGroup> */}

//                 {/* Language  */}
//                 {/* <FormGroup legendText="" className="bx--col-lg-8 bx--col-md-8">
//                         <MultiSelect
//                                 ariaLabel="language"
//                                 id="Language"
//                                 items={DATA.LANGUAGES}
//                                 label="Select Language"
//                                 titleText="Language"
//                                 // initialSelectedItems={formState.meta.Language !== undefined && formState.meta.Language.length !== 0  && DATA.LANGUAGES.filter((lang) => {if (formState.meta.Language.indexOf(lang.id) !== -1) return lang})}
//                                 onChange={(event) => handleChange('language', event.selectedItems)}
//                                 invalidText="A valid value is required"
//                                 invalid={isValidating ? (formState.meta.Language === [] ? true : false) : false}
//                                 readOnly
//                             />
//                     </FormGroup> */}

//                 {/* <div className="bx--row"> */}
//                 {/* Stack ID  */}
//                 {/* <FormGroup legendText="" className="bx--col">
//                             <TextInput
//                                 id="stack_id"
//                                 invalidText="A valid value is required"
//                                 labelText="Stack ID"
//                                 placeholder=""
//                                 value={formState.stack_id}
//                                 onChange={(event) => handleChange('stack_id', event.target.value)}
//                                 invalid={isValidating ? (formState.stack_id ? false : true) : false}
//                                 required='true'
//                                 readOnly
//                             />
//                         </FormGroup> */}

//                 {/* Type  */}
//                 {/* <FormGroup legendText="" className="bx--col">
//                             <Dropdown
//                                 ariaLabel="Dropdown"
//                                 id="type"
//                                 items={DATA.TYPE}
//                                 label="Select Type"
//                                 titleText="Type"
//                                 selectedItem={formState.type}
//                                 onChange={(event) => handleChange('type', event.selectedItem)}
//                                 invalidText="A valid value is required"
//                                 invalid={isValidating ? (formState.type ? false : true) : false}
//                                 required='true'
//                                 readonly
//                             />                          
//                         </FormGroup>  */}
//                 {/* </div> */}

//                 {/* Categories */}
//                 {/* <FormGroup legendText="" className="bx--col-lg-8">
//                         <MultiSelect.Filterable
//                             ariaLabel="Filterable MultiSelect"
//                             id="categories"
//                             items={formState.type === 'Stack' ? DATA.STACK_CATEGORIES : formState.type === 'API' ? DATA.API_CATEGORIES : formState.type === 'Dataset' ? DATA.DATASET_CATEGORIES : []}                                label="Select Categories"
//                             titleText="Categories"
//                             selectedItems={formState.categories}
//                             onChange={(event) => handleChange('categories', event.selectedItems)}
//                             invalidText="A valid value is required"
//                             invalid={isValidating ? (formState.categories === [] ? true : false) : false}
//                             readOnly
//                         />
//                     </FormGroup> */}


//                 {/* Install Time  */}
//                 {/* <FormGroup legendText="" className="bx--col-lg-8 bx--col-md-8">
//                         <NumberInput 
//                             id="install_time"
//                             invalidText="A valid value is required"
//                             label="Install time"
//                             value={formState.install_time}
//                             onChange={(event) => handleChange('install_time', event.target.value)}
//                             required='true'
//                             invalid={isValidating ? (formState.meta["Install time"] ? false : true) : false}
//                             readOnly
//                             helperText="(in minutes)"
//                         />
//                     </FormGroup> */}

//                 <div className="bx--row">
//                     {/* Platform  */}
//                     <FormGroup legendText="" className="bx--col">
//                         <Dropdown
//                             ariaLabel="Dropdown"
//                             id="platform"
//                             items={DATA.PLATFORM}
//                             label="Select Platform"
//                             titleText="Platform"
//                             selectedItem={formState.platform}
//                             onChange={(event) => handleChange('platform', event.selectedItem)}
//                             disabled
//                             invalid={isValidating ? (formState.platform ? false : true) : false}
//                         />
//                     </FormGroup>

//                     {/* Cover  */}
//                     <FormGroup legendText="" className="bx--col">
//                         <TextInput
//                             id="cover"
//                             invalidText="A valid value is required"
//                             labelText="Cover"
//                             value={formState.cover}
//                             placeholder=""
//                             onChange={(event) => handleChange('cover', event.target.value)}
//                             readOnly
//                             required
//                         />
//                     </FormGroup>
//                 </div>

//                 {/* Cover content  */}
//                 <FormGroup legendText="" className="bx--col">
//                     <TextArea
//                         cols={50}
//                         id="cover content"
//                         invalidText="A valid value is required"
//                         labelText="Cover Content"
//                         placeholder=""
//                         rows={4}
//                         value={formState.cover_content}
//                         onChange={(event) => handleChange('cover_content', event.target.value)}
//                         invalid={isValidating ? (formState.cover_content ? false : true) : false}
//                         required='true'
//                     />
//                 </FormGroup>

//                 {/* buckets */}
//                 {formState.type === 'dataset-s3' && <div className="form-element-container addmore-section">
//                     <strong>Buckets</strong>
//                     {
//                         formState.buckets.map((bucket, index) => {
//                             const bucketTxt = `bucket-text-${index}`;
//                             return (
//                                 <div key={`bucket-${index}`} className="addmore-form">
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={bucketTxt}
//                                             invalidText="A valid value is required"
//                                             labelText="Bucket name"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('buckets', event.target)}
//                                             value={formState.buckets[index]}
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.buckets[index] ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );
//                         })
//                     }
//                     <div className="command-op-section">
//                         <a href="#" className={formState.buckets.length === 0 ? 'disable' : ''} onClick={formState.buckets.length !== 0 && deleteBucket} target="_self">
//                             <TrashCan16 />Remove
//                             </a>
//                         <a href="#" onClick={addBucket} target="_self">
//                             <AddAlt16 />Add more
//                             </a>
//                     </div>
//                 </div>}

//                 {/* Display */}
//                 <div className="form-element-container addmore-section">
//                     <strong>Display</strong>
//                     {
//                         formState.display.map((cmd, index) => {
//                             const name = `name-${index}`;
//                             const url = `url-${index}`;
//                             const enabled = `enabled-${index}`;
//                             return (
//                                 <div key={`display-${index}`} className="addmore-form">
//                                     {/* <label htmlFor={catId}>{`Cat #${idx + 1}`}</label> */}
//                                     <FormGroup legendText="" className="bx--col-lg-8">
//                                         <TextInput
//                                             id={name}
//                                             invalidText="A valid value is required"
//                                             labelText="Display name"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('display', { value: event.target.value, index: index, className: 'name' })}
//                                             value={formState.display[index].name}
//                                             data-idx={index}
//                                             className="name"
//                                             required='true'
//                                             invalid={isValidating ? (formState.display[index].name ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={url}
//                                             invalidText="A valid value is required"
//                                             labelText="URL"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('display', { value: event.target.value, index: index, className: 'url' })}
//                                             value={formState.display[index].url}
//                                             data-idx={index}
//                                             className="url"
//                                             readOnly={index === 0 ? true : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup className="bx--fieldset bx--col">
//                                         <Checkbox
//                                             labelText="Enable"
//                                             aria-label="toggle enabled"
//                                             id={enabled}
//                                             checked={formState.display[index].enabled}
//                                             onChange={(event) => handleChange('display', { value: event, index: index, className: 'enabled' })}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );
//                         })
//                     }
//                     <div className="command-op-section">
//                         <a className={formState.display.length === 1 ? 'disable' : ''} href="#" onClick={formState.display.length !== 0 && deleteDisplay} target="_self">
//                             <TrashCan16 />Remove
//                             </a>
//                         <a onClick={addDisplay} target="_self">
//                             <AddAlt16 />Add more
//                             </a>
//                     </div>
//                 </div>

//                 {/* Commands */}
//                 <div className="form-element-container addmore-section">
//                     <strong>Commands</strong>
//                     {
//                         formState.commands.map((cmd, index) => {
//                             const cmdDesc = `cmd-desc-${index}`;
//                             const cmdExec = `cmd-exec-${index}`;
//                             return (
//                                 <div key={`cmd-${index}`} className="addmore-form">
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextInput
//                                             id={cmdDesc}
//                                             invalidText="A valid value is required"
//                                             labelText="Description"
//                                             placeholder=""
//                                             onChange={(event) => handleChange('commands', event.target)}
//                                             value={formState.commands[index].description}
//                                             data-idx={index}
//                                             className="description"
//                                             required='true'
//                                             invalid={isValidating ? (formState.commands[index].description ? false : true) : false}
//                                         />
//                                     </FormGroup>
//                                     <FormGroup legendText="" className="bx--col">
//                                         <TextArea
//                                             cols={50}
//                                             id={cmdExec}
//                                             invalidText="A valid value is required"
//                                             labelText="Execution"
//                                             placeholder=""
//                                             rows={4}
//                                             value={formState.commands[index].exec}
//                                             className="exec"
//                                             data-idx={index}
//                                             required='true'
//                                             invalid={isValidating ? (formState.commands[index].exec ? false : true) : false}
//                                             onChange={(event) => handleChange('commands', event.target)}
//                                         />
//                                     </FormGroup>
//                                 </div>
//                             );
//                         })
//                     }
//                     <div className="command-op-section">
//                         <a href="#" className={formState.commands.length === 0 ? 'disable' : ''} onClick={formState.commands.length !== 0 && deleteCommand} target="_self">
//                             <TrashCan16 />Remove
//                             </a>
//                         <a href="#" onClick={addCommand} target="_self">
//                             <AddAlt16 />Add more
//                             </a>
//                     </div>

//                     {/* has_supporting_content   */}
//                     <FormGroup legendText="" className="bx--col">
//                         <Checkbox
//                             labelText="Has supporting content"
//                             aria-label="has_supporting_content  enabled"
//                             id="has_supporting_content "
//                             checked={formState.has_supporting_content}
//                             onChange={(event) => handleChange('has_supporting_content', event)}
//                         />
//                     </FormGroup>
    
//                     <FormGroup>
//                         <div className="footer-content">
//                             {
//                                 isSaved && 
//                                 <span className="success-msg">Document Data Saved Successfully</span>
//                             }
//                             <Button kind='primary' type="submit" onClick={validation} tabIndex={0}>Save Document Details</Button>
//                         </div>
//                     </FormGroup>
//                 </div>
//                 </Form>
//             </div>
//     )
// }

// const saveDocumentData = (store, history, stacksData, formState) => {

//     let dummyDoc = {
//         "name": "MVC Database Stack",
//         "type": "stack",
//         "stack_id": "mvc-db-stack",
//         "platform": "kubernetes",
//         "description": "",
//         "logo": "_images/SalesStack.png",
//         "cover": "cover",
//         "meta": {
//             "Language": [
//                 "Node Js"
//             ],
//             "Backend": [
//                 "Express (NodeJs)"
//             ],
//             "Frontend": [
//                 "React"
//             ],
//             "Database": [
//                 "MongoDB"
//             ],
//             "Install time": [
//                 "3 minutes"
//             ]
//         },
//         "commands": [
//             {
//                 "description": "Download MongoDB Manifests",
//                 "exec": "cd /home/student/projects  && git clone https://github.com/operator-playground/k8s-manifests"
//             },
//             {
//                 "description": "Install MongoDB ",
//                 "exec": "cd /home/student/projects/k8s-manifests &&  kubectl create -f mongodb/"
//             },
//             {
//                 "description": "Clone the MVC Database application",
//                 "exec": "cd /home/student/projects && git clone https://github.com/operator-playground/mvc-db-example"
//             },
//             {
//                 "description": "Build and Deploy using Skaffold",
//                 "exec": "cd /home/student/projects/mvc-db-example && skaffold config set default-repo localhost:5000 && skaffold run"
//             }
//         ],
//         "content": [
//             "mvc-db-code-tutorial.md"
//         ],
//         "display": [
//             {
//                 "name": "Developer Dashboard",
//                 "url": "##DNS.host##/codeserver",
//                 "enabled": true
//             }
//         ]
//     }

//     //set data in store
//     store.dispatch(setDocumentsData(formState))

// }

// const mapStateToProps = state => ({
//     stacksData: state.createEnvDetails.stacksData,
//     name: state.createEnvDetails.stacksData.title,
//     description: state.createEnvDetails.stacksData.description,
//     logo: state.createEnvDetails.stacksData.logo,
//     stack_id: state.createEnvDetails.stacksData.stack_id,
//     type: state.createEnvDetails.stacksData.type,
//     categories: state.createEnvDetails.stacksData.categories,
//     installTime: state.createEnvDetails.stacksData.installTime,
//     language: state.createEnvDetails.stacksData.language
// })

// export default connect(mapStateToProps)(Document)
