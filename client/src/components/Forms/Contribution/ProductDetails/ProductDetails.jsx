import React, { useState, useEffect } from 'react';
import './ProductDetails.scss';
import { connect } from 'react-redux';
import { Button, ModalWrapper, Modal } from 'carbon-components-react';
import store from '../../../../store/store';
import 'carbon-components/css/carbon-components.min.css';
import 'github-markdown-css';
import * as DATA from '../../../../helpers/config.json';
import _map from 'lodash/map';
import PreviewDashboard from '../../../Preview/DashboardPreview/PreviewDashboard';
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
    TooltipIcon
} from 'carbon-components-react';
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import { setCoverData } from '../../../../store/actions/createEnvActions';
import imgBlock from '../../Common/image';
import { Information16 } from "@carbon/icons-react";

const ProductDetails = ({ tileData , coverData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const mdEditor = React.useRef(null);
    const [value, setValue] = React.useState("");
    const [coverDetails, setCoverDetails] = useState({
        cover: value,
        images: [],
        isValidated: false
    })

    const handleEditorChange = ({ html, text }) => {
        const newValue = text;
        console.log(newValue);
        setValue(newValue);
        setCoverDetails({
            ...coverDetails,
            cover: newValue
        })
        store.dispatch(setCoverData(coverDetails));
    };

    useEffect(() => {
        console.log(coverDetails)
    }, [value])

    useEffect(() => {
        console.log("inside useeffect")
        if(coverDetails.cover){
            setCoverDetails({
                ...coverDetails,
                isValidated : true
            });
        }
        else{
            setCoverDetails({
                ...coverDetails,
                isValidated : false
            });
        }
    }, [coverData.cover])

    //set data in store
    store.dispatch(setCoverData(coverDetails))

    const handlePreview = () => {
        if(coverDetails.cover){
            setCoverDetails({
                ...coverDetails,
                isValidated : true
            });
            setIsValidating(false);
            setIsModalOpen(true);
        }
        else{
            setIsValidating(true);
        }
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
            let imgArray = coverDetails.images
            imgArray.push({ name: file.name, fileData: file, selectedImgPreview: URL.createObjectURL(file) })
            setCoverDetails({
                ...coverDetails,
                images: imgArray
            })
            store.dispatch(setCoverData(coverDetails));


        });
    }

    return (
        <>
         <div className='sectionHeader'>
            <span>Cover Info</span>
        </div>
            <div className="cover-editor">
                {/* Cover<TooltipIcon
                    tooltipText="More information about the product"
                >
                    <Information16 />
                </TooltipIcon> */}
                <p class="bx--label-description">* While uploading images to cover.md content , please ensure that the Image file name should NOT contain any space.</p>
                <Editor
                    ref={mdEditor}
                    value={value}
                    style={{
                        height: "500px",
                        width: "60rem"
                    }}
                    renderHTML={text => <ReactMarkdown source={text} renderers={{ image: imgBlock }} />}
                    onImageUpload={handleImageUpload}
                    onChange={handleEditorChange}

                />
                <br /><br />
                <Button size="small" className="bx--btn--secondary" onClick={() => handlePreview()}>Preview</Button>
                <br /><br />
                {   isValidating && !coverDetails.cover &&
                    <span className="custom-invalidText">
                        Please update information about your product in .md format
                    </span>
                }
            </div>

            <div className="product-modal-preview">
                <Modal
                    buttonTriggerText="Final Preview"
                    modalHeading="Product Detail Preview"
                    primaryButtonText="Ok"
                    secondaryButtonText="Edit"
                    onRequestSubmit={() => setIsModalOpen(false)}
                    onSecondarySubmit={() => setIsModalOpen(false)}
                    onRequestClose={() => setIsModalOpen(false)}
                    open={isModalOpen}
                >
                    <div>
                        <PreviewDashboard textData={coverDetails} />
                    </div>
                </Modal>
            </div>

        </>
    )
}

const mapStateToProps = state => ({
    tileData: state.createEnvDetails.tileData,
    coverData: state.createEnvDetails.coverData,
})

export default connect(mapStateToProps)(ProductDetails)