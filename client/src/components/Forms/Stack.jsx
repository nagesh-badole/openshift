// import React, { useEffect, useState } from 'react'
// import homeStyles from './Stack.scss'
// import './Stack.scss'
// import { connect } from 'react-redux'
// import { Tabs, Tab, ClickableTile, Form, FormGroup, TextInput, TextArea, Select, SelectItem, Toggle, Dropdown, MultiSelect, NumberInput } from 'carbon-components-react'
// import Layout from '../Layout/Layout'
// import { useHistory, Link } from "react-router-dom"
// import {
//     ArrowRight16
// } from "@carbon/icons-react"
// import { Button } from 'carbon-components-react'
// import store from '../../store/store'
// import * as DATA from './../../helpers/config.json'
// import { setStacksData } from '../../store/actions/createEnvActions'

// const Stack = ({
// }) => {

//     const [formData, setFormData] = useState({
//         "title": "My Sample Stack",
//         "description": "A sample stack to try on operator playground",
//         "logo": "",
//         "enabled": false,
//         "language": [],
//         "document": "data-logging-stack",
//         "stack_id": "my_sample_stack",
//         "type": "",
//         "categories": [],
//         "has_dataset": false,
//         "has_api": false,
//         "git_url": "",
//         "git_commit": "",
//         "installTime": "1",
//         "isStacksSaved": false
//     })
//     const [categories, setCategories] = useState([]);
//     const [isValidating, setIsValidating] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);

//     const ALL_FIELDS_REQUIRED = true;

//     let history = useHistory();
//     let languages = DATA.LANGUAGES;
//     let types = DATA.TYPE;


//     const onTextInputChange = (e) => {
//         let currentFormData = {...formData};
//         const key = e.currentTarget.id;
//         const value = e.currentTarget.value;
//         currentFormData[key] = value;
//         setFormData(currentFormData);
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const onNumberInputChange = (e) => {
//         let currentFormData = {...formData};
//         const key = e.target.id;
//         const value = e.target.value;
//         currentFormData[key] = value;
//         setFormData(currentFormData);
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const onLanguageChange = (e) => {
//         let currentFormData = {...formData};
//         let values = e.selectedItems.map((value) => {
//             return (value.label)
//         })
//         currentFormData["language"] = values;
//         setFormData(currentFormData);
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const onTypeChange = (e) => {
//         let selectedType = e.target.value;
//         let logoData = formData;
//         if (selectedType === 'stack') {
//             setCategories(DATA.STACK_CATEGORIES)
//             logoData["logo"] = "_images/stack.png";
//             setFormData(logoData);
//         }
//         else if (selectedType === 'dataset' || selectedType === 'dataset-s3') {
//             setCategories(DATA.DATASET_CATEGORIES)
//             logoData["logo"] = "_images/dataset.png";
//             setFormData(logoData);
//         }
//         else if (selectedType === 'api') {
//             setCategories(DATA.API_CATEGORIES)
//             logoData["logo"] = "_images/api_collections.png";
//             setFormData(logoData);
//         }
//         else {
//             setCategories(["No categories for Type or Wrong Type selected."])
//         }
//         let currentFormData = formData;
//         currentFormData["type"] = e.target.value;
//         currentFormData["categories"] = []
//         setFormData(currentFormData);
//         let clear_btn_ele = Array.from(document.getElementById('categories').getElementsByClassName('bx--list-box__selection--multi'))
//         if (clear_btn_ele !== undefined && clear_btn_ele.length > 0) {
//            clear_btn_ele[0].click()
//         }
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const onToggleChange = (e) => {
//         let currentFormData = formData;
//         const key = e.currentTarget.id;
//         currentFormData[key] = !currentFormData[key];
//         setFormData(currentFormData);
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const onMultiselectChange = (e) => {
//         let currentFormData = {...formData};
//         let values = e.selectedItems.map((value) => {
//             return (value.label)
//         })
//         currentFormData["categories"] = values;
//         setFormData(currentFormData);
//         if (formData.isStacksSaved) {
//             setIsValidating(false)
//         }
//         setIsSaved(false)
//     }

//     const preventForm = (e) => {
//         e.preventDefault();
//         if (formData.categories.length > 0 && formData.language.length > 0) {
//             let currentFormData = formData;
//             currentFormData["isStacksSaved"] = true;
//             setFormData(currentFormData);
//             gotoDocuments(store, history, formData);
//             setIsSaved(true)
//         }
//     }

//     const validation = () => {
//         setIsValidating(true);
//         //gotoDocuments(store, history, formData);
//     }

//     useEffect(() => {
//         // setNotValidated(formData.title == "" || formData.description == "" || formData.git_commit == "" || formData.git_url == "" ||
//         // formData.installTime == "" || formData.language == "" || formData.logo == "" || formData.stack_id ||
//         // formData.type == "")
//     }, [])

//     console.log (formData)
//     return (
//         <div className={`form-body`}>
//             <Form target="_self" onSubmit={preventForm}>
//                 <FormGroup>
//                     <TextInput
//                         onChange={onTextInputChange}
//                         className={'form-element'}
//                         id="title"
//                         labelText="Title"
//                         invalid={isValidating ? (formData.title ? false : true) : false}
//                         placeholder="Title"
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                         defaultValue={formData.title}
//                     /><br />
//                     <TextArea
//                         onChange={onTextInputChange}
//                         className={'form-element'}
//                         id="description"
//                         invalid={isValidating ? (formData.description ? false : true) : false}
//                         labelText="Description"
//                         placeholder="Description"
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                         defaultValue={formData.description}
//                     /><br />
//                     <MultiSelect
//                         className={'form-element'}
//                         ariaLabel="language"
//                         id="Language"
//                         items={DATA.LANGUAGES}
//                         label="Select Language"
//                         titleText="Language"
//                         onChange={onLanguageChange}
//                         invalid={isValidating ? (formData.language.length > 0 ? false : true) : false}
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                         initialSelectedItems={formData.language.map((language) =>  {
//                             let info = {id: language, text: language};
//                             return info
//                         })}
//                     />
//                     <br />
//                     <Toggle
//                         className={'form-element'}
//                         aria-label="toggle enabled"
//                         id="enabled"
//                         labelText="Enabled on operator playground"
//                         onChange={onToggleChange}
//                     /><br />
//                     <TextInput
//                         onChange={onTextInputChange}
//                         className={'form-element'}
//                         id="stack_id"
//                         invalid={isValidating ? (formData.stack_id ? false : true) : false}
//                         labelText="Stack ID"
//                         placeholder="stack_id"
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                         defaultValue={formData.stack_id}
//                     /><br />
//                     {/* <Dropdown
//                         className={'form-element'}
//                         ariaLabel="Dropdown"
//                         id="type"
//                         items={types}
//                         label="Type"
//                         titleText="Type"
//                         invalid={isValidating ? (formData.type ? false : true) : false}
//                         onChange={onTypeChange}
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                     /><br /> */}
//                     <Select
//                         defaultValue=""
//                         id="type"
//                         invalidText="A valid value is required"
//                         invalid={isValidating ? (formData.type ? false : true) : false}
//                         required={ALL_FIELDS_REQUIRED}
//                         onChange={onTypeChange}
//                         labelText="Type"
//                         className={'form-element'}
//                         ariaLabel="Dropdown">
//                             <SelectItem
//                                 text="Select a type"
//                                 value=""
//                             />
//                         {
//                             types.map((type) => <SelectItem
//                             text={type}
//                             value={type}
//                         />)
//                         }
//                         <br />
//                     </Select><br />
//                     <TextInput
//                         className={'form-element'}
//                         id="logo"
//                         invalid={isValidating ? (formData.logo ? false : true) : false}
//                         labelText="Logo"
//                         value={formData.logo}
//                         disabled={true}
//                     /><br />
//                     <MultiSelect
//                         className={'form-element'}
//                         ariaLabel="MultiSelect"
//                         id="categories"
//                         label="Categories"
//                         items={categories}
//                         titleText="Categories"
//                         invalid={isValidating ? (formData.categories.length > 0 ? false : true) : false}
//                         onChange={onMultiselectChange}
//                         required={ALL_FIELDS_REQUIRED}
//                         invalidText="A valid value is required"
//                         initialSelectedItems={formData.categories.map((category) =>  {
//                             let info = {id: category, text: category};
//                             return info
//                         })}
//                     /><br />
//                     <Toggle
//                         className={'form-element'}
//                         aria-label="toggle has_dataset"
//                         id="has_dataset"
//                         labelText="Has Dataset"
//                         onChange={onToggleChange}
//                     /><br />
//                     <Toggle
//                         className={'form-element'}
//                         aria-label="toggle has_api"
//                         id="has_api"
//                         labelText="Has API"
//                         onChange={onToggleChange}
//                     /><br />
//                     <NumberInput
//                         onChange={onNumberInputChange}
//                         className={'form-element'}
//                         id="installTime"
//                         invalid={isValidating ? (formData.installTime ? false : true) : false}
//                         invalidText="A valid value is required"
//                         label="Install Time"
//                         helperText="(in minutes)"
//                         required={ALL_FIELDS_REQUIRED}
//                         value={formData.installTime}
//                     /><br />
//                     <TextInput
//                         onChange={onTextInputChange}
//                         className={'form-element'}
//                         id="git_url"
//                         labelText="Git URL"
//                         placeholder="eg: https://github.com/op-playground/operator-playground.git"
//                     /><br />
//                     <TextInput
//                         onChange={onTextInputChange}
//                         className={'form-element'}
//                         id="git_commit"
//                         labelText="Git Commit SHA"
//                         placeholder="eg: c62d593f7b9ac6fc48fa340277da2c04092ae46a"
//                     /><br />
//                     <br />
//                     <div className="footer-content">
//                             {
//                                 isSaved && 
//                                 <span className="success-msg">Stack Data Saved Successfully</span>
//                             }
//                             <Button
//                                 kind="primary"
//                                 tabIndex={0}
//                                 type="submit"
//                                 className="save-stack-button"
//                                 onClick={validation}
//                             >
//                                 Save & Proceed
//                             </Button>
//                     </div>
//                 </FormGroup>
//             </Form>
//         </div>
//     )
// }

// const gotoDocuments = (store, history, data) => {

//     let dummyStack = {
//         "title": "Data/Logging Stack",
//         "description": "",
//         "logo": "_images/Logging.png",
//         "enabled": false,
//         "language": "Java",
//         "document": "data-logging-stack",
//         "stack_id": "data-logging-stack",
//         "type": "stack",
//         "categories": ["Data Logging"],
//         "has_dataset": false,
//         "has_api": false,
//         "git_url": "some git url",
//         "git_commit": "some git commit",
//         "installTime": "10 minutes"
//     }

//     let currentFormData = {...data};
//     let value = currentFormData["installTime"];
//     currentFormData["installTime"] = value + " minutes";

//     //set data in store
//     store.dispatch(setStacksData(currentFormData))

//     // redirect to documents
//     // history.push('/document')
// }

// const mapStateToProps = state => ({
// })

// export default connect(mapStateToProps)(Stack)

// <SideNav
//                     isFixedNav
//                     expanded={true}
//                     isChildOfHeader={true}
//                     aria-label="Side navigation"
//                 >
//                     <SideNavItems>
//                         <SideNavLink onClick={() => scrollPositionTo('catalog-details')}>
//                             Tile Info
//                         </SideNavLink>
//                         <SideNavLink onClick={() => scrollPositionTo('meta-data')}>
//                             Meta Data
//                         </SideNavLink>
//                         <SideNavLink onClick={() => scrollPositionTo('cover-data')}>
//                             Cover
//                         </SideNavLink>
//                     </SideNavItems>
//                 </SideNav>
