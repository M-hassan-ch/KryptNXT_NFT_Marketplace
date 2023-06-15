import React from 'react'
import style from '../../stylesheets/exploreProfiles.module.css'
import { Link } from 'react-router-dom'


export default function ExploreProfiles() {
    return (
        <>
            <div className={`${style.explorePage}`}>
                <section className={`container`}>

                    <div className={`row ${style.yellowBorder}`}>
                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link to="/explore/nfts" className={`${style.exploreOptions}`}>NFTs</Link>
                        </div>

                        <div className={`col-md-2 ${style.blueBorder}`}>
                            <Link to="/explore/profiles" className={`${style.exploreOptions}`}>Users</Link>
                            <div className={`${style.activeBar}`}></div>
                        </div>
                    </div>
                    <h1>Explore NFT</h1>
                </section>
            </div>
        </>
    )
}
