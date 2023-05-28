import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/homepage.module.css'
import welcomeImg from '../icons/welcome.png'
import Card from '../Card'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

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
            <section className={`container-fluid mt-md-5 ${style.exploreSection}`}>
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
                                    <Card></Card>
                                    <Card></Card>
                                    <Card></Card>
                                </div>

                                <div className={`row ${style.redBorder} p-0 m-0`}>
                                    <Card></Card>
                                </div>




                            </Carousel>
                        </div>

                    </div>
                </div>
            </section>


            {/* section */}

            <section className={`container-fluid mt-md-5 ${style.tableSection}`}>
                <div className={`row ${style.yellowBorder}`}>
                    <div className={`col-md-5 ${style.redBorder} `}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={`col-md-5 ${style.redBorder} `}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}
