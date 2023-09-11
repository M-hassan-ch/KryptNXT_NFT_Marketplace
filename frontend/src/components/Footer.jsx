import React, { useContext } from 'react'
import style from "../stylesheets/footer.module.css";
import logo from './icons/logo.png';
import { Link, useNavigate } from 'react-router-dom'
import Context from "../context/contractContext";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Footer(props) {
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

            <footer style={{ background: props.background ? props.background : 'hsl(300, 69%, 8%)' }}>
                <div className={`container py-md-4`}>
                    <div className={`row justify-content-around`}>

                        <div className={`col-md-3 ${style.yellowBorder}`}>
                            <div className={`${style.redBorder}`}>
                                <img src={logo} alt="" className={`${style.imgLogo} ${style.redBorder}`} />
                            </div>

                            <div className={`${style.redBorder} ${style.footerDsc}`}>
                                <p>The world’s first and largest digital marketplace for crypto collectibles. Buy, sell, and discover exclusive digital items.</p>
                            </div>
                        </div>

                        <div className={`col-md-7 ${style.yellowBorder} mt-md-4`}>
                            <div className={`row ${style.redBorder}`}>
                                <div className={`col-md-3 ms-md-5 ${style.yellowBorder}`}>
                                    <h6 className={`${style.footerHeading}`}>My Account</h6>
                                    <ul className={`${style.bullets}`}>
                                        <li className={`${style.footerItem}`}> <a onClick={() => navigateTo("/profile")}>Profile</a></li>
                                        <li className={`${style.footerItem}`}> <a onClick={() => navigateTo(`/
                                        ${context.account.address}/settings`)}>Settings </a></li>
                                        <li className={`${style.footerItem}`}> <a onClick={() => navigateTo("/profile")}>My Collections</a></li>
                                        <li className={`${style.footerItem}`}> <a onClick={() => navigateTo("/explore/nfts")}>Explore Marketplace</a></li>
                                    </ul>
                                </div>

                                <div className={`col-md-3 ${style.yellowBorder}`}>
                                    <h6 className={`${style.footerHeading}`}>Company</h6>
                                    <ul className={`${style.bullets}`}>
                                        <li className={`${style.footerItem}`}> <a href="/">About</a></li>
                                        <li className={`${style.footerItem}`}> <a href="/">Career </a></li>
                                        <li className={`${style.footerItem}`}> <a href="/">Activity</a></li>
                                    </ul>
                                </div>

                                <div className={`col-md-3 p-0 m-0 ${style.yellowBorder}`}>
                                    <h6 className={`${style.footerHeading}`}>Resources</h6>
                                    <ul className={`${style.bullets}`}>
                                        <li className={`${style.footerItem}`}> <a href="/">Learn</a></li>
                                        <li className={`${style.footerItem}`}> <a href="/">Help Center</a></li>
                                        <li className={`${style.footerItem}`}> <a href="/">My Blog</a></li>
                                        <li className={`${style.footerItem}`}> <a href="/">Explore Docs</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
