import React, { useEffect } from 'react'
import HeaderComponent from './Header/HeaderComponent'
import './Layout.scss'
import { connect } from 'react-redux'
import store from '../../store/store'
import { setloggedIn, setLoggedInUserInfo } from '../../store/actions/createEnvActions'
import { SkeletonPlaceholder } from 'carbon-components-react'
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { ArrowDown20 } from '@carbon/icons-react';

const Layout = (props) => {

    const loginWithIBM = () => {
        console.log ('Here')
        if(Cookies.get('edgesso')) {
          store.dispatch(setloggedIn(true))
          const userInfo = jwt(Cookies.get('edgesso'))
          store.dispatch(setLoggedInUserInfo(userInfo))
        } else {
          const url = encodeURIComponent(window.location.href);
          let redirectPathCloud = process.env.REACT_APP_CLOUDSSOURL + url;
          window.location.href = redirectPathCloud;
        }
    }

    useEffect(() => {
        // check if cookie is present and set the same in cookies
        if (window.location.hostname === 'localhost') {
            const pageURL = window.location.href;
            if (pageURL.includes('edgesso')) {
                let edgSSO = pageURL.split(`edgesso=`).pop() || '';
                edgSSO = edgSSO.split('#/')[0]
                Cookies.set('edgesso', edgSSO)
                store.dispatch(setloggedIn(true))
                const userInfo = jwt(Cookies.get('edgesso'))
                store.dispatch(setLoggedInUserInfo(userInfo))
            }
        }
    }, [])

    return (
        <>
                <div className={`operator_playground__container`}>
                    <HeaderComponent loginWithIBM={loginWithIBM} loggedIn={props.loggedIn} userInfo={props.userInfo}/>
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
    loggedIn: state.createEnvDetails.loggedIn,
    userInfo: state.createEnvDetails.userInfo
})

export default connect(mapStateToProps)(Layout)