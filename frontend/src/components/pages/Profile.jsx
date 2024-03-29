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
import axios from 'axios';

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

    const [User, setUser] = React.useState(null);
    const [value, setValue] = React.useState(0);

    const [Objects, setObjects] = React.useState([]);

    const [SearchedObjects, setSearchedObjects] = React.useState([]);
    const [ShowSearch, setShowSearch] = React.useState(false);
    const [SearchQuery, setSearchQuery] = React.useState("");

    const [IsLoading, setIsLoading] = useState(false);
    const context = useContext(Context);

    useEffect(() => {
        async function loadUserData() {
            try {
                const response = await axios.get(`http://localhost:4000/users/${context.account.address}`);
                const data = await response.data;
                setUser(data);
                console.log(data);
            } catch (error) {
                setUser(null);
            }
        }
        loadUserData();
    }, [context?.account?.address])

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

    function navigateToViewSoldRecord(recordId) {
        navigate(`/soldRecord/${recordId}`);
    }

    function navigateToCreateNFT() {
        navigate(`/createNft`);
    }

    function navigateToSettings(user) {
        navigate(`/${user}/settings`);
    }

    function navigateToHomepage() {
        navigate(`/`);
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

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
                else if (value == 2) {
                    const array = await context.contractFunction.getSoldRecords(context.account.address);

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
    }, [value, context?.account?.address])

    useEffect(() => {
        if (!context?.account?.address) {
            navigateToHomepage();
        }
    }, [context?.account?.address])

    useEffect(() => {
        if (SearchQuery == '') {
            setShowSearch(false);
        }
    }, [SearchQuery])


    async function search(event) {
        event.preventDefault();

        if (Objects.length > 0 && SearchQuery != '') {
            console.log('searching');
            const regexPattern = new RegExp(SearchQuery.replace(/\s+/g, "\\s*"), "i");

            const searchResults = Objects.filter((item) => regexPattern.test(item.name.replace(/\s+/g, " ")));

            // console.log(searchResults);
            // console.log(SearchQuery);
            setShowSearch(true);
            setSearchedObjects(searchResults);
        }
    }

    function SearchBar() {
        return (
            <div className={`row ${style.yellowBorder} mt-md-3 justify-content-between`}>
                <div className={`col-md-2 ${style.blueBorder}`}>
                    <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                        Filters
                    </Button>
                </div>

                <div className={`col-md-7 ${style.blueBorder}`}>
                    <TextField
                        value={SearchQuery}
                        onChange={handleInputChange}
                        placeholder="Enter your search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton sx={{ color: 'white' }} onClick={(event) => { search(event) }}>
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
        )
    }

    return (
        <>
            <Navbar background={'#040404'} />

            <section className={`pb-md-5 ${style.profilePage}`}>
                <div className={`container-fluid p-0 ${style.redBorder}`}>
                    <div className={`${style.coverPic}`}>
                        <img src={User ? `https://ipfs.io/ipfs/${User.coverPic}` : coverPic} alt="cover" style={{ objectFit: 'fill', height: '100%', width: '100%' }} />
                    </div>
                </div>

                <div className={`container`}>
                    <div className="row">
                        <div className={`col-md-2 p-3 ${style.yellowBorder} ${style.profilePic}`} style={{ background: '#0F0016', borderRadius: '25px' }}>
                            <img src={User ? `https://ipfs.io/ipfs/${User.profilePic}` : profilePic} alt="cover" className={`${style.redBorder}`} style={{ objectFit: 'fill', height: '100%', width: '100%', borderRadius: '25px' }} />
                        </div>
                    </div>
                </div>

                <div className={`container mt-5 pt-md-4 ${style.redBorder}`}>
                    <div className={`row`}>
                        <div className={`col-md-5 ${style.yellowBorder}`}>
                            <p style={{ fontSize: '40px', }}>
                                {User ? User.name : "Unnamed"}
                            </p>
                        </div>

                        <div className="w-100"></div>

                        <div className={`col-md-5 ${style.yellowBorder}`}>
                            <p style={{ fontSize: '17px', color: '#A0A0A0', textAlign: 'justify' }}>
                                {User ? User.desc : "No Description"}
                            </p>
                        </div>

                        <div className="w-100"></div>

                        <div className={`col-md-5 mt-2 ${style.yellowBorder} `}>

                            <div className={`row justify-content-between`}>
                                <div className={`col-md-3 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`} onClick={() => { navigateToSettings(context.account.address) }}>Edit Profile</button>
                                </div>

                                <div className={`col-md-2 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`}> <a href="#sell" className={`${style.sell}`} style={{ fontWeight: 'normal' }}>Sell</a></button>
                                </div>

                                <div className={`col-md-2 p-0 ${style.blueBorder}`}>
                                    <button className={`btn py-md-2 ${style.btnProfileOpt}`} onClick={navigateToCreateNFT}><IosShareIcon /></button>
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
                                        <Tab label="Sold" className='px-3 ms-md-5 ' sx={{
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
                                                value={SearchQuery}
                                                onChange={handleInputChange}
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }} onClick={(event) => { search(event) }}>
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
                                    <div id='sell' className={`row mt-md-4 ${style.yellowBorder} justify-content-ev
                                    `}>

                                        {
                                            IsLoading ? <CircularProgress className='mx-auto' color="secondary" /> :
                                                ShowSearch == false ?
                                                    Objects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                                        :
                                                        Objects.map((item, index) => {

                                                            return (
                                                                <>
                                                                    {(index % 3 == 0) && <div className='w-100'></div>}

                                                                    < ExploreCard colSize={3} custom={`mt-md-4 mx-5`
                                                                    } title={item.name} key={index} desc={item.desc} copies={item.balance} price={''} owner={item.owner} tokenId={item.tokenId} endPoint={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} clickBehavior={navigateToViewNftDetails} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />
                                                                </>
                                                            )
                                                        })
                                                    :
                                                    SearchedObjects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found in search</h2>
                                                        :
                                                        SearchedObjects.map((item, index) => {

                                                            return (
                                                                <>
                                                                    {(index % 3 == 0) && <div className='w-100'></div>}

                                                                    < ExploreCard colSize={3} custom={`mt-md-4 mx-5`
                                                                    } title={item.name} key={index} desc={item.desc} copies={item.balance} price={''} owner={item.owner} tokenId={item.tokenId} endPoint={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} clickBehavior={navigateToViewNftDetails} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} />
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
                                                value={SearchQuery}
                                                onChange={handleInputChange}
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }} onClick={(event) => { search(event) }}>
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
                                                ShowSearch == false ?
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
                                                    :
                                                    SearchedObjects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found in search</h2>
                                                        : SearchedObjects.map((item, index) => {
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
                                    <div className={`row ${style.yellowBorder} mt-md-3 justify-content-between`}>
                                        <div className={`col-md-2 ${style.blueBorder}`}>
                                            <Button className={`px-md-4 py-md-2 w-100 ${style.btnFilter}`} sx={{ background: 'rgba(142, 142, 142, 0.12)', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px' }} variant="contained" startIcon={<ArrowBackIosIcon />}>
                                                Filters
                                            </Button>
                                        </div>

                                        <div className={`col-md-7 ${style.blueBorder}`}>
                                            <TextField
                                                value={SearchQuery}
                                                onChange={handleInputChange}
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }} onClick={(event) => { search(event) }}>
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
                                                ShowSearch == false ?
                                                    Objects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found</h2>
                                                        :
                                                        Objects.map((item, index) => {
                                                            return (
                                                                <>
                                                                    {(index % 3 == 0) && <div className='w-100'></div>}

                                                                    < ExploreCard key={index} colSize={3} custom={`mt-md-4 mx-md-5`
                                                                    } title={item.name} desc={item.desc} copies={item.copies} price={''} owner={item.owner} tokenId={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} clickBehavior={navigateToViewSoldRecord} endPoint={item.recordId} />
                                                                </>
                                                            )
                                                        })
                                                    :
                                                    SearchedObjects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found in search</h2>
                                                        :
                                                        SearchedObjects.map((item, index) => {
                                                            return (
                                                                <>
                                                                    {(index % 3 == 0) && <div className='w-100'></div>}

                                                                    < ExploreCard key={index} colSize={3} custom={`mt-md-4 mx-md-5`
                                                                    } title={item.name} desc={item.desc} copies={item.copies} price={''} owner={item.owner} tokenId={item.tokenId} img={`https://ipfs.io/ipfs/${item.imgUri}`} cardColor={'linear-gradient(138deg, #612257 0%, #952690 21.14%, #6F2D9A 42.68%, #672E99 67.49%, #45275D 99.99%, rgba(128, 36, 119, 0.00) 100%)'} clickBehavior={navigateToViewSoldRecord} endPoint={item.recordId} />
                                                                </>
                                                            )
                                                        })
                                        }

                                    </div>
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
                                                value={SearchQuery}
                                                onChange={handleInputChange}
                                                placeholder="Enter your search"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton sx={{ color: 'white' }} onClick={(event) => { search(event) }}>
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
                                                ShowSearch == false ?
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
                                                    :
                                                    SearchedObjects.length === 0 ?
                                                        <h2 className='mt-5' style={{ textAlign: 'center', letterSpacing: '1px' }}> No record found in search</h2>
                                                        :
                                                        SearchedObjects.map((item, index) => {
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
