import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/homepage.module.css'
import welcomeImg from '../icons/welcome.png'
import profileIcon1 from '../icons/profileIcon3.png'
import profileIcon2 from '../icons/profileIcon2.png'
import profileIcon3 from '../icons/profileIcon1.png'
import Card from '../Card'
import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'


function PriceCol(props) {
    return (
        <>
            <p style={{ fontSize: '21px', fontWeight: 'bold' }}>
                24.4
                <br />
                <span className={`${props.color}`} style={{ fontSize: '12px', lineHeight: '1px' }}>
                    +13.23%
                </span>
            </p>
        </>
    )
}

export default function Homepage() {
    return (
        <>
            <Navbar />

            {/* Welcome section */}
            <section className={`container my-md-5`}>
                <div className={`row ${style.redBorder} justify-content-evenly align-items-centr`}>

                    <div className={`col-md-4 mt-5 pt-5 ${style.yellowBorder} `}>
                        <div>
                            <h1 style={{ fontSize: '60px' }}>
                                Explore, collect,<br />
                                and sell <span className={`${style.gradientText} `}>NFTs</span>
                            </h1>
                        </div>

                        <div className={`py-md-3`}>
                            <h6 style={{ fontSize: '20px', fontWeight: 'lighter' }}>
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
                        </div>
                    </div>

                </div>
            </section>

            {/* explore section */}
            <section className={`container-fluid py-md-5 ${style.exploreSection}`}>
                <div className={`row ${style.yellowBorder} align-items-center`}>
                    <div className={`col-md-3 mx-auto ${style.redBorder} `}>
                        <div>
                            <h1>
                                Explore NFTs <br />On Our <br /> Marketplace
                            </h1>
                        </div>

                        <div className={`py-md-3`}>
                            <h6 style={{ fontSize: '20px', fontWeight: 'lighter' }}>
                                Lorem ipsum dolor sit amet,
                                cons <br />etetur sadipscing elitr, sed
                            </h6>
                        </div>

                        <div className={`m-0 p-0`}>
                            <button className={`btn px-md-5 py-md-2 ${style.btnExplorePlateform}`}>Explore Plateform</button>
                        </div>
                    </div>

                    <div className={`col-md-8 ms-3 ${style.blueBorder} `}>

                        <div className={`row ${style.redBorder} p-0 m-0`}>
                            {/* <Card></Card>
                                <Card></Card>
                                <Card></Card> */}

                            <Carousel autoPlay={false} animation={'slide'} indicators={false} swipe={true} cycleNavigation={false} navButtonsAlwaysVisible={true}>
                                <div className={`row ${style.redBorder} p-0 m-0`}>
                                    <Card colSize = {3}></Card>
                                    <Card colSize = {3}></Card>
                                    <Card colSize = {3}></Card>
                                </div>

                                <div className={`row ${style.redBorder} p-0 m-0`}>
                                    <Card colSize = {3}></Card>
                                </div>




                            </Carousel>
                        </div>

                    </div>
                </div>
            </section>

            {/*table section */}
            <section className={`container-fluid ${style.tableSection}`}>
                <div className={`row ${style.yellowBorder} justify-content-evenly`}>
                    <div className={`col-12 ${style.redBorder} my-md-5`}>
                        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '50px', letterSpacing: '2px' }}>Top Collections Today</h1>
                    </div>

                    <div className={`col-md-5 ${style.redBorder} `}>
                        <table class="table">
                            <thead>
                                <tr style={{ borderTop: '1px solid white' }}>
                                    <th className={`${style.redBorder}`} scope="col"><div className={`py-md-3`}>Collections</div></th>
                                    <th scope="col"><div className={`py-md-3`}>Price</div></th>
                                    <th scope="col"><div className={`py-md-3`}>24h</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-3`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon1} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Perdgy Penguizs</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorGreen} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-3`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon2} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Azuki</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-3`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon3} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Otherdeed For Otherside</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorGreen} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={`col-md-5 ${style.redBorder} `}>
                        <table class="table">
                            <thead>
                                <tr style={{ borderTop: '1px solid white' }}>
                                    <th className={`${style.redBorder}`} scope="col"><div className={`py-md-3`}>Collections</div></th>
                                    <th scope="col"><div className={`py-md-3`}>Price</div></th>
                                    <th scope="col"><div className={`py-md-3`}>24h</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-2`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon1} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Perdgy Penguizs</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorGreen} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-2`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon2} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Azuki</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "top" }}>
                                        <div className={`${style.redBorder} mt-md-2`} style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                                            <img src={profileIcon3} alt="" srcset="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Otherdeed For Otherside</span>
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorRed} />
                                        </div>
                                    </td>

                                    <td className={`${style.yellowBorder}`} style={{ verticalAlign: "middle" }}>
                                        <div className={`${style.redBorder}`} style={{ display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }}>
                                            <PriceCol color={style.colorGreen} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={`w-100`}></div>

                    <div className={`col-md-2 my-md-5 ${style.yellowBorder}`}>
                        <button className={`btn px-md-5 py-md-2 ${style.btnSeeMore}`}>See More</button>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}
