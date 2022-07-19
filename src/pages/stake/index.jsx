import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from 'prop-types';
import NFTStake from "./components/NFTStake";
import LPStake from "./components/LPStake";


const TabPanel = (props) => {
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="质押NFT" />
                    <Tab label="质押LP" />
                </Tabs>
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