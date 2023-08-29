import { Button } from '@mui/material';
import React from 'react'
import style from "../stylesheets/buyingCard.module.css";

import { useNavigate } from 'react-router-dom'

export default function BuyingCard(props) {
    const navigate = useNavigate();
    // const context = useContext(Context);
    function viewNFTDetails() {
        navigate(`/nft/buy/${props.obj.tokenId}`, { state: { props } });
    }

    return (
        <>
            <div className={`col-md-${props.colSize} ${props.custom} px-md-2 py-md-2 ${style.yellowBorder} ${style.card}`} style={{ background: props.cardColor ? props.cardColor : '#282C4B' }}>

                <div className={`row ${style.yellowBorder}`}>

                    <div className={`col-12 mt-md-1`}>
                        <img src={`https://ipfs.io/ipfs/${props.obj.imgUri}`} alt="" className={` ${style.nft}`} />
                    </div>

                    <div className={`col-12 px-md-3 mt-md-3`}>
                        <h1 className={`${style.nftName} ${style.textOverflow}`} style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{props.obj.name}</h1>
                        <p className={`${style.greyColor} ${style.yellowBorder} ${style.nftDesc}`}>{props.obj.desc}</p>
                    </div>

                    <div className={`col-12 mt-md-4`}>
                        <div className={`row  justify-content- align-items-center`}>

                            <div className={`col-7 ps-md-4 ${style.redBorder}`}>
                                <p className={`${style.greyColor} mb-1`} style={{ fontSize: '20px', fontWeight: '700' }}> Price </p>
                                <p className={`${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '20px' }}> {props.obj.price} MATIC</p>
                            </div>

                            <div className={`col-4 ms-md-1 p-0 ${style.redBorder}`}>
                                <Button className={`py-md-2 ${style.btnView} w-100`} onClick={viewNFTDetails} sx={{
                                    color: '#390C4F',
                                    background: 'white',
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Replace 'red' with your desired hover color
                                    },
                                }} variant="contained">Buy</Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
