import React, { useState, useContext } from 'react';
import Context from "../../context/contractContext";
import Navbar from '../Navbar'
import Footer from '../Footer'
import style from '../../stylesheets/createNft.module.css'
import polygonIcon from '../icons/polygonIcon.png'
import InputAdornment from '@mui/material/InputAdornment';
// import { OutlinedInput, InputAdornment, createTheme, ThemeProvider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '../Card'

import axios from "axios";
import { useForm } from "react-hook-form";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateNft() {
    const context = useContext(Context);
    const [dragging, setDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [copies, setCopies] = useState('');
    const [price, setPrice] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [OpenSuccessMsg, setOpenSuccessMsg] = useState(false);

    const [FileHash, setFileHash] = useState(null);
    const [MetaDataHash, setMetaDataHash] = useState(null);

    const [FormValidationError, setFormValidationError] = useState({ open: false, msg: '' });
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const sendFileToIPFS = async (data, fileName) => {
        try {
            const formData = new FormData();
            formData.append("file", data, fileName);

            console.log("sending file to IPFS..........");
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS", //pinJSONToIPFS
                data: formData,
                headers: {
                    pinata_api_key: `5118d12a0f3128be332d`, //${process.env.REACT_APP_PINATA_API_KEY}
                    pinata_secret_api_key: `8660c87818cb1522c2c08d141ed393eeff441cad866f34da9775816bbdbbd809`, //${process.env.REACT_APP_PINATA_API_SECRET}
                    "Content-Type": "multipart/form-data",
                },
            });

            if (resFile) {
                // const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
                setFileHash(resFile.data.IpfsHash);
                console.log("File successfully sent to IPFS", resFile.data.IpfsHash);
                return resFile.data.IpfsHash;
            }
        } catch (error) {
            alert("Error sending File to IPFS: ");
            console.log("Error sending File to IPFS: ");
            console.log(error);
        }
    };

    const sendMetaDataToIPFS = async (filehash) => {
        try {
            if (filehash) {
                const metaData = JSON.stringify({
                    name: document.getElementById("name").value,
                    description: document.getElementById("desc").value,
                    data: filehash,
                });

                console.log("sending json to IPFS..........");
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS", //pinFileToIPFS
                    data: metaData,
                    headers: {
                        pinata_api_key: `5118d12a0f3128be332d`, //${process.env.REACT_APP_PINATA_API_KEY}
                        pinata_secret_api_key: `8660c87818cb1522c2c08d141ed393eeff441cad866f34da9775816bbdbbd809`, //${process.env.REACT_APP_PINATA_API_SECRET}
                        "Content-Type": "application/json",
                    },
                });

                if (resFile) {
                    console.log("Metadata hash", resFile.data.IpfsHash);
                    setMetaDataHash(resFile.data.IpfsHash);
                    return resFile.data.IpfsHash;
                }
            } else {
                alert("Error. null file hash ");
                console.log("Error. null file hash");
            }
        } catch (error) {
            alert("Error sending json to IPFS: ");
            console.log("Error sending json to IPFS: ");
            console.log(error);
        }
    };

    async function uploadDataToIPFS() {
        const responseFuncOne = await sendFileToIPFS(selectedImage, selectedImage.name);
        if (responseFuncOne) {
            setFileHash(responseFuncOne);
            const responseFuncTwo = await sendMetaDataToIPFS(responseFuncOne);
            if (responseFuncTwo) {
                setMetaDataHash(responseFuncTwo);
                return responseFuncTwo;
            }
        }
    }

    const onSubmit = () => {
        const copies = document.getElementById("copies").value;

        try {
            if (parseInt(copies) <= 0) {
                alert("copies should be greater than zero");
            } else {
                mintNft();
            }
        } catch (error) {
            alert("Error while parsing the inputs");
            console.log(error);
        }
    };

    const mintNft = async () => {
        try {
            if (parseInt(copies) <= 0) {
                setFormValidationError({ open: true, msg: "Invalid number of copies" });
            } else if (title == "") {
                setFormValidationError({ open: true, msg: "Title cannot be empty" });
            }
            else if (desc == "") {
                setFormValidationError({ open: true, msg: "Description cannot be empty" });
            }
            else if (selectedImage == null) {
                setFormValidationError({ open: true, msg: "No file uploaded" });
            }
            else {
                console.log("fine");
                try {
                    setIsLoading(true);
                    let metaHash = await uploadDataToIPFS();

                    if (metaHash) {
                        console.log("Metadata Hash!", metaHash);

                        const receipt = await context.contractFunction.mint(metaHash, parseInt(copies));

                        if (receipt) {
                            const txReceipt = await context.Provider.provider.waitForTransaction(receipt.hash);
                            // console.log(receipt.hash);

                            if (txReceipt) {
                                setFileHash(null);
                                setMetaDataHash(null);
                                setIsLoading(false);
                                setOpenSuccessMsg(true);
                            }
                        }
                    }
                } catch (error) {
                    console.log('Exception thrown while calling mint nft function');
                    console.log(error);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log("Error while calling minNft()");
            console.log(error);
            setFormValidationError({ open: true, msg: "Something went wrong" });
            setIsLoading(false);
            // Handle the error here, such as returning a default value or showing an error message to the user.
        }
    };

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
            console.log("File uploaded");
            setSelectedImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFormValidationError({ open: false, msg: "" });
    };

    const handleSuccessMsgClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessMsg(false);
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

                                    <Snackbar open={FormValidationError.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                                        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                                            {`${FormValidationError.msg}!`}
                                        </Alert>
                                    </Snackbar>

                                    <Snackbar open={OpenSuccessMsg} autoHideDuration={2000} onClose={handleSuccessMsgClose} anchorOrigin={{ vertical, horizontal }}>
                                        <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                                            NFT minted successfully!
                                        </Alert>
                                    </Snackbar>

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

                                    <form className={`row mt-md-5 ${style.yellowBorder}`} onSubmit={handleSubmit(onSubmit)}>

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
                                                placeholder="Description" id='desc' value={desc}
                                                onChange={(event) => setDesc(event.target.value)}
                                            />
                                        </div>

                                        {/* <div className={`col-12 mt-md-4 ${style.redBorder}`}>
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

                                            {/* <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Price" id='price' /> // comment end
                                        </div>  */}

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
                                            <input type="number" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Copies" id='copies' value={copies} min={0}
                                                onChange={(event) => setCopies(event.target.value)} />
                                        </div>


                                        { /* <div className={`col-12 mt-md-4 ${style.redBorder}`}>
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
                                        </div> */ }

                                        <div className={`col-12 mt-md-5 ${style.redBorder}`}>

                                            <button className={`btn px-md-5 py-md-2 ${style.btnCreateNft}`} type="submit" disabled={IsLoading}>
                                                {
                                                    IsLoading ? <CircularProgress color="secondary" /> : "Create"
                                                }
                                            </button>

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
