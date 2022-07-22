import { AppBar, Box, Toolbar, IconButton, Typography, Badge} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SideDrawer from './SideDrawer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const TopAppBar = () => {

  const location = useLocation()
  const [title, setTitle] = useState('')
  const [shouldBackShow, setShouldBackShow] = useState(false)
  const [headerColor, setHeaderColor] = useState('transparent')
  const navigate = useNavigate()
  const handleBackClick = () => {
    navigate(-1)
  }
  useEffect(() => {
    setShouldBackShow(false)
    setHeaderColor('transparent')
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
    } else if (location.pathname === '/lpmarket') {
      setTitle('代币交易市场')
    } else if (location.pathname === '/invite') {
      setTitle('推广联盟')
    } else if (location.pathname === '/profile') {
      setTitle('个人中心')
      setShouldBackShow(true)
      setHeaderColor('#FFF')
    } else if (location.pathname === '/setting') {
      setTitle('编辑信息')
      setShouldBackShow(true)
      setHeaderColor('#FFF')
    } else if (location.pathname === '/myassets') {
      setTitle('我的资产')
      setShouldBackShow(true)
      setHeaderColor('#FFF')
    }
  }, [location])
  
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <AppBar position="sticky" sx={{backgroundColor: headerColor, boxShadow: 'none'}}>
        <Toolbar>
          {shouldBackShow && <Box sx={{flex: 1, display: 'flex' }}><ArrowBackIosNewIcon sx={{
            color: headerColor === '#FFF' ? '#333' : '#FFF'
          }} onClick={handleBackClick}/></Box>}
          {!shouldBackShow && <SideDrawer />}
          <Typography
            variant="h6"
            noWrap
            component="div" 
            sx={{
              color: headerColor === '#FFF' ? '#333' : '#FFF',
              fontSize: 16,
              fontWeight: 800
            }} 
          >
            { title }
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default TopAppBar
