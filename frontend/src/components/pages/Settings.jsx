import React from 'react'
import style from '../../stylesheets/setting.module.css'
import Footer from '../Footer'
import Navbar from '../Navbar'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ width: '100%' }}
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
    const params = useParams();
    console.log(params.id);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Navbar></Navbar>

            <section className={`mt-5 container-fluid`}>
                <div className={`row`}>
                    <div className={`col-12`}>
                        <Box
                            className='px-5 p-0 m-0'
                            sx={{ flexGrow: 1, bgcolor: 'rgba(49, 8, 49, 0.85)', display: 'flex', height: '100%' }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="fullWidth"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', background: 'rgba(49, 8, 49, 0.85)' }}

                            >
                                <h1>Hello</h1>

                                <Tab label="Item One" {...a11yProps(0)} sx={{
                                    color: value === 0 ? 'green' : 'pink',
                                    marginX: '100px',
                                    '&.Mui-selected': {
                                        color: 'green',
                                        boxShadow: 'none'
                                    },
                                }} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <section className={`${style.yellowBorder}`} style={{ background: 'pink', height: '200px', width: '100%' }}>
                                    Item sajasnjnajdnsajdnasjkasdsadsadassdsa
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </section>

            <div className='p-0' style={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer></Footer>
            </div>
        </>
    )
}
