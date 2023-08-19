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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getLockedBalance = async () => {
            const balance = await context.contractFunction.getLocked(context.account.address, state.props.tokenId);
            if (Number(balance) >= 0) {
                setLockedBalance(balance);
            }
        }
        getLockedBalance();
    }, [])

    return (
        <>
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
                                                    id="outlined-adornment-weight"
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
                                            <button className={`btn px-md-5 py-md-2 ${style.btnBuy}`}>List Item</button>
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
                                            value == 0? 
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
