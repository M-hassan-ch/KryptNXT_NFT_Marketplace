import React from 'react'
import style from "../stylesheets/card.module.css";
import img1 from "./icons/nft1.png"

export default function Card() {
    return (
        <>
            <div className={`col-md-3 px-md-3 py-md-2 ${style.yellowBorder} ${style.cardColor} ${style.card}`}>
                <div className={`row ${style.yellowBorder}`}>
                    <div className={`col-12 `}>
                        <img src={img1} alt="" className={` ${style.nft}`} />
                    </div>

                    <div className={`col-12 mt-md-3`}>
                        <h1 className={`${style.nftName}`}>Pixel Vault</h1>
                        <p className={`${style.greyColor} ${style.nftDesc}`}>Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact</p>
                    </div>

                    <div className={`col-12 mt-md-4`}>
                        <div className={`row `}>
                            <div className={`col-3 ${style.redBorder}`}>
                                <p className={`${style.greyColor}`}> Copies </p>
                                <p> 1234 </p>
                            </div>

                            <div className={`col-1 ${style.redBorder}`}>
                                <div style={{height: '85%', backgroundColor: 'rgba(255, 255, 255, 0.65)', width: '1px'}}></div>
                            </div>

                            <div className={`col-3 ${style.redBorder}`}>
                                <p className={`${style.greyColor}`}> Price </p>
                                <p> 1234 </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
