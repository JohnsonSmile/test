import { Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListSubheader, Typography } from "@mui/material"
import { useState } from "react";
import { ReactComponent as MenuIcon } from '../../assets/icon/menu.svg'
import { ReactComponent as AvatarIcon } from '../../assets/icon/home/avatar.svg'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";


const listItems = [
    {
        title: '首页',
        url: '/',
        isReady: true
    },{
        title: '铸造',
        url: '/build',
        isReady: true
    },{
        title: '我的NFT',
        url: '/mynft',
        isReady: true
    },{
        title: 'NFT交易市场',
        url: '/market',
        isReady: true
    },{
        title: '质押',
        url: '/stake',
        isReady: true
    },{
        title: '每日签到',
        url: '/sign',
        isReady: true
    },{
        title: '代币交易市场',
        url: '/lpmarket',
        isReady: true
    },{
        title: '邀请他人',
        url: '/invite',
        isReady: true
    },{
        title: '消息中心',
        url: '/',
        isReady: false
    },{
        title: 'NFT合成',
        url: '/',
        isReady: false
    },{
        title: '优享折扣',
        url: '/',
        isReady: false
    },{
        title: '排行榜',
        url: '/',
        isReady: false
    },
]


const SideDrawer = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDrawer = (open) => {
        setIsDrawerOpen(open);
    };

    const handleListItemClick = (item) => {
        // TODO: if user is already logged in, if not show dialog for login
        setIsDrawerOpen(false)
        navigate(item.url)
    }

    const handleProfileClick = () => { 
        setIsDrawerOpen(false)
        navigate('/profile')
    }
    return (
        <Box sx={{backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-start', display: 'flex'}}>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => { toggleDrawer(true) }}
            >
            <MenuIcon />
            </IconButton>
            <Drawer 
                anchor='left'
                open={isDrawerOpen}
                onClose={() => {toggleDrawer(false)}}>
                <Box sx={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <List
                        component="nav"
                        alignItems={'center'}
                        subheader={
                            <ListSubheader
                            component="div"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "75px",
                                width: "100%",
                                flex: 1
                            }}
                    >
                        <Box sx={{flex:1}}></Box>
                        <Typography variant="h6" sx={{ color: '#333', fontSize: '16px', fontWeight: 700}}>Value Bank</Typography>
                        <Box sx={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <IconButton
                                onClick={() => { toggleDrawer(false) }}
                                sx={{
                                    color: '#333',
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        </ListSubheader>
                    }
                    >

                        {listItems.map(item => {
                            return (
                                <ListItemButton
                                    key={item.title}
                                    onClick={() => {handleListItemClick(item)}}
                                    sx={{width: '100%', display: 'flex', justifyContent: 'center'}}
                                >
                                    <Typography fontSize={14} color={item.isReady ? '#333' : '#7E8186' } fontWeight={500}>
                                        {item.title}
                                        {!item.isReady && <Typography component="span" sx={{ color: '#423DF7', fontSize:'12px', ml:1 }}>即将上线!</Typography>}
                                    </Typography>
                                </ListItemButton>
                            )
                        })}
                    </List>
                    <Divider sx={{mx:2, my: 1}} />
                    <Box 
                        style={{
                            width: "100%",
                            flex: 1,
                            display: 'flex', flexDirection: 'column', alignItems: 'center' 
                        }}>
                            
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, cursor: 'pointer', width: '100%', py: 1}} onClick={handleProfileClick} >
                            <AvatarIcon />
                            <Typography sx={{color: '#333', fontSize: '14px'}}>个人中心</Typography>
                        </Box>
                        <Box sx={{width: '100%', textAlign: 'center', cursor: 'pointer', py: 1, fontSize: '14px'}}>参与流程</Box>
                        <Box sx={{width: '100%', textAlign: 'center', cursor: 'pointer', py: 1, fontSize: '14px'}}>规则说明</Box>
                    </Box>
                    
                </Box>    
            </Drawer>
        </Box>
    )
}

export default SideDrawer