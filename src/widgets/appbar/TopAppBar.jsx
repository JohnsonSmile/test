import { AppBar, Box, Toolbar, IconButton, Typography, Badge} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideDrawer from './SideDrawer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const TopAppBar = () => {

  const location = useLocation()
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (location.pathname === '/home') {
      setTitle('VBank Value')
    } else if (location.pathname === '/build') {
      setTitle('铸造')
    } else if (location.pathname === '/mynft') {
      setTitle('我的NFT')
    } else if (location.pathname === '/mynft/list') {
      setTitle('NFT列表')
      // const type = location.state.type
      // if (type === 1) {
      //   setTitle('铜')
      // } else if (type === 2) {
      //   setTitle('银')
      // } else if (type === 3) {
      //   setTitle('金')
      // } else if (type === 4) {
      //   setTitle('钻')
      // }
    } else if (location.pathname === '/stake') {
      setTitle('质押')
    } else if (location.pathname === '/market') {
      setTitle('NFT交易市场')
    } else if (location.pathname === '/sign') {
      setTitle('签到')
    }
  }, [location])
  
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <AppBar position="sticky" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <SideDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            { title }
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box >
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default TopAppBar
