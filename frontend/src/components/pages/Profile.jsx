import React, { useEffect, useContext, useState } from 'react'
import Context from "../../context/contractContext";
import style from '../../stylesheets/profile.module.css'
import coverPic from '../icons/coverPic.png'
import profilePic from '../icons/profilePic.png'

import Navbar from '../Navbar'
import Footer from '../Footer'
import ExploreCard from '../ExploreCard'
import CircularProgress from '@mui/material/CircularProgress';

import IosShareIcon from '@mui/icons-material/IosShare';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function Profile() {
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [Objects, setObjects] = React.useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const context = useContext(Context);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function navigateToMarkedRecord(recordId) {
        navigate(`/markedRecord/${recordId}`);
    }

    function navigateToViewNftDetails(tokenId) {
        navigate(`/nft/${tokenId}`);
    }

    function navigateToViewBoughtRecord(recordId) {
        navigate(`/boughtRecord/${recordId}`);
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setObjects([]);

                if (value == 0) {
                    const array = await context.contractFunction.getOwned(context.account.address);
                    if (array) {
                        setObjects(array);
                        setIsLoading(false);
                    }
                }
                else if (value == 1) {
                    const array = await context.contractFunction.getMarkedRecords(context.account.address);

                    if (array) {
                        setObjects(array);
                        setIsLoading(false);
                    }
                }
                else if (value == 3) {
                    const array = await context.contractFunction.getBoughtRecords(context.account.address);

                    if (array) {
                        setObjects(array);
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        loadData();
    }, [value])



    return (
        <>
            <Navbar background={'#040404'} />

            <section className={`pb-md-5 ${style.profilePage}`}>
                <div className={`container-fluid p-0 ${style.redBorder}`}>
                    <div className={`${style.coverPic}`}>
                        <img src={coverPic} alt="cover" style={{ objectFit: 'fill', height: '100%', width: '100%' }} />
                    </div>
                </div>

                <div className={`container`}>
                    <div className="row">
                        <div className={`col-md-2 p-3 ${style.yellowBorder} ${style.profilePic}`} style={{ background: '#0F0016', borderRadius: '25px' }}>
                            <img src={profilePic} alt="cover" className={`${style.redBorder}`} style={{ objectFit: 'fill', height: '100%', width: '100%', borderRadius: '25px' }} />
                        </div>
                    </div>
                </div>

                <div className={`container mt-5 pt-md-4 ${style.redBorder}`}>
                    <div className={`row`}>
                        <div className={`col-md-5 ${style.yellowBorder}`}>
                            <p style={{ fontSize: '40px', }}>
                                Bored Ape Yacht Club
                            </p>
                        </div>

                        <div className="w-100"></div>

                        <div className={`col-md-5 ${style.yellowBorder}`}>
                            <p style={{ fontSize: '17px', color: '#A0A0A0', textAlign: 'justify' }}>
                                The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs — unique digital collectibles living on
                            </p>
                        </div>

                        <div className="w-100"></div>

                        <div className={`col-md-5 mt-2 ${style.yellowBorder} `}>

                            <div className={`row justify-content-between`}>
                                <div className={`col-md-3 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`}>Edit Profile</button>
                                </div>

                                <div className={`col-md-2 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`}>Sell</button>
                                </div>

                                <div className={`col-md-2 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`}><IosShareIcon /></button>
                                </div>

                                <div className={`col-md-2 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`}><PendingOutlinedIcon /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`row`}>
                        <div className={`mt-md-4 p-0 col-12 ${style.yellowBorder}`} style={{ border: '', borderRadius: '' }}>

                            <Box sx={{ width: '100%', }}>
                                <Box sx={{ width: '100%', borderRadius: '15px' }}>
                                    <Tabs value={value} onChange={handleChange}>
                                        <Tab label="Owned" className='px-3' sx={{
                                            color: '#FFFF',
                                            bgcolor: value === 0 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                            '&.Mui-selected': {
                                                color: '#FFFF',
                                            },
                                        }} />
                                        <Tab label="On Sale" className='px-3 ms-md-5 ' sx={{
                                            color: '#FFFF',
                                            bgcolor: value === 1 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                            '&.Mui-selected': {
                                                color: '#FFFF',
                                            },
                                        }} />
                                        <Tab label="Collections" className='px-3 ms-md-5 ' sx={{
                                            color: '#FFFF',
                                            bgcolor: value === 2 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                            '&.Mui-selected': {
                                                color: '#FFFF',
                                            },
                                        }} />
                                        <Tab label="Purchased" className='px-3 ms-md-5 ' sx={{
                                            color: '#FFFF',
                                            bgcolor: value === 3 ? 'rgba(15, 7, 21, 0.67)' : 'inherit',
                                            '&.Mui-selected': {
                                                color: '#FFFF',
                                            },
                                        }} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>

                                    <div className={`row ${style.yellowBorder} mt-md-3 justify-content-between`}>
                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                                Filters
                                            </Button>
                                        </div>

                                        <div className={`col-md-7 ${style.blueBorder}`}>
                                            <TextField
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }}>
                                                                <Search />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '& input': {
                                                            color: 'white',
                                                        },
                                                        '& input::placeholder': {
                                                            color: 'white',
                                                        },
                                                        '& input:focus': {
                                                            color: 'white',
                                                        },
                                                    },
                                                }}
                                                sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', height: '49px' }}
                                                className={`w-100`}
                                            />
                                        </div>

                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" endIcon={<ExpandMoreIcon fontSize={'50px'} />}>
                                                Trending
                                            </Button>
                                        </div>

                                    </div>

                                    {/* cards */}
                                    <div className={`row mt-md-4 ${style.yellowBorder} justify-content-ev
                                    `}>

                                        {
                                            IsLoading ? <CircularProgress className='mx-auto' color="secondary" /> :
                                                Objects.length === 0 ?
                                                    <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                                    : Objects.map((item, index) => {

                                                        return (
                                                            <>
                                                                {(index % 3 == 0) && <div className='w-100'></div>}

                                                                < ExploreCard colSize={3} custom={`mt-md-4 mx-md-5`
                                                                } title={item.name} desc={item.desc} copies={item.balance} price={''} owner={item.owner} tokenId={item.tokenId} endPoint={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} clickBehavior={navigateToViewNftDetails} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />
                                                            </>
                                                        )
                                                    })
                                        }

                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <div className={`row ${style.yellowBorder} mt-md-3 justify-content-between`}>
                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                                Filters
                                            </Button>
                                        </div>

                                        <div className={`col-md-7 ${style.blueBorder}`}>
                                            <TextField
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }}>
                                                                <Search />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '& input': {
                                                            color: 'white',
                                                        },
                                                        '& input::placeholder': {
                                                            color: 'white',
                                                        },
                                                        '& input:focus': {
                                                            color: 'white',
                                                        },
                                                    },
                                                }}
                                                sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', height: '49px' }}
                                                className={`w-100`}
                                            />
                                        </div>

                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" endIcon={<ExpandMoreIcon fontSize={'50px'} />}>
                                                Trending
                                            </Button>
                                        </div>

                                    </div>

                                    {/* cards */}
                                    <div className={`row mt-md-4 ${style.yellowBorder} justify-content-ev
                                    `}>

                                        {
                                            IsLoading ? <CircularProgress className='mx-auto' color="secondary" /> :
                                                Objects.length === 0 ?
                                                    <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                                    : Objects.map((item, index) => {
                                                        return (
                                                            <>
                                                                {(index % 3 == 0) && <div className='w-100'></div>}

                                                                < ExploreCard key={index} colSize={3} custom={`mt-md-4 mx-md-5`
                                                                } title={item.name} desc={item.desc} copies={item.copies} price={''} owner={item.owner} tokenId={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} clickBehavior={navigateToMarkedRecord} endPoint={item.recordId} />
                                                            </>
                                                        )
                                                    })
                                        }

                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    Item three
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={3}>
                                    <div className={`row ${style.yellowBorder} mt-md-3 justify-content-between`}>
                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                                Filters
                                            </Button>
                                        </div>

                                        <div className={`col-md-7 ${style.blueBorder}`}>
                                            <TextField
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }}>
                                                                <Search />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        '& input': {
                                                            color: 'white',
                                                        },
                                                        '& input::placeholder': {
                                                            color: 'white',
                                                        },
                                                        '& input:focus': {
                                                            color: 'white',
                                                        },
                                                    },
                                                }}
                                                sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', height: '49px' }}
                                                className={`w-100`}
                                            />
                                        </div>

                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" endIcon={<ExpandMoreIcon fontSize={'50px'} />}>
                                                Trending
                                            </Button>
                                        </div>

                                    </div>

                                    {/* cards */}
                                    <div className={`row mt-md-4 ${style.yellowBorder}
                                    `}>

                                        {
                                            IsLoading ? <CircularProgress className='mx-auto' color="secondary" />
                                                :
                                                Objects.length === 0 ?
                                                    <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                                    :
                                                    Objects.map((item, index) => {
                                                        return (
                                                            <>
                                                                {(index % 3 == 0) && <div className='w-100'></div>}

                                                                < ExploreCard key={index} colSize={3} custom={`mt-md-4 mx-md-5`
                                                                } title={item.name} desc={item.desc} copies={item.copies} price={''} owner={item.owner} tokenId={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} clickBehavior={navigateToViewBoughtRecord} endPoint={item.recordId} />
                                                            </>
                                                        )
                                                    })
                                        }

                                    </div>
                                </CustomTabPanel>
                            </Box>
                        </div>
                    </div>
                </div>

            </section>

            <Footer background={'#040404'} />
        </>
    )
}
