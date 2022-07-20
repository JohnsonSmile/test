import { Avatar, Box, Button, Drawer, IconButton, List, ListItemButton, ListSubheader, Typography } from "@mui/material"
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
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
        url: '/',
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
    return (
        <Box sx={{backgroundColor: '#1976d2'}}>
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
                <Box sx={{width: '70vw', height: '100vh'}}>
                    <List
                    component="nav"
                    subheader={
                        <ListSubheader
                        component="div"
                        style={{
                            background: "#1976d2",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "75px",
                        }}
                    >
                        <Box paddingTop={"10px"}>
                            {/* <img src={Logo} alt="logo" height={"40"} /> */}
                            <Typography variant="h6">VBank</Typography>
                        </Box>
                        <IconButton
                            onClick={() => { toggleDrawer(false) }}
                            sx={{
                            color: "#FFF",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        </ListSubheader>
                    }
                    >
                    {listItems.map(item => {
                        return (
                            <ListItemButton
                                key={item.title}
                                onClick={() => {handleListItemClick(item)}}
                                sx={{ pl: 3 }}
                            >
                                <Typography fontSize={14} color={'#333'}>
                                    {item.title}
                                    {!item.isReady && <Typography component="span" sx={{ color: 'red', fontSize:12, ml:1 }}>即将上线</Typography>}
                                </Typography>
                            </ListItemButton>
                        )
                    })}
                    </List>
                    <Box 
                    style={{
                        position: "absolute",
                        bottom: 0,
                        paddingBottom: 30,
                        width: "100%",
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap:1}}>
                            <Box>
                                <Button>参与流程</Button>
                                <Button>规则说明</Button>
                            </Box>
                            <Box>
                                <Button variant="contained" 
                                    startIcon={<Avatar sx={{width: 35, height: 35}}/>}
                                    sx={{ px: 4, py: 1 }}
                                >个人中心</Button>
                            </Box>
                        </Box>
                    </Box>
                    
                </Box>    
            </Drawer>
        </Box>
    )
}

export default SideDrawer