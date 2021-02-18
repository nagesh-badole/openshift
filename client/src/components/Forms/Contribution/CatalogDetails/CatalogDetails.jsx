import React, { useState, useEffect } from 'react';
import './CatalogDetails.scss';
import { connect } from 'react-redux';
import { Button, Modal, ModalWrapper, TooltipIcon } from 'carbon-components-react';
import store from '../../../../store/store';
import 'github-markdown-css';
import * as DATA from '../../../../helpers/config.json';
import _map from 'lodash/map';
import 'carbon-components/css/carbon-components.min.css';
import { TrashCan16, AddAlt16, Information16 } from "@carbon/icons-react";
import {
    FileUploader,
    RadioButtonGroup,
    RadioButton,
    Form,
    FormGroup,
    TextInput,
    TextArea,
    Dropdown,
    MultiSelect,
    NumberInput
} from 'carbon-components-react';
import { setTileData } from '../../../../store/actions/createEnvActions';
import Preview from '../../../Preview/Preview/Preview';
import { setDocumentData } from '../../../../store/actions/createEnvActions';

const CatalogDetails = ({tileData, documentData }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const [formDetails, setFormDetails] = useState({
        title: '',
        description: '',
        selectedLogo: null,
        type: '',
        selectedDatasetCategories: [],
        tag: 'S3',
        selectedNotebookCategories: [],
        selectedApiCategories : [],
        selectedCourseCategories: [],
        selectedOperatorCategories: [],
        selectedImgPreview: null,
        isValidated: false
    });

    const handleChange = (field, event) => {
        switch (field) {
            case 'title':
                setFormDetails({
                    ...formDetails,
                    title: event
                });
                setIsValidating(false)
                break;

            case 'description':
                setFormDetails({
                    ...formDetails,
                    description: event
                });
                setIsValidating(false)
                break;

            case 'logo':
                setFormDetails({
                    ...formDetails,
                    selectedLogo: event.target.files[0],
                    selectedImgPreview: URL.createObjectURL(event.target.files[0])
                });
                setIsValidating(false)
                break;

            case 'type':
                if(event.selectedItem == "Dataset"){
                    setFormDetails({
                        ...formDetails,
                        type: event.selectedItem,
                        title: '',
                        description: '',
                        selectedLogo: null,
                        selectedDatasetCategories: [],
                        selectedApiCategories:[],
                        selectedCourseCategories:[],
                        selectedOperatorCategories:[],
                        tag: 'S3',
                        selectedNotebookCategories: [],
                        selectedImgPreview: null
                    });
                }else{
                    setFormDetails({
                        ...formDetails,
                    type: event.selectedItem,
                    title: '',
                    description: '',
                    selectedLogo: null,
                    selectedDatasetCategories: [],
                    selectedApiCategories:[],
                    selectedCourseCategories:[],
                    selectedOperatorCategories:[],
                    tag: '',
                    selectedNotebookCategories: [],
                    selectedImgPreview: null
                    })
                }
                setIsValidating(false)
                break;

            case 'tag':
                setFormDetails({
                    ...formDetails,
                    tag: event
                })
                setIsValidating(false)
                break;

            case 'dataset_categories':
                var data_cat = [];
                _map(event.selectedItems, (key) => {
                    data_cat.push(key);
                })
                setFormDetails({
                    ...formDetails,
                    selectedDatasetCategories: data_cat
                })
                setIsValidating(false)
                break;

            case 'notebook_categories':
                var notebook_cat = [];
                _map(event.selectedItems, (key) => {
                    notebook_cat.push(key);
                })
                setFormDetails({
                    ...formDetails,
                    selectedNotebookCategories: notebook_cat
                })
                setIsValidating(false)
                break;

            case 'Api_categories':
                var api_cat = [];
                _map(event.selectedItems, (key) => {
                    api_cat.push(key);
                })
                setFormDetails({
                    ...formDetails,
                    selectedApiCategories: api_cat
                })
                setIsValidating(false)
                break;
            
            case 'Course_categories':
                var course_cat = [];
                _map(event.selectedItems, (key) => {
                    course_cat.push(key);
                })
                setFormDetails({
                    ...formDetails,
                    selectedCourseCategories: course_cat
                })
                setIsValidating(false)
                break;

            case 'operator_categories':
                var operator_cat = [];
                _map(event.selectedItems, (key) => {
                    operator_cat.push(key);
                })
                setFormDetails({
                    ...formDetails,
                    selectedOperatorCategories: operator_cat
                })
                setIsValidating(false)
                break;
        }
    }

    useEffect(() => {
        console.log("inside useeffect")
        if((formDetails.selectedNotebookCategories.length > 0 || formDetails.selectedDatasetCategories.length > 0 || 
            formDetails.selectedApiCategories.length > 0 || formDetails.selectedOperatorCategories.length > 0 || formDetails.selectedCourseCategories.length > 0)  &&
            formDetails.description && formDetails.title){
            setFormDetails({
                ...formDetails,
                isValidated: true
            });
        }else{
            setFormDetails({
                ...formDetails,
                isValidated: false
            });
        }
    }, [tileData.title, tileData.description,tileData.type,tileData.selectedDatasetCategories, tileData.selectedNotebookCategories, tileData.selectedApiCategories, tileData.selectedOperatorCategories, tileData.selectedCourseCategories])

    const handlePreview = (e) => {
        console.log('1')
        e.preventDefault();
        if (formDetails.selectedDatasetCategories.length > 0 || formDetails.selectedNotebookCategories.length > 0 ||
            formDetails.selectedApiCategories.length > 0 || formDetails.selectedOperatorCategories.length > 0 || formDetails.selectedCourseCategories.length > 0) {
            console.log('2')
            setFormDetails({
                ...formDetails,
                isValidated: true
            });
            setIsModalOpen(true);
        }
    }

    const validation = () => {
        setIsValidating(true);
    }

    const catalogSubmit = () => {

        setIsModalOpen(false);
        console.log("successful");
    }

    const catalogEdit = () => {
        console.log("Edit")
        setIsModalOpen(false);
    }

    //set data in store
    store.dispatch(setTileData(formDetails))

    return (
        <>
            <div className='sectionHeader'>
                <span>Tile Info</span>
            </div>
            <div className="catalogDetails">
                <Form onSubmit={handlePreview}>
                    <FormGroup>
                        <label for="type" className='bx--label'>Type<span class="required-field"></span></label>
                        <TooltipIcon
                            tooltipText="Type of product">
                            <Information16 />
                        </TooltipIcon><br />
                        <Dropdown
                            className={'form-element'}
                            ariaLabel="Dropdown"
                            id="type"
                            items={DATA.TYPE}
                            label="Type"
                            titleText=""
                            required
                            invalid={isValidating ? (formDetails.type ? false : true) : false}
                            invalidText="Please select type of product"
                            onChange={(event) => { handleChange('type', event) }}
                        /><br /><br />
                        <label for="title" className='bx--label'>Title<span class="required-field"></span></label>
                        <TooltipIcon
                            tooltipText="Title of the tile">
                            <Information16 />
                        </TooltipIcon><br />
                        <TextInput
                            onChange={(event) => handleChange('title', event.target.value)}
                            className={'form-element'}
                            id="title"
                            value={formDetails.title}
                            labelText=""
                            required
                            invalid={isValidating ? (formDetails.title ? false : true) : false}
                            placeholder="Enter title"
                            invalidText="Please enter Title of the tile"
                        /><br />
                        <label for="description" className='bx--label'>Description<span class="required-field"></span></label>
                        <TooltipIcon
                            tooltipText="Short description about the product">
                            <Information16 />
                        </TooltipIcon><br />
                        <TextArea
                            onChange={(event) => handleChange('description', event.target.value)}
                            className={'form-element'}
                            id="description"
                            labelText=""
                            value={formDetails.description}
                            required
                            invalid={isValidating ? (formDetails.description ? false : true) : false}
                            placeholder="Description"
                            invalidText="Please enter Short description about the product"
                        /><br /><br />
                    Upload Tile logo *
                    <TooltipIcon
                            tooltipText="Product logo"
                        >
                            <Information16 />
                        </TooltipIcon>
                        <FileUploader
                            accept={[
                                '.jpg',
                                '.png'
                            ]}
                            buttonKind="primary"
                            buttonLabel="Upload"
                            filenameStatus="edit"
                            iconDescription="Clear file"
                            size="small"
                            labelDescription="Only .jpg and.png files | 2mb max size | 24 x 24 px width and height"
                            onChange={(event) => handleChange('logo', event)}
                        /><br />

                        {formDetails.type == "Dataset" ?
                            <>
                                <FormGroup
                                    legendText="Select Tag"
                                >
                                    <RadioButtonGroup
                                        defaultSelected="S3"
                                        legend="Group Legend"
                                        name="radio-button-group"
                                        onChange={(event) => { handleChange('tag', event) }}
                                    >
                                        <RadioButton
                                            id="s3"
                                            labelText="S3"
                                            value="S3"
                                        />
                                        <RadioButton
                                            id="csv"
                                            labelText="CSV"
                                            value="CSV"
                                        />
                                    </RadioButtonGroup>
                                </FormGroup>
                                <MultiSelect
                                    className={'form-element'}
                                    ariaLabel="MultiSelect"
                                    id="categories"
                                    label="Categories"
                                    value={formDetails.selectedDatasetCategories}
                                    items={DATA.DATASET_CATEGORIES}
                                    titleText="Categories"
                                    invalid={isValidating ? (formDetails.selectedDatasetCategories.length > 0 ? false : true) : false}
                                    invalidText="Please select Dataset categories"
                                    onChange={(event) => { handleChange('dataset_categories', event) }}
                                />
                                <br />
                            </> : ""
                        }
                        {
                            formDetails.type == "Notebook" ?
                                <>
                                    <MultiSelect
                                        className={'form-element'}
                                        ariaLabel="MultiSelect"
                                        id="categories"
                                        label="Categories"
                                        value={formDetails.selectedNotebookCategories}
                                        items={DATA.NOTEBOOK_CATEGORIES}
                                        invalid={isValidating ? (formDetails.selectedNotebookCategories.length > 0 ? false : true) : false}
                                        titleText="Categories"
                                        invalidText="Please select Notebook categories"
                                        onChange={(event) => { handleChange('notebook_categories', event) }}
                                    />
                                </> : ""
                        }
                        {
                            formDetails.type == "Operators" ?
                                <>
                                    <MultiSelect
                                        className={'form-element'}
                                        ariaLabel="MultiSelect"
                                        id="categories"
                                        label="Categories"
                                        value={formDetails.selectedOperatorCategories}
                                        items={DATA.OPERATOR_CATEGORIES}
                                        invalid={isValidating ? (formDetails.selectedOperatorCategories.length > 0 ? false : true) : false}
                                        titleText="Categories"
                                        invalidText="Please select Operator categories"
                                        onChange={(event) => { handleChange('operator_categories', event) }}
                                    />
                                </> : ""
                        }
                        {
                            formDetails.type == "API" ?
                                <>
                                    <MultiSelect
                                        className={'form-element'}
                                        ariaLabel="MultiSelect"
                                        id="categories"
                                        label="Categories"
                                        value={formDetails.selectedApiCategories}
                                        items={DATA.API_CATEGORIES}
                                        invalid={isValidating ? (formDetails.selectedApiCategories.length > 0 ? false : true) : false}
                                        titleText="Categories"
                                        invalidText="Please select API categories"
                                        onChange={(event) => { handleChange('Api_categories', event) }}
                                    />
                                </> : ""
                        }
                        {
                            formDetails.type == "Course" ?
                                <>
                                    <MultiSelect
                                        className={'form-element'}
                                        ariaLabel="MultiSelect"
                                        id="categories"
                                        label="Categories"
                                        value={formDetails.selectedCourseCategories}
                                        items={DATA.COURSE_CATEGORIES}
                                        invalid={isValidating ? (formDetails.selectedCourseCategories.length > 0 ? false : true) : false}
                                        titleText="Categories"
                                        invalidText="Please select Course categories"
                                        onChange={(event) => { handleChange('Course_categories', event) }}
                                    />
                                </> : ""
                        }
                        <br /><br />
                        <Button type="submit" className="bx--btn--secondary" size='small' onClick={validation}>Preview</Button>
                        <br />
                    </FormGroup>
                </Form>
                <div className="catalog-modal-preview">
                    <Modal
                        buttonTriggerText="Preview"
                        modalHeading="Catalog Preview"
                        primaryButtonText="Close"
                        onRequestSubmit={catalogSubmit}
                        onRequestClose={() => setIsModalOpen(false)}
                        open={isModalOpen}
                    >
                        <div>
                            <Preview catalogData={formDetails} />
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    documentData: state.createEnvDetails.documentData
})

export default connect(mapStateToProps)(CatalogDetails)