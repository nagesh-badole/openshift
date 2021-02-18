import React, { useEffect } from 'react'
import HeaderComponent from './Header/HeaderComponent'
import './Layout.scss'
import { connect } from 'react-redux'
import { SkeletonPlaceholder } from 'carbon-components-react'
import Cookies from 'js-cookie';
import { ArrowDown20 } from '@carbon/icons-react';

const Layout = (props) => {   
    return (
        <>
                <div className={`operator_playground__container`}>
                    <HeaderComponent />
                    <div className='landingPage__content'>
                    <div className="main-body">
                       
                       {props.children}
                       
                    </div>
                    </div>
                </div>
              
        </>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(Layout)