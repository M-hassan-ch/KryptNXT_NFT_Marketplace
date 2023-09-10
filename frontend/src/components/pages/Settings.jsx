import React, { useState, useContext } from 'react'
import style from '../../stylesheets/setting.module.css'
import Footer from '../Footer'
import Navbar from '../Navbar'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Context from "../../context/contractContext";
import axios from "axios";
import { useForm } from "react-hook-form";

import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            // hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ width: '100%' }}
            {...other}
        >
            {(
                <div>{children}</div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Settings() {

    const context = useContext(Context);
    const [dragging, setDragging] = useState(false);

    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const [selectedCoverImage, setSelectedCoverImage] = useState(null);

    const [FormValidationError, setFormValidationError] = useState({ open: false, msg: '' });
    const [ProfilePicHash, setProfilePicHash] = useState(null);
    const [CoverPicHash, setCoverPicHash] = useState(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [OpenSuccessMsg, setOpenSuccessMsg] = useState(false);

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

    const [value, setValue] = React.useState(0);

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

    const handleProfileImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            console.log("File uploaded");
            setSelectedProfileImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            console.log("File uploaded");
            setSelectedCoverImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                setProfilePicHash(resFile.data.IpfsHash);
                console.log("File successfully sent to IPFS", resFile.data.IpfsHash);
                return resFile.data.IpfsHash;
            }
        } catch (error) {
            alert("Error sending File to IPFS: ");
            console.log("Error sending File to IPFS: ");
            console.log(error);
        }
    };

    async function uploadDataToIPFS() {
        const responseFuncOne = await sendFileToIPFS(selectedProfileImage, selectedProfileImage.name);
        const responseFuncTwo = await sendFileToIPFS(selectedCoverImage, selectedCoverImage.name);

        if (responseFuncOne && responseFuncTwo) {
            setProfilePicHash(responseFuncOne);
            setCoverPicHash(responseFuncTwo);
            return { responseFuncOne, responseFuncTwo };
        }
    }

    const saveData = async (data) => {
        try {
            const response = await axios.get(`http://localhost:4000/users?id=${data.id}`);

            if (response.data.length == 0) {
                const response2 = await axios.post('http://localhost:4000/users/', data);
                console.log(response2);
            }
            else {
                const response2 = await axios.patch(`http://localhost:4000/users/${data.id}`, data);
                console.log(response2);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = () => {
        try {
            updateProfile();
        } catch (error) {
            alert("Error while calling on submit");
            console.log(error);
        }
    };

    const updateProfile = async () => {
        try {
            if (title == "") {
                setFormValidationError({ open: true, msg: "Profile name cannot be empty" });
            }
            else if (desc == "") {
                setFormValidationError({ open: true, msg: "Description cannot be empty" });
            }
            else if (selectedProfileImage == null) {
                setFormValidationError({ open: true, msg: "No profile pic uploaded" });
            }
            else if (selectedCoverImage == null) {
                setFormValidationError({ open: true, msg: "No cover pic uploaded" });
            }
            else {
                try {
                    setIsLoading(true);
                    let IpfsData = await uploadDataToIPFS();

                    if (IpfsData.responseFuncOne && IpfsData.responseFuncTwo) {
                        console.log("Metadata Hash!", IpfsData.responseFuncOne, IpfsData.responseFuncTwo);

                        const data = {
                            id: context.account.address,
                            name: title,
                            desc: desc,
                            profilePic: IpfsData.responseFuncOne,
                            coverPic: IpfsData.responseFuncTwo
                        }

                        saveData(data).then(() => {
                            setProfilePicHash(null);
                            setCoverPicHash(null);
                            setIsLoading(false);
                            setOpenSuccessMsg(true);
                        }).catch(() => {
                            throw "Something went wrong";
                        });
                    }
                } catch (error) {
                    console.log('Exception thrown while updating profile');
                    setFormValidationError({ open: true, msg: "Something went wrong" });
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

    return (
        <>
            <Snackbar open={FormValidationError.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                    {`${FormValidationError.msg}!`}
                </Alert>
            </Snackbar>

            <Snackbar open={OpenSuccessMsg} autoHideDuration={2000} onClose={handleSuccessMsgClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                    Profile updated successfully!
                </Alert>
            </Snackbar>

            <Navbar></Navbar>

            <section className={`container-fluid`} style={{ height: '1000%' }}>
                <div className={`row `} style={{ height: '100%' }}>
                    <div className={`col-12 p-0`}>
                        <Box
                            className=''
                            sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex', height: '100%' }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="fullWidth"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', background: 'rgba(49, 8, 49, 0.85)', }}
                                className='pe-4 pt-5'

                            >
                                <h1 style={{ textAlign: 'center', }}> <ManageAccountsTwoToneIcon className='m-2' sx={{ width: '40px', height: '40px' }} />Settings</h1>

                                <Tab label="Profile" {...a11yProps(0)} sx={{
                                    color: value === 0 ? 'white' : 'grey',
                                    marginX: '100px',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        boxShadow: 'none'
                                    },
                                    // border: '2px solid red'
                                }} />
                                {/* <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                            <TabPanel value={value} index={0}
                                children={
                                    <form className={`row m-4 p-5 ${style.formBackground} ${style.yellowBorder}`} onSubmit={handleSubmit(onSubmit)}>

                                        <div className={`col-12 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Name</p>
                                        </div>
                                        <div className={`col-5 ${style.redBorder}`}>
                                            <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Name" id='name' value={title}
                                                onChange={(event) => setTitle(event.target.value)} />
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Description</p>
                                        </div>
                                        <div className={`col-5 ${style.redBorder}`}>
                                            <textarea className={` py-3 w-100 px-3 ${style.inputField}`}
                                                rows={4} // Specify the number of visible rows
                                                placeholder="Description" id='description' value={desc}
                                                onChange={(event) => setDesc(event.target.value)}
                                            />
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Profile Picture</p>
                                        </div>
                                        <div className={`col-md-5 ${style.redBorder}`}>
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
                                                    onChange={handleProfileImageUpload}
                                                    className='py-md-4 '
                                                    style={{ borderRadius: '50px' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Cover Picture</p>
                                        </div>
                                        <div className={`col-md-5 ${style.redBorder}`}>
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
                                                    onChange={handleCoverImageUpload}
                                                    className='py-md-4 '
                                                    style={{ borderRadius: '50px' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-100"></div>

                                        <div className={`col-md-5 mt-md-5 ${style.redBorder}`}>
                                            <button className={`btn px-md-5 py-md-2 ${style.btnCreateNft}`} type="submit" disabled={IsLoading}>
                                                {
                                                    IsLoading ? <CircularProgress color="secondary" /> : "Save"
                                                }
                                            </button>
                                        </div>

                                    </form>}>

                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </section>

            <div className='p-0' style={{ position: '', bottom: '', width: '' }}>
                <Footer></Footer>
            </div>
        </>
    )
}
