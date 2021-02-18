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
import img from './../../../../assets/images/Data-Explorer.png'
import KubernetesImg from './../../../../assets/images/KP_logo.png'


const HeaderComponent = ({
  headerTitle,
  loggedInEmail,
  tileData
}) => {

  return (
    <Header className={headStyles.operatorpgHeader} aria-label="Contribution">
      {/* <div className={headStyles.headerLogo}>
        <svg
          viewBox="0 0 190.35 144"
          width="52"
          height="52">
          <path d="M126.97 83c12.5 0 30.6-2.6 30.6-17.47a14 14 0 00-.3-3.42l-7.45-32.35c-1.72-7.12-3.23-10.35-15.73-16.6C124.4 8.2 103.25 0 97 0c-5.8 0-7.5 7.5-14.44 7.5-6.68 0-11.64-5.6-17.9-5.6-6 0-9.9 4.1-12.92 12.5 0 0-8.4 23.72-9.5 27.16a6.43 6.43 0 00-.2 1.94c0 9.22 36.3 39.45 84.93 39.45m32.53-11.38c1.73 8.2 1.73 9.05 1.73 10.13 0 14-15.74 21.77-36.43 21.77C78.04 103.5 37.08 76.1 37.08 58a18.45 18.45 0 011.5-7.34C21.8 51.5 0 54.5 0 73.72 0 105.2 74.6 144 133.65 144c45.28 0 56.7-20.48 56.7-36.65 0-12.72-11-27.16-30.83-35.78" fill="#e00" />
          <path d="M159.5 71.57c1.73 8.2 1.73 9.05 1.73 10.13 0 14-15.74 21.77-36.43 21.77C78.04 103.5 37.08 76.1 37.08 58a18.45 18.45 0 011.5-7.34l3.67-9.06a6.43 6.43 0 00-.22 1.9c0 9.22 36.3 39.45 84.94 39.45 12.5 0 30.6-2.58 30.6-17.46a14 14 0 00-.3-3.43z" />
        </svg>
      </div> */}
      <div className={headStyles.headerLogo}>
        {(tileData.type === "Dataset" || tileData.type === "Notebook") ?
          <img src={img} style={{ width: '40px', height: '40px', marginTop: '0.5rem' }} /> : 
          <img src={KubernetesImg} style={{ width: '40px', height: '40px', marginTop: '0.5rem' }} />
        }
        {/* <svg 
        viewBox="0 0 140 140"
        width="52"
        height="52">
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="13.831" y1="35.316" x2="125.204" y2="104.321">
            <stop offset="0" stop-color="#0b8abc"/>
            <stop offset=".182" stop-color="#0a83b4"/>
            <stop offset=".465" stop-color="#086f9e"/>
            <stop offset=".811" stop-color="#044e7a"/>
            <stop offset="1" stop-color="#023a64"/>
          </linearGradient>
          <circle cx="70" cy="70.1" r="65.5" fill="url(#SVGID_1_)"/>
          <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="83.6" y1="38.916" x2="111.491" y2="56.197">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".164" stop-color="#f7f7f7"/>
            <stop offset=".419" stop-color="#e1e1e1"/>
            <stop offset=".73" stop-color="#bdbdbd"/>
            <stop offset="1" stop-color="#999"/>
          </linearGradient>
          <ellipse cx="97.5" cy="47.6" rx="19" ry="5.4" fill="url(#SVGID_2_)"/>
          <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="81.121" y1="46.115" x2="113.654" y2="66.272">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".164" stop-color="#f7f7f7"/>
            <stop offset=".419" stop-color="#e1e1e1"/>
            <stop offset=".73" stop-color="#bdbdbd"/>
            <stop offset="1" stop-color="#999"/>
          </linearGradient>
          <path d="M111.1 61.1c-.8 0-1.4-.5-1.4-1.4s.5-1.4 1.4-1.4c.8 0 1.4.5 1.4 1.4s-.6 1.4-1.4 1.4zm-13.6-5.4c-10.4 0-19-2.4-19-5.4v10.9c0 3 8.6 5.4 19 5.4s19-2.4 19-5.4V50.3c0 3-8.5 5.4-19 5.4z" fill="url(#SVGID_3_)"/>
          <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="81.121" y1="59.686" x2="113.654" y2="79.844">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".164" stop-color="#f7f7f7"/>
            <stop offset=".419" stop-color="#e1e1e1"/>
            <stop offset=".73" stop-color="#bdbdbd"/>
            <stop offset="1" stop-color="#999"/>
          </linearGradient>
          <path d="M111.1 74.7c-.8 0-1.4-.5-1.4-1.4s.5-1.4 1.4-1.4c.8 0 1.4.5 1.4 1.4s-.6 1.4-1.4 1.4zm-13.6-5.4c-10.4 0-19-2.4-19-5.4v10.9c0 3 8.6 5.4 19 5.4s19-2.4 19-5.4v-11c0 3-8.5 5.5-19 5.5z" fill="url(#SVGID_4_)"/>
          <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="81.121" y1="73.258" x2="113.654" y2="93.415">
            <stop offset="0" stop-color="#fff"/>
            <stop offset=".164" stop-color="#f7f7f7"/>
            <stop offset=".419" stop-color="#e1e1e1"/>
            <stop offset=".73" stop-color="#bdbdbd"/>
            <stop offset="1" stop-color="#999"/>
          </linearGradient>
          <path d="M111.1 88.3c-.8 0-1.4-.5-1.4-1.4s.5-1.4 1.4-1.4c.8 0 1.4.5 1.4 1.4s-.6 1.4-1.4 1.4zm-13.6-5.5c-10.4 0-19-2.4-19-5.4v10.9c0 3 8.6 5.4 19 5.4s19-2.4 19-5.4V77.4c0 3-8.5 5.4-19 5.4z" fill="url(#SVGID_5_)"/>
          <path fill="#ffa900" d="M71.1 68.8l-.9.9 4.8 4.9H61.5v1.3H75l-4.8 4.8.9.9 6.4-6.4z"/>
          <path fill="#fff" d="M67.5 67.1l.9-.9-4.8-4.9h13.5v-1.2H63.6l4.8-4.9-.9-.9-6.4 6.4z"/>
          <g id="Canvas" transform="translate(-1640 -2453)">
            <g id="Group_2_">
              <g id="Group_1_">
                <g id="g_1_">
                  <g id="path_7_">
                    <g transform="translate(1673.48 2453.69)" id="path16_fill">
                      <path id="path7_fill" fill="#ffce00" d="M1688.1 2498.6c0 .3 0 .5-.2.7s-.3.4-.5.5c-.2.1-.5.2-.7.1-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.4-.6s0-.5 0-.7c.1-.2.2-.4.4-.6.2-.2.4-.2.7-.2.2 0 .3 0 .5.1s.3.1.4.3c.1.1.2.2.3.4.2 0 .2.2.2.3z"/>
                    </g>
                  </g>
                  <g id="path_8_">
                    <g transform="translate(1643.21 2484.27)" id="path17_fill">
                      <path id="path8_fill" fill="#ffce00" d="M1680.7 2513.4c-3.4 0-6.4-1.2-7.9-3 .6 1.6 1.7 3 3.1 4 1.4 1 3.1 1.5 4.8 1.5 1.7 0 3.4-.5 4.8-1.5s2.5-2.4 3.1-4c-1.6 1.8-4.5 3-7.9 3z"/>
                    </g>
                  </g>
                  <g id="path_9_">
                    <g transform="translate(1643.21 2457.88)" id="path18_fill">
                      <path id="path9_fill_1_" fill="#ffce00" d="M1680.7 2501.7c3.4 0 6.4 1.2 7.9 3-.6-1.6-1.7-3-3.1-4-1.4-1-3.1-1.5-4.8-1.5-1.7 0-3.4.5-4.8 1.5s-2.5 2.4-3.1 4c1.5-1.8 4.4-3 7.9-3z"/>
                    </g>
                  </g>
                  <g id="path_10_">
                    <g transform="translate(1643.28 2496.09)" id="path19_fill">
                      <path id="path10_fill_1_" fill="#ffce00" d="M1676 2516.9c0 .3-.1.6-.2.9s-.4.5-.7.6c-.3.1-.6.2-.9.1-.3 0-.6-.2-.9-.4-.2-.2-.4-.5-.5-.8-.1-.3-.1-.6 0-.9.1-.3.3-.6.6-.8s.6-.3.9-.3c.2 0 .4 0 .6.1.2.1.4.2.5.3.2.1.3.3.4.5.1.3.2.5.2.7z"/>
                    </g>
                  </g>
                  <g id="path_11_">
                    <g transform="translate(1641.87 2458.43)" id="path20_fill">
                      <path id="path11_fill_1_" fill="#ffce00" d="M1673.1 2501.3c-.2 0-.4 0-.5-.1s-.3-.2-.4-.4c-.1-.2-.1-.4-.1-.5 0-.2.1-.3.2-.5s.3-.2.5-.3h.5c.2.1.3.2.4.3.1.1.2.3.2.5s-.1.5-.3.7c0 .2-.3.3-.5.3z"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="19.546" y1="66.865" x2="59.546" y2="66.865">
            <stop offset="0" stop-color="#fff200"/>
            <stop offset=".208" stop-color="#ffea00"/>
            <stop offset=".531" stop-color="#ffd400"/>
            <stop offset=".926" stop-color="#ffb000"/>
            <stop offset="1" stop-color="#ffa900"/>
          </linearGradient>
          <path d="M55 92.6H24c-1.7 0-3-1.3-3-3V44.1c0-1.7 1.3-3 3-3h31c1.7 0 3 1.3 3 3v45.4c0 1.7-1.3 3.1-3 3.1z" fill="none" stroke="url(#SVGID_6_)" stroke-width="3" stroke-miterlimit="10"/>
          <text transform="translate(23.383 87.108)" font-size="25.643" font-family="MyriadPro-Regular" fill="#ffe600">
            Nb
          </text>
        </svg> */}
      </div>
      <div className={headStyles.logoDivider}></div>
      {(tileData.type === "Dataset" || tileData.type === "Notebook") ?
      <>
        <div className={headStyles.headerTitle}>
          <HeaderName prefix="">
          Data Explorer Dashboard   
          </HeaderName>
        </div>
        <div className={headStyles.jupyterHub}>
          <img src={require('../../../../assets/images/JupyterLogo.png')} alt='jupyter hub icon' />
          <span className={headStyles.jupyterHubTitle}>Launch JupyterHub</span>
        </div>
      </> :
        <div className={headStyles.headerTitle}>
          <HeaderName prefix="">
            Kubernetes Playground.io   
          </HeaderName>
        </div>
        
      } 
    </Header>
  )
}

const mapStateToProps = state => ({
  tileData: state.createEnvDetails.tileData
})

export default connect(mapStateToProps)(HeaderComponent)
