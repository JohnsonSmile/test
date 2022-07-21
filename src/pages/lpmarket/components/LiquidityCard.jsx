import { Box, Button, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BNBIcon from '../../../assets/icon/bnb.png'
import PancakeIcon from '../../../assets/icon/pancake.png'

const LiquidityCard = () => {
    return (
        <Card sx={{ borderRadius: '20px' }}>
            <CardContent sx={{px:0}}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, px: 2, justifyContent: 'space-between'}}>
                    <Typography component={'div'}  sx={{ fontSize: 19, fontWeight: 'bold' }} color="#393E84" gutterBottom>
                        Your Liquidity
                    </Typography>
                    <Box>
                        <SettingsIcon sx={{ color: '#786EA6' }} />
                        <HistoryIcon sx={{ color: '#786EA6' }} />
                    </Box>
                </Box>
                <Typography component={'div'}  sx={{ fontSize: 14, mb:3, textAlign: 'left', px: 2 }} color="#786EA6" gutterBottom>
                    Remove liquidity to receive tokens back
                </Typography>
                <Box sx={{py: 2, backgroundColor: '#eee'}}>
                    <Box sx={{px:2, py: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <CardMedia
                                component={'img'}
                                sx={{
                                    height: 25,
                                    width: 25,
                                    borderRadius: '50%',
                                    mr: 0.5,
                                }}
                                image={BNBIcon} />
                            <Typography variant='inherit' color="#393E84" sx={{ fontWeight: 700, fontSize: 17 }}>BNB</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <Typography variant='inherit' color="#393E84" sx={{ fontWeight: 700, fontSize: 14 }}>Balance: 0</Typography>
                        </Box>
                    </Box>
                    <Box sx={{height: '90px', px: 2}}>
                        <Box sx={{ height: '90px', 
                                px: 2,
                                gap: 1,
                                backgroundColor: '#EDEAF3', 
                                borderRadius: '20px', 
                                display: 'flex', 
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'}}>
                            <Typography variant='inherit' color="#393E84" sx={{ fontWeight: 700 }}>0.0</Typography>
                            <Typography variant='inherit' color="#5EC4D2" 
                                sx={{border: '2px solid #5EC4D2', px: 1, borderRadius: '20px', fontWeight: 700, fontSize: 13}}>MAX</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{px: 2}}>
                    <Box 
                    sx={{
                        mt: 2, 
                        height: 40, 
                        borderRadius: 20, 
                        backgroundColor: '#5EC4D2', 
                        color: '#FFF', 
                        lineHeight: '40px',
                        cursor: 'pointer'}}>+ Add Liquidity</Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default LiquidityCard