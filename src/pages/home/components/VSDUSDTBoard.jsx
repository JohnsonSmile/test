import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';

const VSDUSDTBoard = (props) => {
    const { vsdUsdtData } = props;
    return (
        <Card sx={{ minWidth: 275, pb: 2, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '20px', mt: 2 }}>
            <Box>
                <Typography component={'div'} sx={{ fontSize: 16, fontWeight: 700, m: 1.5 }} color="text.primary" gutterBottom>
                VSD-USDT 流动性挖矿
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
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >LP token总量</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{vsdUsdtData.tokenTotalAmount.toFixed(2)} USDT</Typography>
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
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >年化收益率</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{vsdUsdtData.annualizedReturnRateCent.toFixed(2)}%</Typography>
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
                            <Typography sx={{ fontSize: 12, color: '#000', opacity: 0.5 }} >池中USDT</Typography>
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{vsdUsdtData.usdtInPool.toFixed(2)}</Typography>
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
                            <Typography sx={{ fontSize: 16, color: '#000', fontWeight: 700 }}>{vsdUsdtData.usdtEndorsement.toFixed(2)} VSD</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display: 'flex', px: 2, gap: 1.5}}>
                <Box sx={{ flex:1, background: '#4263EB', borderRadius: '20px', 
                    height: '56px', lineHeight: '56px', color: '#FFF', fontSize: 16, cursor: 'pointer', fontWeight: 600, boxSizing: 'border-box'}} >提供VSD-USDT</Box>
                <Box sx={{ flex:1, background: '#ECF0FF', borderRadius: '20px', height: '56px', lineHeight: '56px', color: '#4263EB', fontSize: 16, fontWeight: 600, boxSizing: 'border-box', cursor: 'pointer' }}>LP参与挖矿</Box>
            </Box>
        </Card>
    );
}


export default VSDUSDTBoard