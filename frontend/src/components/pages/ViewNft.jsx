import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/viewNft.module.css'
import nft1 from '../icons/nft1.png'
import accIcon from '../icons/accIcon.png'
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

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

    const params = useParams();
    console.log(params.id);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Navbar background={'#040404'} />

            <section className={`py-md-5 ${style.viewNftPage}`}>
                <div className={`container py-md-3 ${style.redBorder}`}>
                    <div className={`row ${style.blueBorder} justify-content-`}>
                        <div className={`p-0 ms-md-5 col-md-5 ${style.yellowBorder}`}>
                            <img src={nft1} alt="nft" className={`${style.nftImg}`} />
                        </div>

                        <div className={`col-md-6 ms-md-3 ps-md-5 ${style.yellowBorder}`}>
                            
                            <div className='row'>
                                <div className='col-12'>
                                    <Typography variant="h1" component="h1" style={{ fontSize: '50px', fontWeight: 'bold' }}>
                                        Street Machine <FavoriteBorderOutlinedIcon fontSize='95px' />
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
                                                0x7E14a......09e4
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className={`col-md-7 mt-md-4 ms-md-3 ${style.yellowBorder}`}>

                                    <div className={`row py-md-3 px-md-3 justify-content-between`} style={{ background: 'rgba(142, 142, 142, 0.12)', borderRadius: '25px' }}>

                                        <div className={`col-md-4 ${style.redBorder}`}>
                                            <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Price </p>

                                            <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {props.price ? props.price : '0.149'} </p>

                                            <p className={`m-0 ${style.greyColor}`} style={{ color: '#777373', fontWeight: 'bold', fontSize: '10px' }}> MATIC </p>
                                        </div>

                                        <div className={`col-md-4 ${style.redBorder}`}>
                                            <p className={`m-0 ${style.greyColor}`} style={{ color: '#ADADAD', fontWeight: 'bold', fontSize: '18px' }}> Copies </p>

                                            <p className={`m-0 ${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '22px', letterSpacing: '1px' }}> {props.price ? props.price : '27'} </p>
                                        </div>

                                    </div>

                                </div>

                                <div className={`col-md-7 p-0 mt-md-4 ms-md-3  ${style.yellowBorder}`}>

                                    <button className={`btn px-md-5 py-md-2 ${style.btnBuy}`}>Buy Item</button>

                                </div>
                            </div>

                        </div>

                        <div className={`p-3 ms-md-5 mt-md-4 col-md-5 ${style.yellowBorder}`} style={{ border: '1px solid #808080', borderRadius: '27px' , background: 'rgba(15, 7, 21, 0.28)'}}>
                            <Box sx={{ width: '100%', bgcolor: 'rgba(15, 7, 21, 0.28)'}}>
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
                                        Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact Lorem ipsum dolor sit amet,  dlkss consetetur  Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact Lorem ipsum dolor sit amet,  dlkss consetetur  Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact Lorem ipsum dolor sit amet,  dlkss consetetur  Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact Lorem ipsum dolor sit amet,  dlkss consetetur
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
