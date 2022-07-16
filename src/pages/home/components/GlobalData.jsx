import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SocialNFTBoard from './SocialNFTBoard';
import VSDBoard from './VSDBoard';
import VSDUSDTBoard from './VSDUSDTBoard';

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
          <Typography  component={'div'}>{children}</Typography>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const GlobalData = (props) => {

  const { socialData, vsdData, vsdUsdtData } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 1.5, backgroundColor: '#77aad9'}}>
      <Box sx={{ height: 56, backgroundColor: '#fff' }}>
        <Tabs sx={{ height: 56 }} value={value} onChange={handleChange} >
          <Tab sx={{ height: 56, textTransform: 'capitalize', fontSize: '17px' }} label="NFT" {...a11yProps(0)} />
          <Tab sx={{ height: 56, textTransform: 'capitalize', fontSize: '17px'  }} label="VSD" {...a11yProps(1)} />
          <Tab sx={{ height: 56, textTransform: 'capitalize', fontSize: '17px'  }} label="VSD-USDT" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SocialNFTBoard socialData={socialData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VSDBoard vsdData={vsdData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VSDUSDTBoard vsdUsdtData={vsdUsdtData} />
      </TabPanel>
    </Box>
  );
}

export default GlobalData