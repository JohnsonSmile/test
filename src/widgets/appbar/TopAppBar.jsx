import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Drawer} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';


const TopAppBar = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <AppBar position="sticky" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => { toggleDrawer(true) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Value Bank
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
      <Drawer 
        anchor='left'
        open={isDrawerOpen}
        onClose={() => {toggleDrawer(false)}}>
        <Box>
          HEllo
        </Box>    
      </Drawer>
    </Box>
  );
}


export default TopAppBar
