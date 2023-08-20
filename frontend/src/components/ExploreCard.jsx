import { Button } from '@mui/material';
import React from 'react'
import style from "../stylesheets/exploreCard.module.css";
import img1 from "./icons/nft2.png"

import { useNavigate } from 'react-router-dom'

export default function ExploreCard(props) {
    const navigate = useNavigate();
    // const context = useContext(Context);

    function viewNFTDetails() {
        navigate('/nft/1', { state: { props } });
    }

    return (
        <>
            <div className={`col-md-${props.colSize} ${props.custom} px-md-2 py-md-2 ${style.yellowBorder} ${style.card}`} style={{ background: props.cardColor ? props.cardColor : '#282C4B' }}>

                <div className={`row ${style.yellowBorder}`}>

                    <div className={`col-12 mt-md-1`}>
                        <img src={props.img ? props.img : img1} alt="" className={` ${style.nft}`} />
                    </div>

                    <div className={`col-12 px-md-3 mt-md-3`}>
                        <h1 className={`${style.nftName} ${style.textOverflow}`} style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{props.title ? props.title : 'Pixel Vault'}</h1>
                        <p className={`${style.greyColor} ${style.yellowBorder} ${style.nftDesc}`}>{props.desc ? props.desc : 'Lorem ipsum dolor sit amet,  dlkss consetetur It is a long established fact'}</p>
                    </div>

                    <div className={`col-12 mt-md-4`}>
                        <div className={`row  justify-content- align-items-center`}>

                            <div className={`col-7 ps-md-4 ${style.redBorder}`}>
                                <p className={`${style.greyColor} mb-1`} style={{ fontSize: '20px', fontWeight: '700' }}> Copies </p>
                                <p className={`${style.textOverflow}`} style={{ fontWeight: 'bold', fontSize: '20px' }}> {props.copies ? props.copies : '0.024'}</p>
                            </div>

                            <div className={`col-4 ms-md-1 p-0 ${style.redBorder}`}>
                                {/* onClick={viewNFTDetails} */}
                                <Button className={`py-md-2 ${style.btnView} w-100`} onClick={() => {
                                    props.clickBehavior(props.endPoint)
                                }} sx={{
                                    color: '#390C4F',
                                    background: 'white',
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Replace 'red' with your desired hover color
                                    },
                                }} variant="contained">View</Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
