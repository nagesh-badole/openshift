import React, { useEffect, useState } from 'react'
import headStyles from './Head.module.scss'
import './Head.common.scss'
import { connect } from 'react-redux'
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
} from 'carbon-components-react';
import {
  Link,
} from "react-router-dom";
import { User32 } from '@carbon/icons-react'
import contributionLogo from './../../../assets/images/Contribution.png';

const HeaderComponent = ({
  headerTitle,
  loggedInEmail,
  loggedIn,
  loginWithIBM,
  userInfo
}) => {

  return (
    <Header className={headStyles.operatorpgHeader} aria-label="Contribution">
      <div className={headStyles.headerLogo}>
        {/* <svg
          viewBox="0 0 190.35 144"
          width="52"
          height="52">
          <path d="M126.97 83c12.5 0 30.6-2.6 30.6-17.47a14 14 0 00-.3-3.42l-7.45-32.35c-1.72-7.12-3.23-10.35-15.73-16.6C124.4 8.2 103.25 0 97 0c-5.8 0-7.5 7.5-14.44 7.5-6.68 0-11.64-5.6-17.9-5.6-6 0-9.9 4.1-12.92 12.5 0 0-8.4 23.72-9.5 27.16a6.43 6.43 0 00-.2 1.94c0 9.22 36.3 39.45 84.93 39.45m32.53-11.38c1.73 8.2 1.73 9.05 1.73 10.13 0 14-15.74 21.77-36.43 21.77C78.04 103.5 37.08 76.1 37.08 58a18.45 18.45 0 011.5-7.34C21.8 51.5 0 54.5 0 73.72 0 105.2 74.6 144 133.65 144c45.28 0 56.7-20.48 56.7-36.65 0-12.72-11-27.16-30.83-35.78" fill="#e00" />
          <path d="M159.5 71.57c1.73 8.2 1.73 9.05 1.73 10.13 0 14-15.74 21.77-36.43 21.77C78.04 103.5 37.08 76.1 37.08 58a18.45 18.45 0 011.5-7.34l3.67-9.06a6.43 6.43 0 00-.22 1.9c0 9.22 36.3 39.45 84.94 39.45 12.5 0 30.6-2.58 30.6-17.46a14 14 0 00-.3-3.43z" />
        </svg> */}
        <img height="" src={contributionLogo} />
      </div>
      <div className={headStyles.logoDivider}></div>
      <div className={headStyles.headerTitle} style={{pointerEvents: 'none'}}>
        <HeaderName prefix="">
          <Link to={'/home'}>
         Contribution Portal
          </Link>
        </HeaderName>
      </div>
      <div className={headStyles.loginSection} onClick={loginWithIBM}>
        <User32 />
        {
          !loggedIn ?
            <span>Login</span> :
            <span>{userInfo.email}</span>
        }
      </div>
    </Header>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(HeaderComponent)
