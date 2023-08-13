import React, { useState } from 'react'
import style from '../../stylesheets/setting.module.css'
import Footer from '../Footer'
import Navbar from '../Navbar'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
// import { Typography } from '@mui/material';

// import polygonIcon from '../icons/polygonIcon.png'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
// import { Typography } from '@mui/material';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    console.log("iam tab panel");
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


    const params = useParams();
    console.log(params.id);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Navbar></Navbar>

            <section className={`container-fluid`} style={{ border: '2px solid white', height: '1000%' }}>
                <div className={`row `} style={{ border: '5px solid red', height: '100%' }}>
                    <div className={`col-12 p-0`}>
                        <Box
                            className=''
                            sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex', height: '100%', border: '5px solid orange' }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="fullWidth"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', background: 'rgba(49, 8, 49, 0.85)', }}
                                className='pe-4'

                            >
                                <h1 style={{textAlign:'center', border: '5px solid red'}}> <ManageAccountsTwoToneIcon className='m-2' sx={{width: '40px', height: '40px'}}/>Hello</h1>

                                <Tab label="Item One" {...a11yProps(0)} sx={{
                                    color: value === 0 ? 'green' : 'pink',
                                    marginX: '100px',
                                    '&.Mui-selected': {
                                        color: 'green',
                                        boxShadow: 'none'
                                    },
                                    border: '2px solid red'
                                }} />
                                {/* <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                            <TabPanel value={value} index={0}
                                children={
                                    <form className={`row m-4 p-5 ${style.formBackground} ${style.yellowBorder}`}>

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
                                            <p className={`${style.formLabel}`}>Price</p>
                                        </div>
                                        <div className={`col-md-5 ${style.redBorder}`}>

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
                                                    onChange={handleImageUpload}
                                                    className='py-md-4 '
                                                    style={{ borderRadius: '50px' }}
                                                />
                                            </div>
                                        </div>

                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Copies</p>
                                        </div>
                                        <div className={`col-md-4 ${style.redBorder}`}>
                                            <input type="text" className={` py-3 w-100 px-3 ${style.inputField}`} placeholder="Copies" id='copies' value={copies}
                                                onChange={(event) => setCopies(event.target.value)} />
                                        </div>


                                        <div className={`col-12 mt-md-4 ${style.redBorder}`}>
                                            <p className={`${style.formLabel}`}>Royalties</p>
                                        </div>
                                        <div className={`col-md-4 ${style.redBorder}`}>

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

                                        <div className="w-100"></div>

                                        <div className={`col-md-4 mt-md-5 ${style.redBorder}`}>
                                            <button className={`btn px-md-5 py-md-2 ${style.btnCreateNft}`}>See More</button>
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
