import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VSDChartView from './VSDChartView';


const dayData = [820, 932, 901, 934, 1290, 1330, 1320];
const weekData = [820, 932, 901, 934, 1290, 1330, 1320];
const monthData = [1000, 1932, 1901, 1934, 290, 1330, 320];
const yearData = [100, 932, 1901, 834, 1290, 1330, 320];


const VSDBoard = (props) => {
    const { vsdData } = props;
    const [isChartShow, setIsChartShow] = useState(false)
    const toggleChartShow = () => {
        setIsChartShow(prev => {
            return !prev
        })
    }
    return (
        <Card sx={{ minWidth: 275, pb: 2 }}>
        <CardContent>
            <Typography component={'div'}  sx={{ fontSize: 19, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            VSD
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
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdData.totalPrice.toFixed(2)} USDT</Typography>
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >单价</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdData.singlePrice.toFixed(2)} USDT</Typography>
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >24H价格变化</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdData.changeRateCent.toFixed(2)}%</Typography>
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
                        <Typography component={'div'}  variant={'subtitle2'} color='InfoText' sx={{mt: 1}} >USDT背书</Typography>
                        <Typography component={'div'}  variant={'subtitle2'} color='primary'>{vsdData.usdtEndorsement.toFixed(2)} VSD</Typography>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
        <CardActions sx={{display: 'flex', px: 2}}>
            <Button variant="contained" size="small" sx={{ flex:1 }} 
                endIcon={isChartShow ? <ArrowUpwardIcon /> :<ArrowDownwardIcon/>}
                onClick={toggleChartShow}>{isChartShow ? '收起图表' : '查看图表'}</Button>
            <Button variant="outlined" size="small" sx={{ flex:1 }}>交易VSD</Button>
        </CardActions>
        {isChartShow && <VSDChartView dayData={dayData} weekData={weekData} monthData={monthData} yearData={yearData} />}
        </Card>
    );
}


export default VSDBoard