import React, { useRef, useState, useEffect, useContext } from 'react';
import {
    Box,
    // Card,
    // CardContent,
    Container,
    // Typography,
    IconButton,
    Snackbar
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import nft1 from '../icons/nft1.png'
import nft2 from '../icons/nft2.png'
import nft3 from '../icons/nft3.png'
import profileIcon1 from '../icons/profileIcon3.png'
import profileIcon2 from '../icons/profileIcon2.png'
import profileIcon3 from '../icons/profileIcon1.png'

import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/homepage.module.css'
import welcomeImg from '../icons/welcome.png'
import Card from '../Card'
import { useNavigate } from 'react-router-dom';
import Context from "../../context/contractContext";
import MuiAlert from '@mui/material/Alert';
// import Carousel from 'react-material-ui-carousel'
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Homepage() {

    const context = useContext(Context);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const carouselRef = useRef(null);

    const [showBackwardButton, setShowBackwardButton] = useState(false);
    const [showForwardButton, setShowForwardButton] = useState(true);


    useEffect(() => {
        carouselRef.current.addEventListener('scroll', handleScroll);
        return () => {
            carouselRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollLeft = carouselRef.current.scrollLeft;
        const clientWidth = carouselRef.current.clientWidth;

        setShowBackwardButton(scrollLeft > 0);
        setShowForwardButton(scrollLeft + clientWidth < carouselRef.current.scrollWidth - 1);
    };

    const handleSlide = (scrollOffset) => {
        carouselRef.current.scrollLeft += scrollOffset;
    };

    const navigateTo = (endPoint) => {
        if (context.account.address) {
            navigate(`${endPoint}`, {});
        }
        else {
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Navbar />

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="error" onClose={handleClose}>
                    Please connect your wallet first!
                </Alert>
            </Snackbar>

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
                                Explore the marketplace for crypto collectibles <br></br>and non-fungible tokens (NFTs).
                            </h6>
                        </div>

                        <div className={`m-0 p-0`}>
                            <button className={`btn px-md-5 py-md-2 ${style.btnExplore}`} onClick={() => navigateTo("/explore/nfts")}>Explore</button>
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
                <div className={`row align-items-center `}>
                    <div className={`col-md-3 ms-auto ${style.redBorder} `}>
                        <div>
                            <h1>
                                Explore NFTs <br />On Our <br /> Marketplace
                            </h1>
                        </div>

                        <div className={`py-md-3`}>
                            <h6 style={{ fontSize: '20px', fontWeight: 'lighter' }}>
                                Buy, sell, and discover exclusive <br></br> digital items.
                            </h6>
                        </div>

                        <div className={`m-0 p-0`}>
                            <button className={`btn px-md-5 py-md-2 ${style.btnExplorePlateform}`} onClick={() => navigateTo("/explore/nfts")}>Explore Plateform</button>
                        </div>
                    </div>

                    <div className={`col-md-8 ms-3 `} >

                        <div className={`row ${style.redBorder} p-0 m-0`} >

                            {/* <Carousel autoPlay={false} animation={'slide'} indicators={false} swipe={true} cycleNavigation={false} navButtonsAlwaysVisible={true}>
                                <div className={`row ${style.redBorder} p-0 m-0`}>
                                    <Card colSize={3}></Card>
                                    <Card colSize={3}></Card>
                                    <Card colSize={3}></Card>
                                </div>

                                <div className={`row ${style.redBorder} p-0 m-0`}>
                                    <Card colSize={3}></Card>
                                </div>
                            </Carousel> */}

                            <Container className='col-12' maxWidth="md" sx={{ position: 'relative' }}>
                                <Box className={`${style.blueBorder}`} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, width: '1200px', }}>

                                    {showBackwardButton && (
                                        <IconButton className='p-3' sx={{
                                            position: 'absolute',
                                            top: '45%',
                                            left: '5%',
                                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                                            border: '1px solid grey',
                                            borderRadius: '30%',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'black',
                                                opacity: 0.8,
                                                border: 'none'
                                            }
                                        }} onClick={() => handleSlide(-200)}>
                                            <ChevronLeft />
                                        </IconButton>
                                    )}

                                    <Box className={`${style.yellowBorder}`} sx={{
                                        display: 'flex',
                                        overflowX: 'auto',
                                        scrollBehavior: 'smooth',
                                        scrollSnapType: 'x mandatory',
                                        '&::-webkit-scrollbar': {
                                            display: 'none'
                                        }
                                    }}
                                        ref={carouselRef}>
                                        <Card colSize={3} title ={`Bore Ape`} desc = {'Digital art tokens stored on blockchain, NFTs are unique collectibles and assets for the modern age'} price = {29} copies = {200} img={nft1} custom='me-4'></Card>
                                        
                                        <Card colSize={3} img={nft2} cardColor='#610652' custom='me-4' title={'Street Machine'} desc = {'Non-fungible tokens represent ownership of digital items, from art to virtual real estate.'} price = {123} copies = {739} ></Card>
                                        <Card colSize={3} img={nft3} title='Away Machine' cardColor='#640A60' custom='me-4' desc = {'Blockchain-backed NFTs: Rare, indivisible digital assets, revolutionizing ownership in the digital world.'} price = {123} copies = {632} ></Card> 

                                        <Card colSize={3} img={nft2} desc = {'Digital art tokens stored on blockchain, NFTs are unique collectibles and assets for the modern age'} price = {321} copies = {890} custom='me-4' title={'Street Machine'}></Card>
                                        
                                        <Card colSize={3} img={nft2} cardColor='#610652' custom='me-4' title={'Street Machine'} desc = {'Blockchain-backed NFTs: Rare, indivisible digital assets, revolutionizing ownership in the digital world.'} price = {54} copies = {2020} ></Card>
                                        
                                        <Card colSize={3} img={nft2} cardColor='#610652' custom='me-4' title={'Street Machine'} desc = {'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'} price = {29} copies = {200} ></Card>

                                        {/* Add more cards as needed */}
                                    </Box>

                                    {showForwardButton && (
                                        <IconButton className='p-3' sx={{
                                            position: 'absolute',
                                            top: '45%',
                                            right: '-2%',
                                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                                            border: '1px solid grey',
                                            borderRadius: '30%',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'black',
                                                opacity: 0.8,
                                                border: 'none'
                                            }
                                        }} onClick={() => handleSlide(200)}>
                                            <ChevronRight />
                                        </IconButton>
                                    )}

                                </Box>
                            </Container>
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
                        <table className="table">
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
                                            <img src={profileIcon1} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Perdgy Penguizs</span>
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
                                            <img src={profileIcon2} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Azuki</span>
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
                                            <img src={profileIcon3} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Otherdeed For Otherside</span>
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
                        <table className="table">
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
                                            <img src={profileIcon1} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Perdgy Penguizs</span>
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
                                            <img src={profileIcon2} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Azuki</span>
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
                                            <img src={profileIcon3} alt="" /> {'\u00A0'} {'\u00A0'} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Otherdeed For Otherside</span>
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
                        <button className={`btn px-md-5 py-md-2 ${style.btnSeeMore}`}
                            onClick={() => navigateTo("/explore/nfts")}>See More</button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
