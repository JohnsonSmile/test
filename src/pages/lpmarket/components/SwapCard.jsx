import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material"
import BNBIcon from '../../../assets/icon/bnb.png'
import PancakeIcon from '../../../assets/icon/pancake.png'

const SwapCard = () => {
    return (
        <Card sx={{ borderRadius: '20px' }}>
            <CardContent sx={{px:0}}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{flex: 1}}>left </Box>
                    <Typography component={'div'}  sx={{ fontSize: 19, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                        Swap
                    </Typography>
                    <Box  sx={{flex: 1}}>right container</Box>
                </Box>
                <Typography component={'div'}  sx={{ fontSize: 13, mb:3 }} color="text.primary" gutterBottom>
                    Trade tokens in an instant
                </Typography>
                <Divider />
                <Box sx={{py: 2}}>
                    <Box sx={{px:2, py: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <CardMedia
                                component={'img'}
                                sx={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: '50%',
                                    mr: 0.5,
                                }}
                                image={BNBIcon} />
                            <Typography variant='inherit'>BNB</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <Typography variant='inherit'>Balance: 0</Typography>
                        </Box>
                    </Box>
                    <Box sx={{height: '100px', px: 2}}>
                        <Box sx={{ height: '100px', 
                                px: 2,
                                backgroundColor: '#eee', 
                                borderRadius: '20px', 
                                display: 'flex', 
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'}}>
                            <Typography variant='inherit'>0.0</Typography>
                            <Typography variant='inherit'>MAX</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{py: 2}}>
                    <Box sx={{px:2, py: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <CardMedia
                                component={'img'}
                                sx={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: '50%',
                                    mr: 0.5,
                                }}
                                image={PancakeIcon} />
                            <Typography variant='inherit'>PAN</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'row',}}>
                            <Typography variant='inherit'>Balance: 0</Typography>
                        </Box>
                    </Box>
                    <Box sx={{height: '80px', px: 2}}>
                        <Box sx={{ height: '80px', 
                                px: 2,
                                backgroundColor: '#eee', 
                                borderRadius: '20px', 
                                display: 'flex', 
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'}}>
                            <Typography variant='inherit'>0.0</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SwapCard