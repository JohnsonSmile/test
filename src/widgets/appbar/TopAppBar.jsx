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
