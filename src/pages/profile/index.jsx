import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from "@mui/material"
import ProfileCard from "./components/ProfileCard"
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const ProfilePage = () => {
    return (
        <Box sx={{backgroundColor: '#EEE', minHeight: 'calc(100vh - 56px)'}}>
            <Box sx={{ pt: 2 }}>
                <ProfileCard />
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                <ListItem secondaryAction={<ArrowForwardIosIcon />}>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="我的资产" />
                </ListItem>
                <Divider />
                <ListItem secondaryAction={<ArrowForwardIosIcon />}>
                    <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="每日签到" />
                </ListItem>
                <Divider />
                <ListItem secondaryAction={<ArrowForwardIosIcon />}>
                    <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="推广详情" />
                </ListItem>
                <Divider />
                <ListItem secondaryAction={<Typography sx={{color: '#FF0000'}}>敬请期待</Typography>}>
                    <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ color: '#333' }} primary="更多功能" />
                </ListItem>
            </List>
        </Box>
    )
}

export default ProfilePage