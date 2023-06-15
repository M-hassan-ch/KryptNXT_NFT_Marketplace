import React from 'react'
import style from '../../stylesheets/exploreNfts.module.css'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ExploreNfts() {
    return (
        <>
            <div className={`${style.explorePage}`}>
                <section className={`container`}>

                    <div className={`row ${style.yellowBorder}`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link to="/explore/nfts" className={`${style.exploreOptions}`}>NFTs</Link>
                            <div className={`${style.activeBar}`}></div>
                        </div>

                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link style={{ color: 'rgb(191, 191, 191)' }} to="/explore/profiles" className={`${style.exploreOptions}`}>Users</Link>
                        </div>
                    </div>

                    <div className={`row mt-md-5 ${style.yellowBorder} justify-content-between`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Button className={` px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                Filters
                            </Button>
                        </div>

                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Button className={` px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" endIcon={<ExpandMoreIcon fontSize={'50px'} />}>
                                Trending
                            </Button>
                        </div>

                    </div>

                    <h1>Explore NFT</h1>
                </section>
            </div>

        </>
    )
}
