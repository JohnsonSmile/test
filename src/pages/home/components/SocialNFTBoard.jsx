import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SocialNFTBoard = (props) => {
    const { socialData } = props;
    const navigate = useNavigate()
    const handleBuildNFTClick = () => {
        // TODO: if user logged in
        navigate('/build')
    }
    return (
        <Card sx={{ minWidth: 275, pb: 2 }}>
        <CardContent>
            <Typography component={'div'} sx={{ fontSize: 19, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Social NFT
            </Typography>
            <Grid container columns={6} sx={{
                px: 2,
                py: 1,
                mt: 2,
                backgroundColor: '#eee'
            }}>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        }}>
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >总市值</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{socialData.totalPrice.toFixed(2)} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        }}>
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >地板价</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{socialData.floorPrice.toFixed(2)} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        }}>
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >流通量/总量</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{socialData.transferAmount}/{socialData.totalAmount}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        }}>
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >24H交易量</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{socialData.transferPrice.toFixed(2)} USDT</Typography>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
        <CardActions sx={{display: 'flex', px: 2}}>
            <Button onClick={ handleBuildNFTClick } variant="contained" size="small" sx={{ flex:1 }}>铸造NFT</Button>
            <Button variant="outlined" size="small" sx={{ flex:1 }}>交易NFT</Button>
        </CardActions>
        </Card>
    );
}


export default SocialNFTBoard