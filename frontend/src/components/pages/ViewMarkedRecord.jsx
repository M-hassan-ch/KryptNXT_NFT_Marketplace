import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/viewMarkedRecord.module.css'
import accIcon from '../icons/accIcon.png'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import formatAddr from '../../utility/shortenAddress'
import Context from "../../context/contractContext";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Backdrop from '@mui/material/Backdrop';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ethers } from 'ethers'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function ViewMarkedRecord() {

    const context = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);

    const [Record, setRecord] = useState(null);
    const [IsRecordLoading, setIsRecordLoading] = useState(true);
    const [IsInProgress, setIsInProgress] = useState(false);
    const [OpenSuccessMsg, setOpenSuccessMsg] = useState(false);
    const [FormValidationError, setFormValidationError] = useState({ open: false, msg: '' });
    const [BackDropOpen, setBackDropOpen] = React.useState(true);

    const [barState, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = barState;

    const handleFormValidationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFormValidationError({ open: false, msg: "" });
    };

    const handleSuccessMsgClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessMsg(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBackDropClose = () => {
        setBackDropOpen(false);
    };
    const handleBackDropOpen = () => {
        setBackDropOpen(true);
    };

    function navigateToProfile() {
        navigate(`/profile`);
    }

    const removeFromSale = async () => {
        try {
            const accBalance = await context.Provider.provider.getBalance(context.account.address);
            // console.log(context.account.balance);
            if (context.account.address == Record.seller) {
                setFormValidationError({ open: true, msg: "Cannot buy your own item" });
            }
            else if (Number(accBalance) < Number(ethers.parseEther(`${Record.price}`))) {
                setFormValidationError({ open: true, msg: "Insufficient balance" });
            }
            else {
                setIsInProgress(true);

                // let obj = {
                //     seller: state.props.owner,
                //     tokenId: state.props.tokenId,
                //     buyer: '',
                // }
                // const receipt = await context.contractFunction.list(obj);
                // const txReceipt = await context.Provider.provider.waitForTransaction(receipt?.hash);

                // if (txReceipt) {
                //     setIsInProgress(false);
                //     setOpenSuccessMsg(true);
                //     // setRefresh(true);
                // }
            }
        } catch (error) {
            console.log("Error while calling listNft()");
            console.log(error);
            setFormValidationError({ open: true, msg: "Something went wrong" });
            setIsInProgress(false);
        }
    }

    useEffect(() => {
        const loadRecord = async () => {
            console.log('Getting record details......');
            try {
                setBackDropOpen(true);
                setRecord(null);
                const obj = await context.contractFunction.getRecord(Number(params.id));
                if (obj) {
                    setRecord(obj);
                    setBackDropOpen(false);
                    console.log('loaded record');
                }
                else {
                    throw ("Operation failed")
                }
            } catch (error) {
                setFormValidationError({ open: true, msg: 'Something went wrong!' });
                setTimeout(() => {
                    setBackDropOpen(false);
                    setRecord(null);
                    navigateToProfile();
                }, 3000);
            }
        }
        loadRecord();
    }, [])

    return (
        <>

            <Snackbar open={FormValidationError.open} autoHideDuration={3000} onClose={handleFormValidationClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="error" onClose={handleFormValidationClose} sx={{ width: '100%' }}>
                    {`${FormValidationError.msg}!`}
                </Alert>
            </Snackbar>

            <Snackbar open={OpenSuccessMsg} autoHideDuration={2000} onClose={handleSuccessMsgClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="success" onClose={handleFormValidationClose} sx={{ width: '100%' }}>
                    Record removed successfully!
                </Alert>
            </Snackbar>

            <Navbar background={'#040404'} />

            {

                IsRecordLoading && Record === null ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={BackDropOpen}
                        onClick={handleBackDropClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <>
                        <section className={`py-md-5 ${style.viewNftPage}`}>
                            <div className={`container py-md-3 ${style.redBorder}`}>
                                <div className={`row ${style.blueBorder} justify-content-`}>
                                    <div className={`p-0 ms-md-5 col-md-5 ${style.yellowBorder}`}>
                                        <img src={`https://ipfs.io/ipfs/${Record.imgUri}`} alt="nft" className={`${style.nftImg}`} />
                                    </div>

                                    <div className={`col-md-6 ms-md-3 ps-md-5 ${style.yellowBorder}`}>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Typography variant="h1" component="h1" style={{ fontSize: '50px', fontWeight: 'bold' }}>
                                                    {Record.name} <FavoriteBorderOutlinedIcon fontSize='95px' />
                                                </Typography>
                                            </div>

                                            <div className={`col-md-7 mt-md-3 ms-md-3 ${style.yellowBorder}`}>
                                                <div className={`row align-items-center py-md-3 `} style={{ background: 'rgba(15, 7, 21, 0.67)', border: '1px solid #808080', borderRadius: '25px' }}>

                                                    <div className={`col-md-2 p-0 ms-md-4 ${style.redBorder}`}>
                                                        <img className={`ms-2 ${style.blueBorder}`} src={accIcon} alt="" style={{ height: '55px', width: '55px' }} />
                                                    </div>

                                                    <div className={`col-md-6 ms-md-3 pt-md-2 ${style.redBorder}`}>
                                                        <p style={{ fontSize: '12px', fontWeight: 'bold' }} className={`m-0 ${style.greyColor} ${style.blueBorder}`}>Current owner</p>

                                                        <p className={` ${style.blueBorder}`} style={{ fontSize: '20px', letterSpacing: '1px', fontWeight: 'bold' }}>
                                                            {formatAddr(Record.seller)}
                                                            {/* 0x7E14a......09e4 */}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className={`col-md-7 mt-md-4 ms-md-3 ${style.yellowBorder}`}>

                                                <div className={`row py-md-3 px-md-3 justify-content-between`} style={{ background: 'rgba(142, 142, 142, 0.12)', borderRadius: '25px' }}>

                                                    <div className={`col-md-4 ${style.redBorder}`}>
                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Price </p>

                                                        <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {Record.price} </p>

                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#777373', fontWeight: 'bold', fontSize: '10px' }}> MATIC </p>

                                                    </div>

                                                    <div className={`col-md-4 ${style.redBorder}`}>
                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Copies </p>

                                                        <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {Record.copies} </p>
                                                    </div>


                                                </div>

                                            </div>

                                            <div className={`col-md-7 p-0 mt-md-4 ms-md-3  ${style.yellowBorder}`}>

                                                <button className={`btn px-md-5 py-md-2 ${style.btnBuy}`} disabled={IsInProgress} onClick={removeFromSale}>
                                                    {
                                                        IsInProgress ?
                                                            <CircularProgress color="secondary" />
                                                            :
                                                            'Remove from sale'
                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-3 ms-md-5 mt-md-4 col-md-5 ${style.yellowBorder}`} style={{ border: '1px solid #808080', borderRadius: '27px', background: 'rgba(15, 7, 21, 0.28)' }}>
                                        <Box sx={{ width: '100%', bgcolor: 'rgba(15, 7, 21, 0.28)' }}>
                                            <Box sx={{ width: '100%', bgcolor: 'rgba(142, 142, 142, 0.12)', borderRadius: '15px' }}>
                                                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                                                    <Tab label="Overview" sx={{
                                                        color: '#FFFF',
                                                        bgcolor: value === 0 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                                        '&.Mui-selected': {
                                                            color: '#FFFF',
                                                        },
                                                    }} />
                                                    <Tab label="Properties" sx={{
                                                        color: '#FFFF',
                                                        bgcolor: value === 1 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                                        '&.Mui-selected': {
                                                            color: '#FFFF',
                                                        },
                                                    }} />
                                                    <Tab label="History" sx={{
                                                        color: '#FFFF',
                                                        bgcolor: value === 2 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                                        '&.Mui-selected': {
                                                            color: '#FFFF',
                                                        },
                                                    }} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
                                                <p style={{ textAlign: 'justify' }}>
                                                    {
                                                        value == 0 ?
                                                            Record.desc :
                                                            ''
                                                    }
                                                </p>
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                Item Two
                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={2}>
                                                Item Three
                                            </CustomTabPanel>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Footer background={'#040404'} />
                    </>

            }
        </>
    )
}
