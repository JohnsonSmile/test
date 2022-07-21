import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from "@mui/material"
import ProfileCard from "./components/ProfileCard"
import { ReactComponent as AssetsIcon } from "../../assets/icon/profile/assets.svg"
import { ReactComponent as SignIcon } from "../../assets/icon/profile/sign.svg"
import { ReactComponent as PromotionIcon } from "../../assets/icon/profile/promotion.svg"
import { ReactComponent as MoreIcon } from "../../assets/icon/profile/more.svg"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const navigate = useNavigate()
    const handleMyAssetsClick = () => {
        navigate('/myassets')
    }

    return (
        <Box sx={{backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)'}}>
            <Box sx={{ pt: 2 }}>
                <ProfileCard />
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 3 }}>
                <ListItem sx={{py:1}} secondaryAction={<KeyboardArrowRightIcon sx={{color: '#000', opacity: 0.4}} />} onClick={handleMyAssetsClick}>
                    <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#F4F6FA' }}>
                        <AssetsIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="我的资产" />
                </ListItem>
                <ListItem sx={{py:1}} secondaryAction={<KeyboardArrowRightIcon sx={{color: '#000', opacity: 0.4}} />}>
                    <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#F4F6FA' }}>
                        <SignIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="每日签到" />
                </ListItem>
                <ListItem sx={{py:1}} secondaryAction={<KeyboardArrowRightIcon sx={{color: '#000', opacity: 0.4}} />}>
                    <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#F4F6FA' }}>
                        <PromotionIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="推广详情" />
                </ListItem>
                <ListItem sx={{py:1}} secondaryAction={<Box sx={{display: 'flex', alignItems: 'center'}} >
                        <Typography sx={{color: '#000', opacity: 0.4}}>敬请期待</Typography>
                        <KeyboardArrowRightIcon sx={{color: '#000', opacity: 0.4}}/>
                    </Box>}>
                    <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#F4F6FA' }}>
                        <MoreIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="更多功能" />
                </ListItem>
            </List>
        </Box>
    )
}

export default ProfilePage