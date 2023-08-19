import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/viewNft.module.css'
import nft1 from '../icons/nft1.png'
import accIcon from '../icons/accIcon.png'
import { useParams, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import formatAddr from '../../utility/shortenAddress'
import Context from "../../context/contractContext";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

export default function ViewNft(props) {
    const { state } = useLocation();
    const context = useContext(Context);
    const [LockedBalance, setLockedBalance] = useState(NaN);
    const [BuyerView, setBuyerView] = useState(false);
    const params = useParams();
    let refresh = true;

    const [value, setValue] = React.useState(0);

    const [IsLoading, setIsLoading] = useState(false);
    const [OpenSuccessMsg, setOpenSuccessMsg] = useState(false);

    const [FormValidationError, setFormValidationError] = useState({ open: false, msg: '' });
    const [barState, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = barState;

    const handleClose = (event, reason) => {
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

    const listNft = async () => {
        try {
            const _copies = document.getElementById("copies").value;
            const _price = document.getElementById("price").value;
            // console.log(parseInt(copies), price);
            if (Number(_copies) <= 0) {
                setFormValidationError({ open: true, msg: "Invalid number of copies" });
            } else if (Number(_price) <= 0) {
                setFormValidationError({ open: true, msg: "Invalid price" });
            }
            else if (state.props.copies - LockedBalance < _copies) {
                setFormValidationError({ open: true, msg: "Insufficient owned copies" });
            }
            else {
                setIsLoading(true);
                
                let obj =  {
                    seller : state.props.owner,
                    tokenId: state.props.tokenId,
                    copies: _copies,
                    price: _price,
                    buyer: '',
                }
                const receipt = await context.contractFunction.list(obj);
                const txReceipt = await context.Provider.provider.waitForTransaction(receipt?.hash);

                if (txReceipt) {
                    setIsLoading(false);
                    setOpenSuccessMsg(true);
                    refresh = true;
                }
            }
        } catch (error) {
            console.log("Error while calling listNft()");
            console.log(error);
            setFormValidationError({ open: true, msg: "Something went wrong" });
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const getLockedBalance = async () => {
            console.log('loading locked balance......');
            const balance = await context.contractFunction.getLocked(context.account.address, state.props.tokenId);
            if (Number(balance) >= 0) {
                setLockedBalance(balance);
                console.log('ocked balance updated');
            }
        }
        getLockedBalance();
    }, [refresh])

    return (
        <>

            <Snackbar open={FormValidationError.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                    {`${FormValidationError.msg}!`}
                </Alert>
            </Snackbar>

            <Snackbar open={OpenSuccessMsg} autoHideDuration={2000} onClose={handleSuccessMsgClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                    NFT listed successfully!
                </Alert>
            </Snackbar>

            <Navbar background={'#040404'} />

            <section className={`py-md-5 ${style.viewNftPage}`}>
                <div className={`container py-md-3 ${style.redBorder}`}>
                    <div className={`row ${style.blueBorder} justify-content-`}>
                        <div className={`p-0 ms-md-5 col-md-5 ${style.yellowBorder}`}>
                            <img src={state.props.img} alt="nft" className={`${style.nftImg}`} />
                        </div>

                        <div className={`col-md-6 ms-md-3 ps-md-5 ${style.yellowBorder}`}>
                            <div className='row'>
                                <div className='col-12'>
                                    <Typography variant="h1" component="h1" style={{ fontSize: '50px', fontWeight: 'bold' }}>
                                        {state.props.title} <FavoriteBorderOutlinedIcon fontSize='95px' />
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
                                                {formatAddr(state.props.owner)}
                                                {/* 0x7E14a......09e4 */}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className={`col-md-7 mt-md-4 ms-md-3 ${style.yellowBorder}`}>

                                    <div className={`row py-md-3 px-md-3 justify-content-between`} style={{ background: 'rgba(142, 142, 142, 0.12)', borderRadius: '25px' }}>

                                        <div className={`col-md-4 ${style.redBorder}`}>
                                            {
                                                BuyerView ?
                                                    <>
                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Price </p>

                                                        <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {props.price ? props.price : '0.149'} </p>

                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#777373', fontWeight: 'bold', fontSize: '10px' }}> MATIC </p>
                                                    </>
                                                    :

                                                    <>
                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Locked </p>

                                                        <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {LockedBalance} </p>

                                                        <p className={`m-0 ${style.greyColor}`} style={{ color: '#777373', fontWeight: 'bold', fontSize: '10px' }}> COPIES </p>
                                                    </>

                                            }
                                        </div>

                                        <div className={`col-md-4 ${style.redBorder}`}>
                                            <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Copies </p>

                                            <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {state.props.copies ? state.props.copies : 'NIL'} </p>
                                        </div>


                                    </div>

                                    {
                                        !BuyerView &&

                                        <div className={`row mt-md-4 justify-content-between`} style={{ background: 'transparent', borderRadius: '20px' }}>

                                            <div className={`col-5 p-0 ${style.redBorder}`}>

                                                <input type="number" className={` w-100 px-3 ${style.inputField}`} placeholder="Copies to list" id='copies' min={0} style={{ height: '100%' }}
                                                />

                                            </div>

                                            <div className={`col-6 p-0 ${style.redBorder}`}>

                                                <OutlinedInput
                                                    id="price"
                                                    type='number'
                                                    endAdornment={<InputAdornment position="end" className={`${style.greyColor}`} >MATIC</InputAdornment>}
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                        min: 0,
                                                    }}
                                                    placeholder={'Price'}
                                                    sx={{ color: 'white', borderRadius: '12px' }}
                                                    className={` py-1 w-100 px-3 ${style.inputField}`}

                                                />

                                            </div>

                                        </div>
                                    }

                                </div>

                                <div className={`col-md-7 p-0 mt-md-4 ms-md-3  ${style.yellowBorder}`}>
                                    {
                                        BuyerView ?
                                            <button className={`btn px-md-5 py-md-2 ${style.btnBuy}`}>Buy Item</button>
                                            :
                                            <button className={`btn px-md-5 py-md-2 ${style.btnBuy}`} onClick={listNft}>
                                                {
                                                    IsLoading ?
                                                        <CircularProgress color="secondary" />
                                                        :
                                                        'List Item'
                                                }
                                            </button>
                                    }

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
                                                state.props.desc :
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
    )
}
