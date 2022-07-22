import { Box, Card, Grid, Typography } from "@mui/material";

const MyVSDCard = (props) => { 
    const { myVsdInfos, onGainVsdClick, onLiquidManageClick} = props;
    return (
        <Card sx={{ mt: 1.5, px: 2, py: 2.5, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '12px' }}> 
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ color: '#333', fontSize: 16, fontWeight: 600 }}>我的VSD</Typography>
            </Box>
            <Grid container columns={6} sx={{px: 2,mt: 2}}>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>持有VSD</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.vsdAmount}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>当前VSD价格</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.vsdPrice} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>VSD总价值</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.vsdTotalPrice} USDT</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>VSD质押率</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.stakeRate}%</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>LP Token</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.lpToken}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5 , py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>VSD可收取</Typography>
                        <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myVsdInfos.vsdCanBeAcheived}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 2 }}>
                <Box sx={{ flex: 1, borderRadius: '12px', background: '#4263EB', color: '#FFF', height: 56, lineHeight: '56px', fontWeight: 700, cursor: 'pointer'}}
                    onClick={onGainVsdClick} >收取VSD</Box>
                <Box sx={{ flex: 1, borderRadius: '12px', background: '#ECF0FF', color: '#4263EB', height: 56, lineHeight: '56px', fontWeight: 700, cursor: 'pointer'}}
                    onClick={onLiquidManageClick}>流动性管理</Box>
            </Box>
        </Card>
    )
}

export default MyVSDCard