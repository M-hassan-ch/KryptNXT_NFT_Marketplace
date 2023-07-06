import React from 'react'
import style from '../../stylesheets/exploreNfts.module.css'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Navbar'
import Footer from '../Footer'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import ExploreCard from '../ExploreCard';
import nft1 from '../icons/nft1.png'
import nft2 from '../icons/nft2.png'
import nft3 from '../icons/nft3.png'

export default function ExploreNfts() {
    let desc = 'Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact Lorem ipsum dolor sit amet,  dlkss consetetur '
    return (
        <>
            <Navbar background = {'#040404'}/>

            <div className={`${style.explorePage} py-md-5`}>
                <section className={`container pb-md-2`}>

                    {/* explore options */}
                    <div className={`row ${style.yellowBorder}`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link to="/explore/nfts" className={`${style.exploreOptions}`}>NFTs</Link>
                            <div className={`${style.activeBar}`}></div>
                        </div>

                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link style={{ color: 'rgb(191, 191, 191)' }} to="/explore/profiles" className={`${style.exploreOptions}`}>Users</Link>
                        </div>
                    </div>

                    {/* filters */}
                    <div className={`row mt-md-5 ${style.yellowBorder} justify-content-between`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                Filters
                            </Button>
                        </div>

                        <div className={`col-md-7 ${style.blueBorder}`}>
                            <TextField
                                placeholder="Enter your search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton sx={{ color: 'white' }}>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        '& input': {
                                            color: 'white',
                                        },
                                        '& input::placeholder': {
                                            color: 'white',
                                        },
                                        '& input:focus': {
                                            color: 'white',
                                        },
                                    },
                                }}
                                sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px', height: '49px' }}
                                className={`w-100`}
                            />
                        </div>

                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" endIcon={<ExpandMoreIcon fontSize={'50px'} />}>
                                Trending
                            </Button>
                        </div>

                    </div>

                    {/* cards */}
                    <div className={`row mt-md-4 ${style.yellowBorder} justify-content-around`}>
                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={nft2} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={nft3} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={nft1} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                        <div className='w-100'></div>

                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={nft1} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={''} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                        <ExploreCard colSize={3} custom={`mt-md-4`} title={''} desc={desc} copies={''} price={''} img={nft3} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />

                    </div>
                </section>
            </div>

            <Footer background = {'#040404'}/>
        </>
    )
}
