import { Box, Card, Grid, Typography } from "@mui/material"

const PromotionCard = (props) => {
    const { promtionInfo, onPromotionClick } = props
    return (
        <Card sx={{ mt: 1.5, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '12px' }}> 
            <Box sx={{ background: "#4263EB", height: 120, borderRadius: '20px', display: 'flex', flexDirection: 'row',}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Typography >昨日收益</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>{promtionInfo.yesterdayGain}</Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 800, mt: '3px' }}>VSD</Typography>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Typography >总收益</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>{promtionInfo.totalGain}</Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 800, mt: '3px' }}>VSD</Typography>
                    </Box>
                </Box>
            </Box>
            <Grid container columns={6} sx={{px: 2,mt: 2}}>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 14, fontWeight: 400, opacity: 0.5 }}>总直推数</Typography>
                        <Typography sx={{ color: '#000', fontSize: 20, fontWeight: 800 }}>{promtionInfo.promotionCount}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 0.5, py: 1.5 }}>
                        <Typography sx={{ color: '#000', fontSize: 14, fontWeight: 400, opacity: 0.5 }}>联盟成员</Typography>
                        <Typography sx={{ color: '#000', fontSize: 20, fontWeight: 800 }}>{promtionInfo.leagueCount}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ height: 56, borderRadius: '20px', backgroundColor: '#ECF0FF', mx: 2, lineHeight:  '56px', color: '#4263EB', fontSize: 16, fontWeight: 700, mb: 2, cursor: 'pointer' }}
                onClick={onPromotionClick}>
                推广联盟
            </Box>
        </Card>
    )
}

export default PromotionCard