import React, { useState, useContext } from "react";

import style from "../stylesheets/navbar.module.css";
import logo from './icons/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import Context from "../context/contractContext";
import formatAddress from "../utility/shortenAddress.js";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Navbar(props) {

  const context = useContext(Context);
  const contractFunction = context.contractFunction;

  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  const navigate_homePage = () => {
    navigate('/', {});
  }

  const navigateTo = (endPoint) => {
    if (context.account.address) {
      navigate(`${endPoint}`, {});
    }
    else {
      setOpen(true);
    }
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          Please connect your wallet first!
        </Alert>
      </Snackbar>

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

              <div className={`col-md-5 ${style.blueBorder} p-0 ms-3`}>
                <nav>
                  <ul>

                    {/* <li ><Link to = {() => navigateTo("/explore")}>Explore</Link></li> */}
                    <li style={{cursor:'pointer'}}><a onClick={() => navigateTo("/explore/nfts")}>Explore</a></li>
                    <li style={{cursor:'pointer'}}><a onClick={() => navigateTo("/createNft")}>Create</a></li>
                    <li style={{cursor:'pointer'}}><a onClick={() => navigateTo("/profile")}>MY NFTs</a></li>

                    {/* <li ><Link to="/explore/nfts">Explore</Link></li> */}
                    {/* <li><a to="/createNft">Create</a></li> */}
                    {/* <li><a to="/profile/1">MY NFTs</a></li> */}
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
