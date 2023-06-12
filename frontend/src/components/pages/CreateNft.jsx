import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/createNft.module.css'
import polygonIcon from '../icons/polygonIcon.png'

export default function CreateNft() {
    return (
        <>
            <Navbar></Navbar>

            <section>
                <div className={`container ${style.yellowBorder}`}>
                    <div className={`row ${style.formBackground} py-5`}>
                        <div className={`col-12 mt-md-4 ${style.redBorder}`} style={{ fontSize: "57px", fontWeight: 'bold' }}>
                            <h1>Create New NFT</h1>
                        </div>

                        <div className={`col-12 `}>
                            <div className={`row justify-content-between`}>
                                <div className={`col-md-5 ${style.blueBorder}`}>

                                    <div className={`row ${style.redBorder}`}>
                                        <div className={`col-12 ${style.yellowBorder}`}>
                                            <h5 style={{ fontWeight: 'bold' }}> Choose Account</h5>
                                        </div>

                                        <div className={`col-12 ${style.blueBorder}`}>
                                            <div className={`row align-items-center`}>
                                                <div className={`col-md-1 p-0 ms-md-4 ${style.redBorder}`}>
                                                    <img src={polygonIcon} alt="" srcset="" style={{ height: '45px', width: '100%' }} />
                                                </div>

                                                <div className={`col-md-3 ms-md-3 pt-md-2 ${style.redBorder}`}>
                                                    <p style={{ fontWeight: 'bold' }}>
                                                        0x7E14a......09e4 <br />
                                                        <span style={{ fontSize: '12px' }} className={`${style.greyColor}`}>Polygon</span>
                                                    </p>
                                                </div>

                                                <div className={`col-md-3 pt-md-2 ms-md-auto ${style.redBorder}`}>
                                                    <p style={{ fontWeight: 'bold' }} className={`${style.colorGreen}`}>Connected</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                                <div className={`col-md-5 ${style.yellowBorder}`}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    )
}
