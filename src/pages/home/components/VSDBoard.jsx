import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VSDChartView from './VSDChartView';
import { formatNumber } from '../../../utils/utils';
import { toast } from 'react-toastify';


const dayData = [820, 932, 901, 934, 1290, 1330, 1320];
const weekData = [820, 932, 901, 934, 1290, 1330, 1320];
const monthData = [1000, 1932, 1901, 1934, 290, 1330, 320];
const yearData = [100, 932, 1901, 834, 1290, 1330, 320];


const VSDBoard = (props) => {
    const { vsdData } = props;
    const [isChartShow, setIsChartShow] = useState(false)
    const toggleChartShow = () => {
        toast.info("即将上线，敬请期待...")
        return
        // setIsChartShow(prev => {
        //     return !prev
        // })
    }
    const handleVSDTradeClick = () => {
        toast.info("即将上线，敬请期待...")
    }
    return (
        <Card sx={{ minWidth: 275, pb: 2, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '20px', mt: 2 }}>
        <Box>
            <Typography component={'div'} sx={{ fontSize: 16, fontWeight: 700, m: 1.5 }} color="text.primary" gutterBottom>
            VSD
            </Typography>
            <Divider sx={{ opacity: 0.5 }} />
            <Grid container columns={6} sx={{
                px: 2,
                py: 1,
                mt: 2,
            }}>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        gap: 1
                        }}>
                        <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >总市值</Typography>
                        <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(vsdData.totalPrice.toFixed(2))} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        gap: 1
                        }}>
                        <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >单价</Typography>
                        <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(vsdData.singlePrice.toFixed(2))} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        gap: 1
                        }}>
                        <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >24H价格变化</Typography>
                        <Typography sx={{ fontSize: 16, color: vsdData.changeRateCent > 0 ? '#00C209' : '#FF0000', fontWeight: 700 }}>{vsdData.changeRateCent > 0 ? '+' : '-'}{formatNumber(vsdData.changeRateCent.toFixed(2))}%</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 1,
                        gap: 1
                        }}>
                        <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >USDT背书</Typography>
                        <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{formatNumber(vsdData.usdtEndorsement.toFixed(2))} VSD</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{display: 'flex', px: 2, gap: 1.5}}>
            <Box sx={{ flex:1, background: '#4263EB', borderRadius: '20px', 
                height: '56px', lineHeight: '56px', color: '#FFF', fontSize: 16, cursor: 'pointer',
                fontWeight: 600, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
                onClick={toggleChartShow}>{isChartShow ? '收起图表' : '查看图表'}{isChartShow ? <ArrowUpwardIcon /> :<ArrowDownwardIcon/>}</Box>
            <Box sx={{ flex:1, background: '#ECF0FF', borderRadius: '20px', height: '56px', lineHeight: '56px', color: '#4263EB', fontSize: 16, fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}
                onClick={handleVSDTradeClick}>交易VSD</Box>
        </Box>
        {isChartShow && <VSDChartView dayData={dayData} weekData={weekData} monthData={monthData} yearData={yearData} />}
        </Card>
    );
}


export default VSDBoard