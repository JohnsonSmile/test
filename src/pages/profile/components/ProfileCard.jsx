import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Card, Divider, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {

    const navigate = useNavigate()
    const handleSettingClick = () => {
        navigate('/setting')
    }

    return (
        <Card>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', my: 3}}>
                <Avatar sx={{ width: 56, height: 56, mx: 1.5 }}/>
                <Box sx={{flex: 1, gap: 0.5, display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', px: 2}}>
                        <Typography sx={{color: 'InfoText'}}>我的名字：</Typography>
                        <Typography sx={{color: 'InfoText', textAlign: 'center'}}>船中八策</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', px: 2}}>
                        <Typography sx={{color: 'InfoText'}}>我的BSC:</Typography>
                        <Typography sx={{color: 'InfoText', textAlign: 'center'}}>0x395...B72E</Typography>
                    </Box>
                </Box>
                <SettingsIcon sx={{ width: 30, height: 30, alignSelf: 'flex-start', px: 1.5, cursor: 'pointer'}} 
                    onClick={handleSettingClick}/>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color: 'InfoText', lineHeight: '50px'}}>昨日理财收益</Typography>
                    <Typography sx={{color: 'InfoText', lineHeight: '50px'}}>123.13 VSD</Typography>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem/>
                <Box sx={{flex: 1}}>
                    <Typography sx={{color: 'InfoText', lineHeight: '50px'}}>昨日推广收益</Typography>
                    <Typography sx={{color: 'InfoText', lineHeight: '50px'}}>213.22 VSD</Typography>
                </Box> 
            </Box>
        </Card>
    )
}

export default ProfileCard