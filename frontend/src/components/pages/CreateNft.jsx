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
                    <div className={`row ${style.formBackground} py-5 px-md-5`}>
                        <div className={`col-12 mt-md-4 ${style.redBorder}`} style={{ fontSize: "57px", fontWeight: 'bold' }}>
                            <h1>Create New NFT</h1>
                        </div>

                        <div className={`col-12`}>
                            <div className={`row justify-content-between`}>
                                <div className={`col-md-5 ${style.blueBorder}`}>

                                    <div className={`row ${style.redBorder}`}>
                                        <div className={`col-12 mt-md-5 mb-md-2 ${style.yellowBorder}`}>
                                            <p style={{ fontWeight: 'bold', fontSize:'26px', letterSpacing:'1px' }}> Choose Account</p>
                                        </div>

                                        <div className={`col-12 ${style.blueBorder}`}>
                                            <div className={`row align-items-center py-md-3 `} style = {{background: 'rgba(39, 3, 39, 0.67)', border:'1px solid #808080', borderRadius: '42px'}}>
                                                <div className={`col-md-2 p-0 ms-md-4 ${style.redBorder}`}>
                                                    <img className={`ms-3 ${style.blueBorder}`}  src={polygonIcon} alt="" srcset="" style={{ height: '55px', width: '55px' }} />
                                                </div>

                                                <div className={`col-md-5 ms-md-3 pt-md-2 ${style.redBorder}`}>
                                                    <p className={`mb-1 ${style.blueBorder}`} style={{fontSize:'20px', letterSpacing:'1px'}}>
                                                        0x7E14a......09e4 
                                                    </p>

                                                    <p  style={{ fontSize: '12px', fontWeight: 'bold'  }} className={`mt-0 ${style.greyColor} ${style.blueBorder}`}>Polygon</p>
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
