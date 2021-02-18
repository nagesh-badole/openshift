import React, { useEffect, useState } from 'react'
import './preview.scss';
import { connect } from 'react-redux'
import { Tabs, Tab, ClickableTile, OverflowMenu, OverflowMenuItem, FormGroup, RadioButton, ToggleSmall, RadioButtonGroup, Checkbox, TooltipDefinition, Search, Tag } from 'carbon-components-react'
import './tile.scss'
import './TryStack.scss'
import Layout from '../Layout/Layout'
import { useHistory, Link } from "react-router-dom";
import {
    ArrowRight16,
    CheckmarkOutline16
} from "@carbon/icons-react";
import uuid from 'react-uuid'
import logoImage from './../../../assets/images/dataset.png'


const Preview = (props) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    props.catalogData.installTime = 2;
    const catalog = props.catalogData;

    return (
        <Layout>
            <div className="preview__container">
                <div className="preview__content">
                    <div className="homepage__content_container">
                    { (catalog.type == "Dataset" || catalog.type == "Notebook") &&
                            <>
                            <br/>
                                <Tabs>
                                    <Tab href="#" id="tab-1" label="Data Explorer Catalog" style={{ pointerEvents: 'none' }}>
                                    </Tab>
                                    <Tab id="tab-2" style={{ pointerEvents: 'none' }}
                                        label={
                                            <div className="extServer_tabname">
                                                <div className="extServer_name">
                                                    JupyterHub
                                                </div>
                                                <div className="extServer_openNewTab" title="Open in New tab" >
                                                    <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" fill="#000">
                                                        <path d="M26 28H6a2 2 0 01-2-2V6a2 2 0 012-2h9v2H6v20h20v-9h2v9a2 2 0 01-2 2z" />
                                                        <path d="M21 2v2h5.59L18 12.59 19.41 14 28 5.41V11h2V2h-9z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        }
                                    />
                                    <Tab href="#" id="tab-3" label="How To" style={{ pointerEvents: 'none' }} />
                                </Tabs>
                            </>
                        }
                        <div className='prebuild-stack-container bx--grid'>
                            <section className='prebuild-stack-items bx--row'>
                                <div className='prebuild-stack-menu bx--col-max-2 bx--col-xlg-3 bx--col-lg-3 bx--col-md-2 bx--col-sm-1'>
                                    <div className="prebuilt-stack-header">
                                        <h3 className="titleCategoryTitle" >Catalog</h3>
                                    </div>
                                    <FormGroup legendText="Show">
                                        <RadioButtonGroup
                                            id=''
                                            labelPosition="right"
                                            defaultSelected="true"
                                            legend="Group Legend"
                                            name="show"
                                            valueSelected="all"
                                            orientation='vertical'
                                        >
                                            <RadioButton
                                                id="all"
                                                labelText="All"
                                                value="all"
                                            />
                                            <RadioButton
                                                id="installed"
                                                labelText="Installed"
                                                value="installed"
                                            />
                                        </RadioButtonGroup>
                                    </FormGroup>
                                    {catalog.type !== '' && catalog.type !== null && catalog.type !== undefined &&
                                        <fieldset className="bx--fieldset">
                                            {/* Category_label Checkboxes */}
                                            <legend className="bx--label">Types</legend>
                                            <Checkbox labelText={`${catalog.type}`} />
                                        </fieldset>
                                    }
                                    {catalog.type === "Dataset" && catalog.tag !== null && catalog.tag !== '' &&
                                        <fieldset className="bx--fieldset">
                                            {/* Category_label Checkboxes */}
                                            <legend className="bx--label">Tags</legend>
                                            <Checkbox labelText={`${catalog.tag} `} />
                                        </fieldset>
                                    }
                                    {   catalog.type === "Notebook" && catalog.selectedNotebookCategories.length > 0 &&
                                        <fieldset className="bx--fieldset">
                                            {/* Categories Checkboxes */}
                                            <legend className="bx--label">Categories</legend>
                                            {
                                                catalog.selectedNotebookCategories !== null | undefined ?
                                                catalog.selectedNotebookCategories.map((category, index) => {
                                                        let text = category.label.charAt(0).toUpperCase() + category.label.slice(1);
                                                        return <Checkbox key={index} labelText={`${text}`}/>
                                                    }) : null
                                            }
                                        </fieldset>
                                    }
                                    {   catalog.type === "API" && catalog.selectedApiCategories.length > 0 &&
                                        <fieldset className="bx--fieldset">
                                            {/* Categories Checkboxes */}
                                            <legend className="bx--label">Categories</legend>
                                            {
                                                catalog.selectedApiCategories !== null | undefined ?
                                                catalog.selectedApiCategories.map((category, index) => {
                                                        let text = category.label.charAt(0).toUpperCase() + category.label.slice(1);
                                                        return <Checkbox key={index} labelText={`${text}`}/>
                                                    }) : null
                                            }
                                        </fieldset>
                                    }
                                    {   catalog.type === "Operators" && catalog.selectedOperatorCategories.length > 0 &&
                                        <fieldset className="bx--fieldset">
                                            {/* Categories Checkboxes */}
                                            <legend className="bx--label">Categories</legend>
                                            {
                                                catalog.selectedOperatorCategories !== null | undefined ?
                                                catalog.selectedOperatorCategories.map((category, index) => {
                                                        let text = category.label.charAt(0).toUpperCase() + category.label.slice(1);
                                                        return <Checkbox key={index} labelText={`${text}`}/>
                                                    }) : null
                                            }
                                        </fieldset>
                                    }
                                    {   catalog.type === "Course" && catalog.selectedCourseCategories.length > 0 &&
                                        <fieldset className="bx--fieldset">
                                            {/* Categories Checkboxes */}
                                            <legend className="bx--label">Categories</legend>
                                            {
                                                catalog.selectedCourseCategories !== null | undefined ?
                                                catalog.selectedCourseCategories.map((category, index) => {
                                                        let text = category.label.charAt(0).toUpperCase() + category.label.slice(1);
                                                        return <Checkbox key={index} labelText={`${text}`}/>
                                                    }) : null
                                            }
                                        </fieldset>
                                    }
                                    {   catalog.type === "Dataset" && catalog.selectedDatasetCategories.length > 0 &&
                                        <fieldset className="bx--fieldset">
                                            {/* Categories Checkboxes */}
                                            <legend className="bx--label">Categories</legend>
                                            {
                                                catalog.selectedDatasetCategories !== null | undefined ?
                                                catalog.selectedDatasetCategories.map((category, index) => {
                                                        let text = category.label.charAt(0).toUpperCase() + category.label.slice(1);
                                                        return <Checkbox key={index} labelText={`${text}`}/>
                                                    }) : null
                                            }
                                        </fieldset>
                                    }
                                </div>
                                <div className='prebuild-stack-content bx--col-max-14 bx--col-xlg-13 bx--col-lg-13 bx--col-md-6 bx--col-sm-3'>
                                    <div className="prebuilt-stack-header">
                                        <div className="prebuilt-stack-search-box">
                                            <Search className='SearchBox bx--col-lg-4 bx--col-md-4' placeHolderText='Search catalog' labelText='' style={{ marginBottom: 20 }} />
                                        </div>
                                        <span id='try_stack_panel'>
                                            <div className="tryStack__container" >
                                                <div>
                                                    <a target="_blank">Contribute</a>
                                                </div>
                                                <div className="tryStack__image">
                                                    <OverflowMenu flipped={true}>
                                                        <OverflowMenuItem itemText="Try your contribution" />
                                                    </OverflowMenu>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='prebuild-stack-cards bx--row'>
                                        <div></div>
                                        <div className={'marketing-catalog-tile-component bx--col-max-3 bx--col-xlg-4 bx--col-lg-4 bx--col-md-4 bx--col-sm-4'}>

                                            <ClickableTile>
                                                {/* Icon */}
                                                <div className="tile-icon">
                                                    {catalog.selectedImgPreview ?
                                                        catalog.selectedImgPreview !== undefined && <img src={catalog.selectedImgPreview} />
                                                        :
                                                        <img height="" src={logoImage} />
                                                    }
                                                    {/* <img height="" src={URL.createObjectURL(catalog.selectedLogo)} alt="" /> */}
                                                </div>
                                                {/* Title  */}
                                                <div className="tile-section">
                                                    <h4 title={catalog.title} id={catalog.title + 'title'}>{catalog.title}</h4>
                                                </div>
                                                <div className="tile-description">
                                                    <ul id={catalog.title}>
                                                        {catalog.type !== '' && catalog.type !== undefined &&
                                                            <li >
                                                                <span>Type:</span>
                                                                <span>{catalog.type}</span>
                                                            </li>
                                                        }
                                                        {catalog.type === "Notebook" && catalog.selectedNotebookCategories.length > 0 &&
                                                            // <li className={(catalog.selectedNotebookCategories.length > 1) ? 'fade-effect' : ''}>
                                                            <li>
                                                                <span>Categories:</span>
                                                                <span>{catalog.selectedNotebookCategories !== undefined && catalog.selectedNotebookCategories !== null && catalog.selectedNotebookCategories.length > 0 ? catalog.selectedNotebookCategories[0].label : '-'}</span>
                                                                {catalog.selectedNotebookCategories.length > 1 ? (
                                                                    [<span>,</span>,
                                                                    <span className='number'>
                                                                        <TooltipDefinition
                                                                            tooltipText={catalog.selectedNotebookCategories.map(function (element) {
                                                                                return element.label;
                                                                            }).join(', ')}
                                                                        >
                                                                            +
                                                                                {catalog.selectedNotebookCategories.length - 1}
                                                                        </TooltipDefinition>
                                                                    </span>]
                                                                ) : (
                                                                        null
                                                                    )}
                                                            </li>
                                                        }
                                                        {catalog.type === "Dataset" && catalog.selectedDatasetCategories.length > 0 &&
                                                            // <li className={(catalog.selectedDatasetCategories.length > 1) ? 'fade-effect' : ''}>
                                                            <li>
                                                                <span>Categories:</span>
                                                                <span>{catalog.selectedDatasetCategories !== undefined && catalog.selectedDatasetCategories !== null && catalog.selectedDatasetCategories.length > 0 ? catalog.selectedDatasetCategories[0].label : '-'}</span>
                                                                {catalog.selectedDatasetCategories.length > 1 ? (
                                                                    [<span>,</span>,
                                                                    <span className='number'>
                                                                        <TooltipDefinition align='center'
                                                                            tooltipText={catalog.selectedDatasetCategories.map(function (element) {
                                                                                return element.label;
                                                                            }).join(', ')}
                                                                        >
                                                                            +
                                                                                {catalog.selectedDatasetCategories.length - 1}
                                                                        </TooltipDefinition>
                                                                    </span>]
                                                                ) : (
                                                                        null
                                                                    )}
                                                            </li>
                                                        }
                                                        {catalog.type === "API" && catalog.selectedApiCategories.length > 0 &&
                                                            // <li className={(catalog.selectedApiCategories.length > 1) ? 'fade-effect' : ''}>
                                                            <li>
                                                                <span>Categories:</span>
                                                                <span>{catalog.selectedApiCategories !== undefined && catalog.selectedApiCategories !== null && catalog.selectedApiCategories.length > 0 ? catalog.selectedApiCategories[0].label : '-'}</span>
                                                                {catalog.selectedApiCategories.length > 1 ? (
                                                                    [<span>,</span>,
                                                                    <span className='number'>
                                                                        <TooltipDefinition align='center'
                                                                            tooltipText={catalog.selectedApiCategories.map(function (element) {
                                                                                return element.label;
                                                                            }).join(', ')}
                                                                        >
                                                                            +
                                                                                {catalog.selectedApiCategories.length - 1}
                                                                        </TooltipDefinition>
                                                                    </span>]
                                                                ) : (
                                                                        null
                                                                    )}
                                                            </li>
                                                        }
                                                        {catalog.type === "Operators" && catalog.selectedOperatorCategories.length > 0 &&
                                                            // <li className={(catalog.selectedOperatorCategories.length > 1) ? 'fade-effect' : ''}>
                                                            <li>
                                                                <span>Categories:</span>
                                                                <span>{catalog.selectedOperatorCategories !== undefined && catalog.selectedOperatorCategories !== null && catalog.selectedOperatorCategories.length > 0 ? catalog.selectedOperatorCategories[0].label : '-'}</span>
                                                                {catalog.selectedOperatorCategories.length > 1 ? (
                                                                    [<span>,</span>,
                                                                    <span className='number'>
                                                                        <TooltipDefinition align='center'
                                                                            tooltipText={catalog.selectedOperatorCategories.map(function (element) {
                                                                                return element.label;
                                                                            }).join(', ')}
                                                                        >
                                                                            +
                                                                                {catalog.selectedOperatorCategories.length - 1}
                                                                        </TooltipDefinition>
                                                                    </span>]
                                                                ) : (
                                                                        null
                                                                    )}
                                                            </li>
                                                        }
                                                        {catalog.type === "Course" && catalog.selectedCourseCategories.length > 0 &&
                                                            // <li className={(catalog.selectedCourseCategories.length > 1) ? 'fade-effect' : ''}>
                                                            <li>
                                                                <span>Categories:</span>
                                                                <span>{catalog.selectedCourseCategories !== undefined && catalog.selectedCourseCategories !== null && catalog.selectedCourseCategories.length > 0 ? catalog.selectedCourseCategories[0].label : '-'}</span>
                                                                {catalog.selectedCourseCategories.length > 1 ? (
                                                                    [<span>,</span>,
                                                                    <span className='number'>
                                                                        <TooltipDefinition align='center'
                                                                            tooltipText={catalog.selectedCourseCategories.map(function (element) {
                                                                                return element.label;
                                                                            }).join(', ')}
                                                                        >
                                                                            +
                                                                                {catalog.selectedCourseCategories.length - 1}
                                                                        </TooltipDefinition>
                                                                    </span>]
                                                                ) : (
                                                                        null
                                                                    )}
                                                            </li>
                                                        }
                                                        {catalog.type === "Dataset" && catalog.tag !== null && catalog.tag !== '' &&
                                                            <li>
                                                                <span>
                                                                    {
                                                                        catalog.tag !== undefined && catalog.tag !== null ?
                                                                            <Tag type="purple" title={catalog.tag}> {catalog.tag} </Tag>
                                                                            : ''
                                                                    }
                                                                </span>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>

                                                {/* footer  */}
                                                <div className="tile-footer">
                                                    <div className='install-time'>
                                                        <span>Install time:</span>
                                                        <span>{"2 " + ' Minutes'} </span>

                                                    </div>
                                                    <ArrowRight16 />
                                                </div>
                                            </ClickableTile>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* </div> */}
                        </div>
                    </div >
                </div>
            </div>
        </Layout>
    )
}

export default Preview;