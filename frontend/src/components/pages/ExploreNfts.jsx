import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import style from '../../stylesheets/exploreNfts.module.css'
import { Link } from 'react-router-dom'
import Context from "../../context/contractContext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Navbar'
import Footer from '../Footer'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import nft1 from '../icons/nft1.png'
import nft2 from '../icons/nft2.png'
import nft3 from '../icons/nft3.png'
import BuyingCard from '../BuyingCard';

export default function ExploreNfts() {

    const context = useContext(Context);
    const [IsLoading, setIsLoading] = useState(false);
    const [Objects, setObjects] = React.useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setObjects([]);

                const array = await context.contractFunction.getMarketplaceRecords();
                if (array) {
                    setObjects(array);
                    setIsLoading(false);
                }

            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        loadData();
    }, [])

    return (
        <>
            <Navbar background={'#040404'} />

            <div className={`${style.explorePage} py-md-5`}>
                <section className={`container pb-md-2`}>

                    {/* explore options */}
                    <div className={`row ${style.yellowBorder}`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link to="/explore/nfts" className={`${style.exploreOptions}`}>NFTs</Link>
                            <div className={`${style.activeBar}`}></div>
                        </div>

                        {/* <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link style={{ color: 'rgb(191, 191, 191)' }} to="/explore/profiles" className={`${style.exploreOptions}`}>Users</Link>
                        </div> */}
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
                    <div className={`row mt-md-4 ${style.yellowBorder}`}>

                        {
                            IsLoading ? <CircularProgress className='mx-auto' color="secondary" /> :
                                Objects.length === 0 ?
                                    <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                    :
                                    Objects.map((item, index) => {
                                        return (
                                            <>
                                                {(index % 3 == 0) && <div className='w-100'></div>}
                                                < BuyingCard colSize={3} custom={`mt-md-4 mx-md-5`
                                                } obj={item} key={index} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />
                                            </>
                                        )
                                    })
                        }


                    </div>
                </section>
            </div>

            <Footer background={'#040404'} />
        </>
    )
}
