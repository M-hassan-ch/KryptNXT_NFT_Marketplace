import React from 'react'
import style from "../stylesheets/navbar.module.css";
import logo from './icons/logo.png';

export default function Navbar() {
  return (
    <>
      <header className={`container-fluid py-md-2 ${style.header}`}>
        <div className={`row justify-content-between align-items-center`}>
          <div className={`col-md-2 ${style.yellowBorder} m-0 p-0 mx-auto ps-md-5`}>
            <img src={logo} alt="" className={` ${style.imgLogo} ${style.redBorder}`} />
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
                    <li><a href="/">EXPLORE</a></li>
                    <li><a href="/">CREATE</a></li>
                    <li><a href="/">MY NFTs</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className={`col-md-2 ${style.yellowBorder} mx-auto`}>
            <button className={`btn ${style.btnLogin}`}>Login</button>
          </div>
        </div>
        
      </header>
    </>
  )
}
