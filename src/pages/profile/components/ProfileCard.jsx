import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Card, Divider, Typography } from "@mui/material"
import { ReactComponent as EditIcon } from "../../../assets/icon/profile/edit.svg"
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {

    const navigate = useNavigate()
    const handleSettingClick = () => {
        navigate('/setting')
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Box 
                sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mt: 1.5, cursor: 'pointer'}}
                onClick={handleSettingClick}>
                <Typography sx={{color: 'InfoText', textAlign: 'center', fontSize: '20px'}}>船中八策</Typography>
                <EditIcon />
            </Box>
            <Typography sx={{color: 'rgba(0, 0, 0, .5)', textAlign: 'center', fontSize: '14px'}}>0x395...B72E</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 3, mt: 3}}>
                <Card sx={{py: 3, px: 3.5, borderRadius: '16px', boxShadow: '0px 0px 20px rgba(66, 61, 247, 0.1)',
                        display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{color: 'InfoText', textAlign: 'center', fontSize: '14px'}}>昨日理财收益</Typography>
                    <Typography sx={{color: 'InfoText', textAlign: 'center', fontSize: '14px'}}>
                        <span style={{fontWeight: 800, fontSize: '24px', lineHeight: '30px'}}>4500</span> VSD</Typography>
                </Card>
                <Card sx={{py: 3, px: 3.5, borderRadius: '16px', boxShadow: '0px 0px 20px rgba(66, 61, 247, 0.1)',
                        display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{color: 'InfoText', textAlign: 'center', fontSize: '14px'}}>昨日推广收益</Typography>
                    <Typography sx={{color: 'InfoText', textAlign: 'center', fontSize: '14px'}}>
                        <span style={{fontWeight: 800, fontSize: '24px', lineHeight: '30px'}}>4500</span> VSD</Typography>
                </Card>
            </Box>
        </Box>
    )
}

export default ProfileCard