import React, { useState } from 'react';
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/createNft.module.css'
import polygonIcon from '../icons/polygonIcon.png'
import InputAdornment from '@mui/material/InputAdornment';
// import { OutlinedInput, InputAdornment, createTheme, ThemeProvider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '../Card'

export default function CreateNft() {
    const [dragging, setDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [copies, setCopies] = useState('');
    const [price, setPrice] = useState('');

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        const files = Array.from(event.dataTransfer.files);
        console.log(files);
        // Process dropped files here
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // const handleFileInput = (event) => {
    //     const files = Array.from(event.target.files);
    //     console.log(files);
    //     // Process manually selected files here
    // };

    return (
        <>
            <Navbar></Navbar>

            <section className='my-md-5'>
                <div className={`container ${style.yellowBorder}`}>
                    <div className={`row ${style.formBackground} py-5 px-md-5`}>

                        <div className={`col-12`}>
                            <div className={`row justify-content-around align-items-center`}>
                                <div className={`col-md-5 ${style.blueBorder}`}>
                                    <div className={`row ${style.yellowBorder}`}>
                                        <div className={`col-md-12 mt-md-4 ${style.redBorder}`} style={{ fontSize: "57px", fontWeight: 'bold' }}>
                                            <h1>Create New NFT</h1>
                                        </div>

                                        <div className={`col-12 mt-md-5 mb-md-2 ${style.yellowBorder}`}>
                                            <p className={`${style.formLabel}`}>Choose Account</p>
                                        </div>

                                        <div className={`col-12 ${style.blueBorder}`}>
                                            <div className={`row align-items-center py-md-3 `} style={{ background: 'rgba(39, 3, 39, 0.67)', border: '1px solid #808080', borderRadius: '25px' }}>
                                                <div className={`col-md-2 p-0 ms-md-4 ${style.redBorder}`}>
                                                    <img className={`ms-3 ${style.blueBorder}`} src={polygonIcon} alt="" style={{ height: '55px', width: '55px' }} />
                                                </div>

                                                <div className={`col-md-5 ms-md-3 pt-md-2 ${style.redBorder}`}>
                                                    <p className={`mb-1 ${style.blueBorder}`} style={{ fontSize: '20px', letterSpacing: '1px' }}>
                                                        0x7E14a......09e4
                                                    </p>

                                                    <p style={{ fontSize: '12px', fontWeight: 'bold' }} className={`mt-0 ${style.greyColor} ${style.blueBorder}`}>Polygon</p>
                                                </div>

                                                <div className={`col-md-3 pt-md-2 ms-md-auto ${style.redBorder}`}>
                                                    <p style={{ fontWeight: 'bold' }} className={`${style.colorGreen}`}>Connected</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <form className={`row mt-md-5 ${style.yellowBorder}`}>

                                        <div className={`col-12 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Name</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>
                                            <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Name" id='name' value={title}
                                                onChange={(event) => setTitle(event.target.value)} />
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Description</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>
                                            <textarea className={` py-3 w-100 px-3 ${style.inputField}`}
                                                rows={4} // Specify the number of visible rows
                                                placeholder="Description" id='description' value={desc}
                                                onChange={(event) => setDesc(event.target.value)}
                                            />
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Price</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>

                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="end" className={`${style.greyColor}`} >MATIC</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight',
                                                }}
                                                placeholder={'sds'}
                                                sx={{ color: 'white', borderRadius: '12px' }}
                                                className={` py-1 w-100 px-3 ${style.inputField}`}
                                                value={price}
                                                onChange={(event) => setPrice(event.target.value)}
                                            />

                                            {/* <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Price" id='price' /> */}
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Uplaod File</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>
                                            <div
                                                className={`${style.blue} ${style.inputField} ${style.file} ${dragging ? 'dragging' : ''}`}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                            >
                                                {/* <p>Drag and drop files here</p> */}
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    // multiple
                                                    onChange={handleImageUpload}
                                                    className='py-md-4 '
                                                    style={{ borderRadius: '50px' }}
                                                />
                                            </div>
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Copies</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>
                                            <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Copies" id='copies' value={copies}
                                                onChange={(event) => setCopies(event.target.value)} />
                                        </div>


                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Royalties</p>
                                        </div>
                                        <div className={`col-12 ${style.redBorder}`}>

                                            <OutlinedInput
                                                id="outlined-adornment-weight"
                                                endAdornment={<InputAdornment position="end" sx={{ fontSize: '30rem' }} >%</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight',
                                                }}
                                                placeholder={'Royalties'}
                                                sx={{ color: 'white', borderRadius: '12px' }}
                                                className={` py-1 w-100 px-3 ${style.inputField}`}
                                            />

                                        </div>

                                        <div className={`col-12 mt-md-5 ${style.redBorder}`}>
                                            <button className={`btn px-md-5 py-md-2 ${style.btnCreateNft}`}>See More</button>
                                        </div>

                                    </form>

                                </div>

                                {/* preview card */}

                                <div className={`col-md-4 ${style.blueBorder} `}>
                                    <div className={`row ${style.yellowBorder} `}>
                                        <div className={`col-12 ${style.blueBorder} `}>
                                            <p style={{ fontSize: "36px", fontWeight: 'bold', letterSpacing: '1px' }}>Preview</p>

                                        </div>
                                        <Card colSize={9} custom={`ms-md-3`} title={title} desc={desc} copies={copies} price={price} img={selectedImage} cardColor={'#570157'}></Card>
                                    </div>
                                </div>

                                {/* <div>
                                    <input type="file" onChange={handleImageUpload} />
                                    {selectedImage && <img src={selectedImage} alt="Uploaded" />}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    )
}
