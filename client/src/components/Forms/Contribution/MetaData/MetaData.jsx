import React, { useState, useEffect } from 'react';
import './MetaData.scss';
import { connect } from 'react-redux';
import { Button, ModalWrapper, Modal } from 'carbon-components-react';
import store from '../../../../store/store';
import 'carbon-components/css/carbon-components.min.css';
import 'github-markdown-css';
import * as DATA from '../../../../helpers/config.json';
import MetaDataPreview from '../../../Preview/MetaDataPreview/MetaDataPreview';
import _map from 'lodash/map';
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
    NumberInput,
    DatePicker,
    DatePickerInput,
    TooltipIcon
} from 'carbon-components-react';
import { TrashCan16, AddAlt16, Information16 } from "@carbon/icons-react";
import { setDocumentData } from '../../../../store/actions/createEnvActions';


const MetaData = ({ tileData, dataSets, metaConfigData , documentData}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const bucketObj = { name: '' }
    const contactObj = { email: '' }
    const commandObj = { description: '', exec: '' }

    const [metaDetails, setMetaDetails] = useState({
        bucketName: [bucketObj],
        datasetS3Buckets: [],
        installTime: 0,
        source_repo: '',
        isUsingExistingDataset: false,
        datasetBuckets: [],
        datasetNotebookTitle: '',
        datasetType: '',
        datasetCatalogId: '',
        isCertified: false,
        hasApi: false,
        hasDataset: false,
        hasSupport: false,
        command: [],
        commands: [commandObj],
        isValidated: false,
        contact: [],
        contactDetails: [contactObj]
    })

    useEffect(() => {
        setMetaDetails({
            bucketName: [bucketObj],
            datasetS3Buckets: [],
            installTime: 0,
            source_repo: '',
            isUsingExistingDataset: false,
            datasetBuckets: [],
            datasetNotebookTitle: '',
            datasetType: '',
            datasetCatalogId: '',
            isCertified: false,
            hasApi: false,
            hasDataset: false,
            hasSupport: false,
            isValidated: false,
            command: [],
            commands: [commandObj],
            contact: [],
            contactDetails: [contactObj]
        })
        setIsValidating(false)
        store.dispatch(setDocumentData(metaDetails))
    }, [tileData.type])

    
    useEffect(() => {
        // if(metaConfigData['Dataset']){metaConfigData['Dataset']['S3']['config'][0].required = true}
        if(tileData.type === "Notebook") {
            metaConfigData['Notebook']['config'].map((field, index) => {
                if(field.required) {
                    metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                    setMetaDetails({...metaDetails,isValidated: true})
                    : setMetaDetails({...metaDetails,isValidated: false})
                }
            })
        }
        if(tileData.type === "Dataset") {
            if(tileData.tag === "S3") {
                metaConfigData['Dataset']['S3']['config'].map((field, index) => {
                    if(field.required) {
                        metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                        setMetaDetails({...metaDetails,isValidated: true})
                        : setMetaDetails({...metaDetails,isValidated: false})
                    }
                })
            } else {
                metaConfigData['Dataset']['CSV']['config'].map((field, index) => {
                    if(field.required) {
                        metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                        setMetaDetails({...metaDetails,isValidated: true})
                        : setMetaDetails({...metaDetails,isValidated: false})
                    }
                })
            }  
        }
        if(tileData.type === "API") {
            metaConfigData['API']['config'].map((field, index) => {
                if(field.required) {
                    metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                    setMetaDetails({...metaDetails,isValidated: true})
                    : setMetaDetails({...metaDetails,isValidated: false})
                }
            })
        }
        if(tileData.type === "Operators") {
            metaConfigData['Operators']['config'].map((field, index) => {
                if(field.required) {
                    metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                    setMetaDetails({...metaDetails,isValidated: true})
                    : setMetaDetails({...metaDetails,isValidated: false})
                }
            })
        }
        if(tileData.type === "Course") {
            metaConfigData['Course']['config'].map((field, index) => {
                if(field.required) {
                    metaDetails["meta"] && metaDetails["meta"][field.labelText] && metaDetails["meta"][field.labelText][0] !== '' ? 
                    setMetaDetails({...metaDetails,isValidated: true})
                    : setMetaDetails({...metaDetails,isValidated: false})
                }
            })
        }
    }, [metaDetails["meta"]])

    const addMore_bucket = () => {
        setMetaDetails({
            ...metaDetails,
            bucketName: [
                ...metaDetails.bucketName,
                { ...bucketObj }
            ]
        })
    }

    const deleteBucket = () => {
        let temp = [...metaDetails.bucketName]
        temp.pop()
        setMetaDetails({
            ...metaDetails,
            bucketName: temp
        })
    }

    const addMoreContact = () => {
        setMetaDetails({
            ...metaDetails,
            contactDetails: [
                ...metaDetails.contactDetails,
                { ...contactObj }
            ]
        })
    }

    const deleteContact = () => {
        let temp = [...metaDetails.contactDetails]
        temp.pop()
        setMetaDetails({
            ...metaDetails,
            contactDetails: temp
        })
    }

    const deleteCommand = () => {
        let temp = [...metaDetails.commands]
        temp.pop()
        setMetaDetails({
            ...metaDetails,
            commands: temp
        })
    }

    const addCommand = () => {
        setMetaDetails({
            ...metaDetails,
            commands: [
                ...metaDetails.commands,
                { ...commandObj }
            ]
        })
    }

    const handlePreview = (e) => {
        e.preventDefault();
        // if (metaDetails.preferredPlatform) {
        setMetaDetails({
            ...metaDetails,
            isValidated: true
        })
        setIsModalOpen(true);
        // }
    }

    const validation = () => {
        setIsValidating(true);
    }

    const handleDynamicChange = (id, value) => {
        let temp = []
        temp.push(value)
        setMetaDetails({
            ...metaDetails,
            "meta": {
                ...metaDetails["meta"],
                [id]: temp
            }
        })
        setIsValidating(false)
    }

    const handleChange = (field, event) => {
        switch (field) {
            case 'bucket':
                const updatedBuckets = [...metaDetails.bucketName];
                updatedBuckets[event.target.dataset.idx] = event.target.value;
                setMetaDetails({ ...metaDetails, bucketName: updatedBuckets, datasetS3Buckets: updatedBuckets });
                setIsValidating(false)
                break;
            case 'contact':
                const updatedContact = [...metaDetails.contactDetails];
                updatedContact[event.target.dataset.idx] = event.target.value;
                setMetaDetails({
                    ...metaDetails,
                    contactDetails: updatedContact,
                    contact: updatedContact
                });
                console.log(updatedContact)
                setIsValidating(false)
                break;
            case 'commands':
                const updatedCommands = [...metaDetails.commands]
                updatedCommands[event.target.dataset.idx][event.target.className.split(' ')[1]] = event.target.value;
                setMetaDetails({ ...metaDetails, commands: updatedCommands , command: updatedCommands});
                setIsValidating(false)
                break;
            case 'source_repo':
                setMetaDetails({
                    ...metaDetails,
                    source_repo: event
                })
                setIsValidating(false)
                break;
            case 'installTime':
                setMetaDetails({
                    ...metaDetails,
                    installTime: event
                });
                setIsValidating(false)
                break;
            case 'dataset_catalog_id':
                setMetaDetails({
                    ...metaDetails,
                    datasetCatalogId: event.selectedItem && event.selectedItem !== undefined ? event.selectedItem.id : event,
                    datasetType: event.selectedItem && event.selectedItem !== undefined ? event.selectedItem.dataType : '',
                    datasetBuckets: event.selectedItem && event.selectedItem !== undefined ? event.selectedItem.buckets : [],
                    datasetNotebookTitle: event.selectedItem && event.selectedItem !== undefined ? event.selectedItem.text : ''
                })
                setIsValidating(false)
                break;
            case 'use-existing-dataset':
                setMetaDetails({
                    ...metaDetails,
                    isUsingExistingDataset: event
                })
                setIsValidating(false)
                break;
            case 'is_certified':
                setMetaDetails({
                    ...metaDetails,
                    isCertified: event
                })
                setIsValidating(false)
                break;
            case 'has_support':
                setMetaDetails({
                    ...metaDetails,
                    hasSupport: event
                })
                setIsValidating(false)
                break;
            case 'has_dataset':
                setMetaDetails({
                    ...metaDetails,
                    hasDataset: event
                })
                setIsValidating(false)
                break;
            case 'has_api':
                setMetaDetails({
                    ...metaDetails,
                    hasApi: event
                })
                setIsValidating(false)
                break;
        }
    }

    //set data in store
    store.dispatch(setDocumentData(metaDetails))

    const renderUI = (formConfig) => {
        return formConfig.map((field, index) => {
            switch (field.type) {
                case 'TextInput':
                    return <>
                        <label for={field.id} className='bx--label'>{field.labelText}</label>
                        {field.has_info_icon && <TooltipIcon
                            tooltipText={field.info_tooltip_text}>
                            <Information16 />
                        </TooltipIcon>}<br />
                        <TextInput
                            pattern={field.pattern ? field.pattern : '[^]*'}
                            className={'form-element'}
                            id={field.id}
                            value={metaDetails.meta !== undefined && metaDetails.meta !== null && metaDetails.meta[field.labelText] !== undefined ? metaDetails.meta[field.labelText] : ''}
                            labelText=""
                            placeholder={field.placeholder}
                            onChange={(event) => handleDynamicChange(field.labelText, event.target.value)}
                            required={field.required}
                            invalid={isValidating && field.required ? (metaDetails !== undefined && metaDetails.meta !== undefined && metaDetails.meta[field.labelText] ? false : true) : false}
                        /><br /><br />
                    </>
                    break;
                case 'NumberInput':
                    return <>
                        <label for={field.id} className='bx--label'>{field.labelText}</label>
                        {field.has_info_icon && <TooltipIcon
                            tooltipText={field.info_tooltip_text}>
                            <Information16 />
                        </TooltipIcon>}
                        <br />
                        <NumberInput
                            className={'form-element'}
                            id={field.id}
                            invalidText={field.invalidText}
                            label=""
                            min={0}
                            allowEmpty={false}
                            required
                            invalid={isValidating ? (metaDetails[field.labelText] !== 0 ? false : true) : false}
                            value={metaDetails[field.labelText]}
                            helperText={field.helperText}
                            onChange={(event) => handleChange(field.labelText, event.target.value ? event.target.value : event.imaginaryTarget.value)}
                        /><br /><br />
                    </>
                    break;
                case 'DatePicker':
                    return <>
                        <label for={field.id} className='bx--label'>{field.labelText}</label>
                        {field.has_info_icon && <TooltipIcon
                            tooltipText="Date when the dataset/notebook was last modified">
                            <Information16 />
                        </TooltipIcon>}
                        <br />
                        <DatePicker
                            dateFormat={field.dateFormat}
                            datePickerType={field.datePickerType}
                            onChange={(event) => handleDynamicChange(field.labelText, new Date(event).toString().substring(4, 15))}
                            maxDate={new Date()}
                        >
                            <DatePickerInput
                                id={field.id}
                                placeholder={field.placeholder}
                                labelText=""
                                type="text"
                            />
                        </DatePicker><br /><br />
                    </>
                    break;
                case 'Dropdown':
                    return <>
                        <label for={field.id} className='bx--label'>{field.labelText}</label>
                        {field.has_info_icon && <TooltipIcon
                            tooltipText={field.info_tooltip_text}>
                            <Information16 />
                        </TooltipIcon>}
                        <br />
                        <Dropdown
                            className={'form-element'}
                            ariaLabel="Dropdown"
                            id={field.id}
                            items={field.options}
                            label={field.label}
                            itemToString={(item) => (item ? item.menu : '')}
                            titleText=""
                            invalid={isValidating ? (metaDetails !== undefined && metaDetails.meta !== undefined && metaDetails.meta[field.labelText] ? false : true) : false}
                            invalidText={field.invalidText}
                            onChange={(event) => { handleDynamicChange(field.labelText, event.selectedItem.menu) }}
                        /><br /><br />
                    </>
                    break;
            }
        })
    }
    return (
        <>
            <div className='sectionHeader'>
                <span>Meta Data</span>
            </div>
            <div className="metaDetails">
                <Form onSubmit={handlePreview}>
                    {metaDetails !== undefined && metaDetails !== null &&
                        <FormGroup>
                            {
                                tileData.type === "Notebook" ?
                                    <>
                                        <label for="use-existing-dataset" className="bx--label">Use existing dataset from catalog?</label>
                                        <RadioButtonGroup
                                            name="use-existing-dataset"
                                            onChange={(event) => { handleChange('use-existing-dataset', event) }}
                                        >
                                            <RadioButton
                                                id="existing"
                                                labelText="Yes"
                                                value={true}
                                            />
                                            <RadioButton
                                                id="not-existing"
                                                labelText="No"
                                                value={false}
                                            />
                                        </RadioButtonGroup>
                                        <br /><br />
                                        {
                                            metaDetails.isUsingExistingDataset && dataSets && dataSets.length > 0 && dataSets !== null && dataSets !== undefined ? (
                                                <>
                                                    <Dropdown
                                                        className={'form-element'}
                                                        ariaLabel="Dropdown"
                                                        id="dataset_catalog_id"
                                                        items={dataSets}
                                                        itemToString={(item) => (item ? item.text + ' (' + item.dataType + ')' : '')}
                                                        label="Select Dataset Catalog Id"
                                                        titleText="Select Dataset"
                                                        invalid={isValidating ? (metaDetails.datasetCatalogId ? false : true) : false}
                                                        invalidText="Please enter Dataset Catalog Id"
                                                        onChange={(event) => { handleChange('dataset_catalog_id', event) }}
                                                    /><br />
                                                    {
                                                        metaDetails.datasetBuckets && metaDetails.datasetBuckets.length > 0 ? (
                                                            <>
                                                                <br />
                                                                <span style={{ fontSize: '0.77rem' }}>Bucket Name</span>
                                                                <br />
                                                                <br />
                                                                <span style={{ fontSize: '0.77rem' }}>{metaDetails.datasetBuckets.join(', ')}</span>
                                                            </>
                                                        ) : null
                                                    }
                                                    <br /><br /><br /><br />
                                                </>
                                            ) : ''}
                                    </> : ''
                            }

                            {/* Bucket name  */}
                            {tileData.type === "Dataset" && tileData.tag === "S3" ?
                                <>
                                    <span style={{ fontSize: '0.77rem' }}>Bucket Name</span>
                                    <br /><br />
                                    {
                                        metaDetails.bucketName.map((bucket, index) => {
                                            return (
                                                <>
                                                    <TextInput
                                                        id={`bucketText-${index}`}
                                                        required
                                                        placeholder=""
                                                        invalid={isValidating ? (metaDetails.datasetS3Buckets.length > 0 ? false : true) : false}
                                                        labelText=""
                                                        data-idx={index}
                                                        onChange={(event) => handleChange('bucket', event)}
                                                    />                                                        <br />
                                                </>
                                            )
                                        })
                                    }

                                    <div className="command-op-section">
                                        {
                                            metaDetails.bucketName.length > 1 ? (
                                                <a target="_self" onClick={deleteBucket}>
                                                    <TrashCan16 />Remove
                                                </a>
                                            ) : ''
                                        }
                                        <a target="_self" onClick={addMore_bucket}>
                                            <AddAlt16 />Add more
                                    </a>
                                    </div>
                                    <br />
                                </> : ''
                            }

                            {
                                ((tileData.type === 'Dataset' && tileData.tag === 'CSV') || (tileData.type === 'Notebook') || 
                                    tileData.type === 'API' || tileData.type === 'Operators' || tileData.type === 'Course') &&
                                <>
                                    <label for="git_repo" className='bx--label'>Source Repository</label>
                                    <TooltipIcon
                                        tooltipText={(tileData.tag === 'CSV') ? '"Git URL of the repo containing the CSV file(s)"' : '"Git URL of the repo containing data"'}>
                                        <Information16 />
                                    </TooltipIcon><br />
                                    <TextInput
                                        className={'form-element'}
                                        id="git_repo"
                                        labelText=""
                                        value={metaDetails.source_repo}
                                        required
                                        invalid={isValidating ? (metaDetails.source_repo ? false : true) : false}
                                        pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                                        placeholder="eg: https://github.com/op-playground/operator-playground.git"
                                        onChange={(event) => handleChange('source_repo', event.target.value)}
                                    /><br />
                                </>
                            }

                            {/* Install time */}
                            <label for="installTime" className='bx--label'>
                                { tileData.type === "Course" ? 'Course Duration' : 'Install Time'} 
                                </label>
                            <TooltipIcon
                                tooltipText=  {(tileData.type === "Course") ? "Estimated time for your Course" : "Estimated time for your deployment"} >
                    
                                <Information16 />
                            </TooltipIcon><br />
                            <NumberInput
                                className={'form-element'}
                                id="installTime"
                                invalidText="Please Enter Estimated time for your deployment"
                                label=""
                                min={0}
                                // allowEmpty={false}
                                required
                                invalid={isValidating ? (metaDetails.installTime !== 0 ? false : true) : false}
                                value={metaDetails.installTime}
                                helperText="(in minutes)"
                                onChange={(event) => handleChange('installTime', event.target.value ? event.target.value : event.imaginaryTarget.value)}
                            />
                            <br /><br />
                            
                            {
                                metaConfigData !== null && metaConfigData !== undefined && metaConfigData !== '' &&
                                    tileData.type !== undefined && tileData.type !== null &&

                                    tileData.type === 'Notebook' ? renderUI(metaConfigData['Notebook']['config']) :
                                    (tileData.type === 'Dataset' && metaConfigData['Dataset'] !== null && metaConfigData['Dataset'] !== undefined) ?
                                        (tileData.tag === 'S3') ?
                                            renderUI(metaConfigData['Dataset']['S3']['config']) :
                                            (tileData.tag === 'CSV') ?
                                                renderUI(metaConfigData['Dataset']['CSV']['config'])
                                                : ''
                                        : ''
                            }
                            {  metaConfigData !== null && metaConfigData !== undefined && metaConfigData !== '' &&
                                    tileData.type !== undefined && tileData.type !== null && 

                                    tileData.type === 'API' ? renderUI(metaConfigData['API']['config']) : 
                                    (tileData.type === 'Operators' && metaConfigData['Operators'] !== null && metaConfigData['Operators'] !== undefined) ?
                                    tileData.type === 'Operators' ? renderUI(metaConfigData['Operators']['config']) : ''
                                    : ''
                            }
                            {  metaConfigData !== null && metaConfigData !== undefined && metaConfigData !== '' &&
                                    tileData.type !== undefined && tileData.type !== null && 

                                    tileData.type === 'Course' ? renderUI(metaConfigData['Course']['config']) : ''
                            }
                            {/* <br /><br /> */}
                            { tileData.type === "Operators" &&
                                <FormGroup>
                                <div className="add-command-section">
                                    <strong>Commands</strong>
                                    {
                                        metaDetails.commands.map((cmd, index) => {
                                            const cmdDesc = `cmd-desc-${index}`;
                                            const cmdExec = `cmd-exec-${index}`;
                                            return (
                                                <>
                                                    <br />
                                                    <br />
                                                    <TextInput
                                                        id={cmdDesc}
                                                        invalidText="A valid value is required"
                                                        labelText="Description"
                                                        placeholder=""
                                                        onChange={(event) => handleChange('commands', event)}
                                                        value={metaDetails.commands[index].description}
                                                        data-idx={index}
                                                        className="description"
                                                        required='true'
                                                        // invalid={isValidating ? (metaDetails.commands[index].description ? false : true) : false}
                                                    />
                                                    <br />
                                                    <TextArea
                                                        cols={50}
                                                        id={cmdExec}
                                                        invalidText="A valid value is required"
                                                        labelText="Execution"
                                                        placeholder=""
                                                        rows={4}
                                                        value={metaDetails.commands[index].exec}
                                                        className="exec"
                                                        data-idx={index}
                                                        required='true'
                                                        // invalid={isValidating ? (metaDetails.commands[index].exec ? false : true) : false}
                                                        onChange={(event) => handleChange('commands', event)}
                                                    />
                                                    <br />
                                                </>
                                            )
                                        })
                                    }
                                    <br />
                                    <div className="command-op-section">
                                        {metaDetails.commands.length > 1 ? (
                                            <a target="_self" onClick={deleteCommand}>
                                                <TrashCan16 />Remove
                                            </a>
                                        ) : (
                                                null
                                            )}
                                        <a target="_self" onClick={addCommand}>
                                            <AddAlt16 />Add more
                                    </a>
                                    </div>
                                    <br />
                                </div>
                            </FormGroup>    
                            }

                            {  (tileData.type === "Notebook" || tileData.type === "Dataset" ||
                                tileData.type === "Operators" || tileData.type === "API" || tileData.type === "Course") &&
                            <>
                                <div className="radio-btns">
                                <label for="is_certified" className="bx--label" >Is Certified?</label>
                                <RadioButtonGroup
                                    defaultSelected={metaDetails.isCertified}
                                    name="is_certified"
                                    onChange={(event) => { handleChange('is_certified', event) }}
                                >
                                    <RadioButton
                                        id="certified"
                                        labelText="Yes"
                                        value={true}
                                    />
                                    <RadioButton
                                        id="not-certified"
                                        labelText="No"
                                        value={false}
                                    />
                                </RadioButtonGroup>

                                <label for="has_support" className="bx--label">Has Support?</label>
                                <RadioButtonGroup
                                    defaultSelected={metaDetails.hasSupport}
                                    name="has_support"
                                    onChange={(event) => { handleChange('has_support', event) }}
                                >
                                    <RadioButton
                                        id="has_support"
                                        labelText="Yes"
                                        value={true}
                                    />
                                    <RadioButton
                                        id="not-support"
                                        labelText="No"
                                        value={false}
                                    />
                                </RadioButtonGroup>
                                </div>

                                <br /><br />
                            </>
                            }

                            <label for="contact" className='bx--label'>Contact</label>
                            <TooltipIcon
                                tooltipText="Support contact">
                                <Information16 />
                            </TooltipIcon><br />

                            {
                                metaDetails.contactDetails.map((contact, index) => {
                                    return (
                                        <>
                                            <TextInput
                                                id={`contact-${index}`}
                                                invalidText="invalid"
                                                labelText=""
                                                value = {metaDetails.contactDetails[index].email}
                                                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                                                placeholder=""
                                                data-idx={index}
                                                onChange={(event) => handleChange('contact', event)}
                                            />
                                            <br />
                                        </>
                                    )
                                })
                            }
                            <div className="command-op-section">
                                {metaDetails.contactDetails.length > 1 ? (
                                    <a target="_self" onClick={deleteContact}>
                                        <TrashCan16 />Remove
                                    </a>
                                ) : (
                                        null
                                    )}
                                <a target="_self" onClick={addMoreContact}>
                                    <AddAlt16 />Add more
                                        </a>
                            </div><br /><br />
                            <Button size='small' type="submit" className="bx--btn--secondary" style={{}} onClick={validation}>Preview</Button>
                        </FormGroup>
                    }
                </Form>
                <div className="catalog-modal-preview">
                    <Modal
                        buttonTriggerText="Preview"
                        modalHeading="Meta Data Preview"
                        primaryButtonText="Close"
                        onRequestSubmit={() => setIsModalOpen(false)}
                        onRequestClose={() => setIsModalOpen(false)}
                        open={isModalOpen}
                    >
                        <div>
                            <MetaDataPreview />
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    dataSets: state.createEnvDetails.dataSets,
    metaConfigData: state.createEnvDetails.metaConfigData,
    documentData: state.createEnvDetails.documentData

})

export default connect(mapStateToProps)(MetaData)