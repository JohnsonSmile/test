import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import NFTStake from "./components/NFTStake";
import LPStake from "./components/LPStake";
import styled from "@emotion/styled";


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography component={'div'}>{children}</Typography>
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

const BootstrapTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-flexContainer': {
        justifyContent: 'center',
        backgroundColor: '#F2F2F5',
        margin: '0 15px',
        borderRadius: '22px',
        boxSizing: 'border-box',
    },
    '& .MuiButtonBase-root': {
        flex: 1,
        minHeight: '32px',
        height: '32px',
        margin: '5px',
        boxSizing: 'border-box',
        color: '#7E8186'
    },
    '& .Mui-selected': {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        color: '#333'
    },
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent'
    }
}));

const StakePage = () => {
    const location = useLocation()
    const [selectedIds, setSelectedIds] = useState([])
    useEffect(() => {
        if (location.state && location.state.id) {
            selectedIds.push(location.state.id)
        }
    }, [location])

    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <Box sx={{ width: '100%', backgroundColor: '#FFF'}}>
            <Box sx={{ pt: 3 }}>
                <BootstrapTabs value={value} onChange={handleChange}>
                    <Tab label="质押NFT" />
                    <Tab label="质押LP" />
                </BootstrapTabs>
            </Box>
            <TabPanel value={value} index={0}>
                <NFTStake />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LPStake />
            </TabPanel>
        </Box>
    )
}

export default StakePage