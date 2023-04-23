import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/homepage.module.css'
import welcomeImg from '../icons/welcome.png'

export default function Homepage() {
    return (
        <>
            <Navbar />

            {/* Welcome section */}
            <section className={`container my-md-5`}>
                <div className={`row ${style.redBorder} justify-content-evenly align-items-centr`}>
                    <div className={`col-md-4 mt-5 pt-5 ${style.yellowBorder} `}>
                        <div>
                            <h1>
                                Explore, collect,
                                and sell <span className={`${style.gradientText} `}>NFTs</span>
                            </h1>
                        </div>

                        <div className={`py-md-3`}>
                            <h6 style={{fontSize: '20px', fontWeight: 'lighter' }}>
                                Lorem ipsum dolor sit amet,
                                cons <br />etetur sadipscing elitr, sed
                            </h6>
                        </div>

                        <div className={`m-0 p-0`}>
                            <button className={`btn px-md-5 py-md-2 ${style.btnExplore}`}>Explore</button>
                        </div>

                    </div>

                    <div className={`col-md-4 ${style.yellowBorder} `}>
                        <div>
                            <img src={welcomeImg} alt="" className={` ${style.welcomeImg} ${style.redBorder}`} />
                        </div>

                        <div className={``}>
                            <div className={`row mt-md-3 justify-content-center`}>
                                <div className={`col-md-2 me-md-1 ${style.box1} `}></div>
                                <div className={`col-md-1 me-md-1 ${style.box2} `}></div>
                                <div className={`col-md-1 me-md-1 ${style.box2} `}></div>
                                <div className={`col-md-1 ${style.box2} `}></div>
                            </div>
                            {/* <div className={`${style.box1} `}></div>
                            <div className={`${style.box2} `}></div>
                            <div className={`${style.box1} `}></div> */}
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    )
}
