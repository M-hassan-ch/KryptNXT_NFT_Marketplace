import React from 'react'
import style from "../stylesheets/card.module.css";
import img1 from "./icons/nft2.png"

export default function Card(props) {
    return (
        <>
            <div className={`col-md-${props.colSize} ${props.custom} px-md-3 py-md-2 ${style.yellowBorder} ${style.card}`} style={{background: props.cardColor? props.cardColor: '#282C4B'}}>
                <div className={`row ${style.yellowBorder}`}>
                    <div className={`col-12 mt-md-2`}>
                        <img src={props.img ? props.img : img1 } alt="" className={` ${style.nft}`} />
                    </div>

                    <div className={`col-12 mt-md-3`}>
                        {/* Pixel Vault */}
                        <h1 className={`${style.nftName} ${style.textOverflow}`}>{props.title ? props.title : 'Pixel Vault'}</h1>
                        <p className={`${style.greyColor} ${style.yellowBorder} ${style.nftDesc}`}>{props.desc ? props.desc : 'Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact'}</p>
                    </div>

                    <div className={`col-12 mt-md-4`}>
                        <div className={`row `}>
                            <div className={`col-3 ${style.redBorder}`}>
                                <p className={`${style.greyColor}`}> Copies </p>
                                <p className={`${style.textOverflow}`}> {props.copies ? props.copies : '1234'} </p>
                            </div>

                            <div className={`col-1 ${style.redBorder}`}>
                                <div style={{ height: '85%', backgroundColor: 'rgba(255, 255, 255, 0.65)', width: '1px' }}></div>
                            </div>

                            <div className={`col-3 ${style.redBorder}`}>
                                <p className={`${style.greyColor}`}> Price </p>
                                <p className={`${style.textOverflow}`}> {props.price ? props.price : '1234'} </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
