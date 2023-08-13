import React, { useState, useContext } from "react";

import style from "../stylesheets/navbar.module.css";
import logo from './icons/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import Context from "../context/contractContext";
import formatAddress from "../utility/shortenAddress.js";


export default function Navbar(props) {

  const context = useContext(Context);
  const contractFunction = context.contractFunction;

  const navigate = useNavigate();

  const navigate_homePage = () => {
    console.log('iam clicked');
    navigate('/', {});
  }

  return (
    <>
      <header className={`container-fluid py-md-2 `} style={{ background: props.background ? props.background : 'rgba(4, 4, 4, 0.5)' }}>
        <div className={`row justify-content-between align-items-center`}>

          <div className={`col-md-2 ${style.yellowBorder} m-0 p-0 mx-auto ps-md-5`}>
            <img src={logo} alt="" onClick={navigate_homePage} className={` ${style.imgLogo} ${style.redBorder}`} />
          </div>

          <div className={`col-md-7 ${style.yellowBorder}`}>
            <div className={`row justify-content-end align-items-center`}>
              <div className={`col-md-6 ${style.blueBorder} p-0`}>
                <input type="text" className={`${style.inputSearch}`} placeholder='   Search' />
                {/* <a href="" class={`btn-block ${style.redBorder}`}>SEARCH BAR</a> */}
              </div>

              <div className={`col-md-5 ${style.blueBorder} p-0`}>
                <nav>
                  <ul>
                    <li ><Link to="/explore/nfts">Explore</Link></li>
                    <li><Link to="/createNft">Create</Link></li>
                    <li><Link to="/profile/1">MY NFTs</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className={`col-md-2 ${style.yellowBorder} mx-auto`}>
            <button className={`btn ${style.btnLogin}`} onClick={context.connectWallet}>
              {
                context.account.address ? formatAddress(context.account.address) : "Login"
              }

            </button>
          </div>
        </div>

      </header>
    </>
  )
}
