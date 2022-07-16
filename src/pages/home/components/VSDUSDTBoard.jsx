import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const VSDUSDTBoard = (props) => {
    const { vsdUsdtData } = props;
    return (
        <Card sx={{ minWidth: 275, pb: 2 }}>
        <CardContent>
            <Typography component={'div'}  sx={{ fontSize: 19, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            VSD-USDT 流动性挖矿
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >LP token总量</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdUsdtData.tokenTotalAmount.toFixed(2)} USDT</Typography>
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >年化收益率</Typography>
                        <Typography component={'div'} variant={'subtitle2'} color='primary'>{vsdUsdtData.annualizedReturnRateCent.toFixed(2)}%</Typography>
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >池中USDT</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdUsdtData.usdtInPool.toFixed(2)}</Typography>
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
                        <Typography component={'div'} variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >USDT背书</Typography>
                        <Typography component={'div'} variant={'subtitle2'} color='primary'>{vsdUsdtData.usdtEndorsement.toFixed(2)} VSD</Typography>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
        <CardActions sx={{display: 'flex', px: 2}}>
            <Button variant="contained" size="small" sx={{ flex:1 }}>提供VSD-USDT</Button>
            <Button variant="outlined" size="small" sx={{ flex:1 }}>LP参与挖矿</Button>
        </CardActions>
        </Card>
    );
}


export default VSDUSDTBoard