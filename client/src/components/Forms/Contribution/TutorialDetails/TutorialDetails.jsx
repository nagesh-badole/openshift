import React, { useState, useEffect } from 'react';
import './TutorialDetails.scss';
import { connect } from 'react-redux';
import { Button, Modal, ModalWrapper, TooltipIcon } from 'carbon-components-react';
import store from '../../../../store/store';
import * as DATA from '../../../../helpers/config.json';
import TutorialPreview from '../../../Preview/MetaDataPreview/TutorialPreview';
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
import Editor from "react-markdown-editor-lite";
import imgBlock from '../../Common/image';
import ReactMarkdown from "react-markdown";
import { setTutorialData } from '../../../../store/actions/createEnvActions';
import * as TUTORIAL_DATA from '../../../../helpers/tutorial-content.json';

const TutorialDetails = ({ tileData, documentData , tutorialData}) => {

    const tutorialObj = {
        description: '',
        duration: '',
        title: '',
        tutorial_content: '',
        tutorial_name: ''
    }
    const usefulLinkObj = {
        description: '',
        url: '',
        title: ''
    }
    const demoObj = {
        description: '',
        url: '',
        title: ''
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [value, setValue] = useState(TUTORIAL_DATA.content);
    const mdEditor = React.useRef(null);

    const [tutorialDetails, setTutorialDetails] = useState({
        name: '',
        appLayout: 'accordion',
        appTheme: 'g90',
        footer: 'footer.md',
        footer_content: '',
        tutorials: [{ ...tutorialObj }],
        usefulLinks: [{ ...usefulLinkObj }],
        demos: [{ ...demoObj }],
        "isTutorialSaved": false,
        images: [],
        isValidated: false,
        isTutorialAvailable: true
    });

    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setTutorialDetails({
                    ...tutorialDetails,
                    name: value
                })
                // if (tutorialDetails.isTutorialSaved) {
                //     setIsValidating(false)
                // }
                setIsValidating(false)
                setIsSaved(false)
                break;
            case 'footer_content':
                setTutorialDetails({
                    ...tutorialDetails,
                    footer_content: value
                })
                // if (tutorialDetails.isTutorialSaved) {
                //     setIsValidating(false)
                // }
                setIsValidating(false)
                setIsSaved(false)
                break;
            case 'tutorials':
                const updatedTutorials = [...tutorialDetails.tutorials];
                updatedTutorials[value.dataset.idx][value.className.split(' ')[1]] = value.value;
                if (value.className.split(' ')[1] == "title") {
                    updatedTutorials[value.dataset.idx]["tutorial_name"] = value.value.replace(/\s/g, "-") + ".md"
                }
                setTutorialDetails({ ...tutorialDetails, tutorials: updatedTutorials });
                // if (tutorialDetails.isTutorialSaved) {
                //     setIsValidating(false)
                // }
                setIsValidating(false)
                setIsSaved(false)
                break;
            case 'usefulLinks':
                const updatedUsefulLinks = [...tutorialDetails.usefulLinks]
                updatedUsefulLinks[value.dataset.idx][value.className.split(' ')[1]] = value.value
                setTutorialDetails({ ...tutorialDetails, usefulLinks: updatedUsefulLinks });
                // if (tutorialDetails.isTutorialSaved) {
                //     setIsValidating(false)
                // }
                setIsValidating(false)
                setIsSaved(false)
                break;
            case 'demos':
                const updatedDemos = [...tutorialDetails.demos]
                updatedDemos[value.dataset.idx][value.className.split(' ')[1]] = value.value
                setTutorialDetails({ ...tutorialDetails, demos: updatedDemos });
                // if (tutorialDetails.isTutorialSaved) {
                //     setIsValidating(false)
                // }
                setIsValidating(false)
                setIsSaved(false)
                break;
            case 'is_tutorial_available':
                setTutorialDetails({
                    ...tutorialDetails,
                    isTutorialAvailable: value
                })
                setIsValidating(false)
                break;
            default: return
        }
    }

    const handlePreview = (e) => {
        e.preventDefault();
        // if (metaDetails.preferredPlatform) {
        // setTutorialDetails({
        //     ...tutorialDetails,
        //     isValidated: true
        // })
        setIsModalOpen(true);
        // }
    }

    const handleEditorChange = (index, value) => {
        const updatedTutorials = [...tutorialDetails.tutorials];
        updatedTutorials[index]["tutorial_content"] = value;
        setValue(value.text);
        setTutorialDetails({ ...tutorialDetails, tutorials: updatedTutorials });
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
        console.log(tutorialDetails.tutorials)
    }

    const addTutorial = () => {
        setTutorialDetails({
            ...tutorialDetails,
            tutorials: [
                ...tutorialDetails.tutorials,
                { ...tutorialObj }
            ]
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const deleteTutorial = () => {
        let temp = [...tutorialDetails.tutorials]
        temp.pop()
        setTutorialDetails({
            ...tutorialDetails,
            tutorials: temp
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const addUsefulLink = () => {
        setTutorialDetails({
            ...tutorialDetails,
            usefulLinks: [
                ...tutorialDetails.usefulLinks,
                { ...usefulLinkObj }
            ]
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const deleteUsefulLink = () => {
        let temp = [...tutorialDetails.usefulLinks]
        temp.pop()
        setTutorialDetails({
            ...tutorialDetails,
            usefulLinks: temp
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const addDemo = () => {
        setTutorialDetails({
            ...tutorialDetails,
            demos: [
                ...tutorialDetails.demos,
                { ...demoObj }
            ]
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const deleteDemo = () => {
        let temp = [...tutorialDetails.demos]
        temp.pop()
        setTutorialDetails({
            ...tutorialDetails,
            demos: temp
        })
        if (tutorialDetails.isTutorialSaved) {
            setIsValidating(false)
        }
        setIsSaved(false)
    }

    const handleImageUpload = (file, callback) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.fileName = file.name
            reader.onload = data => {
                // @ts-ignore
                resolve('_images/' + reader.fileName);
            };
            reader.readAsDataURL(file);
            let imgArray = tutorialDetails.images
            imgArray.push({ name: file.name, fileData: file, selectedImgPreview: URL.createObjectURL(file) })
            setTutorialDetails({
                ...tutorialDetails,
                images: imgArray
            })
        });
    }

    useEffect(()=>{
        if(tileData.type !== "Operators" && tileData.type !== "Course"){
            setTutorialDetails({
                ...tutorialDetails,
                name: '',
                appLayout: 'accordion',
                appTheme: 'g90',
                footer: 'footer.md',
                footer_content: '',
                tutorials: [{ ...tutorialObj }],
                usefulLinks: [{ ...usefulLinkObj }],
                demos: [{ ...demoObj }],
                "isTutorialSaved": false,
                images: [],
                isTutorialAvailable: true,
                isValidated: true,

            });
        }
    },[tileData.type])

    useEffect(() => {
       if(!tutorialDetails.isTutorialAvailable || (tileData.type !== "Operators" && tileData.type !== "Course")){
        setTutorialDetails({
            ...tutorialDetails,
            isValidated: true
        });
       } else {
        setTutorialDetails({
            ...tutorialDetails,
            isValidated: false
        });
       }
    },[tutorialData.isTutorialAvailable, tileData.type ])

    useEffect(() => {
        if(tutorialDetails.name && tutorialDetails.footer_content &&  tutorialDetails.tutorials[0].title &&
            tutorialDetails.tutorials[0].tutorial_content && tutorialDetails.tutorials[0].duration && tutorialDetails.tutorials[0].description){
                
                setTutorialDetails({
                ...tutorialDetails,
                isValidated: true
            });
        }else{
            setTutorialDetails({
                ...tutorialDetails,
                isValidated: false
            });
        }
    }, [tutorialData.name, tutorialData.footer_content,tutorialData.tutorials,tutorialData.usefulLinks,tutorialData.demos])

    const validation = () => {
        setIsValidating(true);
    }

    //set data in store
    store.dispatch(setTutorialData(tutorialDetails))

    return (

        tileData.type == "Operators" || tileData.type == "Course" ?
            <>
                <div className='sectionHeader'>
                    <span>Tutorials Info</span>
                </div>
                <div className="tutorial-section">
                    <Form onSubmit={handlePreview}>
                        <FormGroup>
                            <label for="is_tutorial_available" className='bx--label'>Is Tutorial Available</label>
                            <RadioButtonGroup
                                defaultSelected={tutorialDetails.isTutorialAvailable}
                                legend="Group Legend"
                                name="radio-button-group"
                                onChange={(event) => { handleChange('is_tutorial_available', event) }}
                            >
                                <RadioButton
                                    id="Yes"
                                    labelText="Yes"
                                    value={true}
                                />
                                <RadioButton
                                    id="No"
                                    labelText="No"
                                    value={false}
                                />
                            </RadioButtonGroup>
                        </FormGroup>
                        {tutorialDetails.isTutorialAvailable &&
                            <>
                                <FormGroup>
                                    <TextInput
                                        id="name"
                                        invalidText="Please Enter Name of Tutorial"
                                        labelText="Name"
                                        placeholder=""
                                        value={tutorialDetails.name}
                                        onChange={(event) => handleChange('name', event.target.value)}
                                        required='true'
                                    />
                                    <br />
                                    <TextInput
                                        id="footer"
                                        invalidText="Please Enter footer content"
                                        labelText="Footer"
                                        value={tutorialDetails.footer}
                                        placeholder=""
                                        required
                                    />
                                    <br />
                                    <TextArea
                                        cols={50}
                                        id="footer content"
                                        invalidText="Please Enter footer content"
                                        labelText="Footer Content"
                                        placeholder=""
                                        rows={3}
                                        value={tutorialDetails.footer_content}
                                        onChange={(event) => handleChange('footer_content', event.target.value)}
                                        required='true'
                                        invalid={isValidating ? (tutorialDetails.footer_content ? false : true) : false}
                                    />
                                    <br />
                                </FormGroup>
                                <FormGroup>
                                    <div className="add-tutorial-section">
                                        <strong>Tutorials</strong>
                                        {
                                            tutorialDetails.tutorials.map((tutorial, index) => {
                                                const tutorialDesc = `tutorial-desc-${index}`;
                                                const tutorialDuration = `tutorial-duration-${index}`;
                                                const tutorialTitle = `tutorial-title-${index}`;
                                                const tutorialContent = `tutorial-content-${index}`;
                                                return (
                                                    <>
                                                        <br />
                                                        <br />
                                                        <TextInput
                                                            id={tutorialTitle}
                                                            invalidText="Please enter title of Tutorial"
                                                            labelText="Title"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('tutorials', event.target)}
                                                            value={tutorialDetails.tutorials[index].title}
                                                            data-idx={index}
                                                            className="title"
                                                            required
                                                            invalid={isValidating ? (tutorialDetails.tutorials[index].title ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextInput
                                                            id={tutorialDuration}
                                                            invalidText="Please enter estimate duration"
                                                            labelText="Duration"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('tutorials', event.target)}
                                                            value={tutorialDetails.tutorials[index].duration}
                                                            data-idx={index}
                                                            className="duration"
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.tutorials[index].duration ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextArea
                                                            cols={50}
                                                            id={tutorialDesc}
                                                            invalidText="Please enter short description about tutorial"
                                                            labelText="Description"
                                                            placeholder=""
                                                            rows={4}
                                                            value={tutorialDetails.tutorials[index].description}
                                                            className="description"
                                                            data-idx={index}
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.tutorials[index].description ? false : true) : false}
                                                            onChange={(event) => handleChange('tutorials', event.target)}
                                                        />
                                                        <br />
                                                        <label for="tutorial-content" className='bx--label'>Content</label>
                                                        <Editor
                                                            id={tutorialContent}
                                                            ref={mdEditor}
                                                            value={value}
                                                            style={{
                                                                height: "500px",
                                                                width: "45rem",
                                                                maxWidth: "45rem"
                                                            }}
                                                            renderHTML={text => <ReactMarkdown source={text} renderers={{ image: imgBlock }} />}
                                                            onImageUpload={handleImageUpload}
                                                            onChange={(event) => handleEditorChange(index, event)}
                                                        />
                                                        <br />
                                                    </>
                                                )
                                            })
                                        }
                                        <br />
                                        <div className="command-op-section">
                                            {tutorialDetails.tutorials.length > 1 ? (
                                                <a target="_self" onClick={deleteTutorial}>
                                                    <TrashCan16 />Remove
                                                </a>
                                            ) : (
                                                    null
                                                )}
                                            <a target="_self" onClick={addTutorial}>
                                                <AddAlt16 />Add more
                                        </a>
                                        </div>
                                        <br />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="add-tutorial-section">
                                        <strong>Useful Links</strong>
                                        {
                                            tutorialDetails.usefulLinks.map((usefulLink, index) => {
                                                const usefulLinkDesc = `usefulLink-desc-${index}`;
                                                const usefulLinkURL = `usefulLink-duration-${index}`;
                                                const usefulLinkTitle = `usefulLink-title-${index}`;
                                                return (
                                                    <>
                                                        <br />
                                                        <br />
                                                        <TextInput
                                                            id={usefulLinkTitle}
                                                            invalidText="Please enter title"
                                                            labelText="Title"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('usefulLinks', event.target)}
                                                            value={tutorialDetails.usefulLinks[index].title}
                                                            data-idx={index}
                                                            className="title"
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.usefulLinks[index].title ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextInput
                                                            id={usefulLinkURL}
                                                            invalidText="Please Enter valid URL"
                                                            labelText="URL"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('usefulLinks', event.target)}
                                                            value={tutorialDetails.usefulLinks[index].url}
                                                            data-idx={index}
                                                            className="url"
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.usefulLinks[index].url ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextArea
                                                            cols={50}
                                                            id={usefulLinkDesc}
                                                            invalidText="Please enter short description about URL"
                                                            labelText="Description"
                                                            placeholder=""
                                                            rows={4}
                                                            value={tutorialDetails.usefulLinks[index].description}
                                                            className="description"
                                                            data-idx={index}
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.usefulLinks[index].description ? false : true) : false}
                                                            onChange={(event) => handleChange('usefulLinks', event.target)}
                                                        />
                                                        <br />
                                                    </>
                                                );
                                            })
                                        }
                                        <br />
                                        <div className="command-op-section">
                                            {tutorialDetails.usefulLinks.length > 1 ? (
                                                <a target="_self" onClick={deleteUsefulLink}>
                                                    <TrashCan16 />Remove
                                                </a>
                                            ) : (
                                                    null
                                                )}
                                            <a target="_self" onClick={addUsefulLink}>
                                                <AddAlt16 />Add more
                                        </a>
                                        </div>
                                        <br />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="add-tutorial-section">
                                        <strong>Demo</strong>
                                        {
                                            tutorialDetails.demos.map((demo, index) => {
                                                const demoDesc = `demo-desc-${index}`;
                                                const demoURL = `demo-url-${index}`;
                                                const demoTitle = `demo-title-${index}`;
                                                return (
                                                    <>
                                                        <br />
                                                        <br />
                                                        <TextInput
                                                            id={demoTitle}
                                                            invalidText="Please Enter title of Demo"
                                                            labelText="Title"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('demos', event.target)}
                                                            value={tutorialDetails.demos[index].title}
                                                            data-idx={index}
                                                            className="title"
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.demos[index].title ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextInput
                                                            id={demoURL}
                                                            invalidText="Please enter URL for demo"
                                                            labelText="URL"
                                                            placeholder=""
                                                            onChange={(event) => handleChange('demos', event.target)}
                                                            value={tutorialDetails.demos[index].url}
                                                            data-idx={index}
                                                            className="url"
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.demos[index].url ? false : true) : false}
                                                        />
                                                        <br />
                                                        <TextArea
                                                            cols={50}
                                                            id={demoDesc}
                                                            invalidText="Please Enter short description about"
                                                            labelText="Description"
                                                            placeholder=""
                                                            rows={4}
                                                            value={tutorialDetails.demos[index].description}
                                                            className="description"
                                                            data-idx={index}
                                                            required='true'
                                                            invalid={isValidating ? (tutorialDetails.demos[index].description ? false : true) : false}
                                                            onChange={(event) => handleChange('demos', event.target)}
                                                        />
                                                        <br />
                                                    </>
                                                );
                                            })
                                        }
                                        <br />
                                        <div className="command-op-section">
                                            {tutorialDetails.demos.length > 1 ? (
                                                <a target="_self" onClick={deleteDemo}>
                                                    <TrashCan16 />Remove
                                                </a>
                                            ) : (
                                                    null
                                                )}
                                            <a target="_self" onClick={addDemo}>
                                                <AddAlt16 />Add more
                                        </a>
                                        </div>
                                        <br />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button size='small' type="submit" className="bx--btn--secondary">Preview</Button>
                                </FormGroup>
                            </>
                        }
                    </Form>
                    {isModalOpen && <div className="catalog-modal-preview">
                        <Modal
                            buttonTriggerText="Preview"
                            modalHeading="Tutorial Data Preview"
                            primaryButtonText="Close"
                            onRequestSubmit={() => setIsModalOpen(false)}
                            onRequestClose={() => setIsModalOpen(false)}
                            open={isModalOpen}
                        >
                            <div>
                                <TutorialPreview />
                            </div>
                        </Modal>
                    </div>}
                </div>
            </> :
            <div className="hide-content">
                <h3>Not Applicable</h3>
            </div>
    )
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    documentData: state.createEnvDetails.documentData,
    tutorialData: state.createEnvDetails.tutorialData
})

export default connect(mapStateToProps)(TutorialDetails)