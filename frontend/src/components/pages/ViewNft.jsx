import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/viewNft.module.css'
import nft1 from '../icons/nft1.png'
import accIcon from '../icons/accIcon.png'
import { useParams } from "react-router-dom";
import { Typography, Icon } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function ViewNft(props) {
    const params = useParams();
    console.log(params.id);

    return (
        <>
            <Navbar background={'#040404'} />

            <section className={`py-md-5 ${style.viewNftPage}`}>
                <div className={`container py-md-3 ${style.redBorder}`}>
                    <div className={`row ${style.blueBorder} justify-content-between`}>
                        <div className={`p-0 m-0 col-md-5 ${style.yellowBorder}`}>
                            <img src={nft1} alt="nft image" className={`${style.nftImg}`} />
                        </div>

                        <div className={`col-md-7 ps-md-5 ${style.yellowBorder}`}>
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

                                <div className={`col-md-7 mt-md-3 ms-md-3 ${style.yellowBorder}`}>
                                    <div className={`row align-items-center py-md-3 `} style={{ background: 'rgba(142, 142, 142, 0.12)', border: '1px solid #808080', borderRadius: '25px' }}>

                                        <div className={`col-md-3 ${style.redBorder}`}>
                                            <p className={`${style.greyColor}`}> Price </p>
                                            <p className={`${style.textOverflow}`}> {props.price ? props.price : '1234'} </p>
                                        </div>

                                        <div className={`col-md-3 ${style.redBorder}`}>
                                            <p className={`${style.greyColor}`}> Copies </p>
                                            <p className={`${style.textOverflow}`}> {props.price ? props.price : '1234'} </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* <div className='mt-md-3'>
                                <h1 style={{fontSize: '50px', fontWeight:'bold'}}>Street Machine</h1>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>

            <Footer background={'#040404'} />
        </>
    )
}
