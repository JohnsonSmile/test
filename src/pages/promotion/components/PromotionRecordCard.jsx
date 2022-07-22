import { Box, Card, Divider, Typography } from "@mui/material"

const PromotionRecordCard = (props) => {
    const { promotionGainRecord } = props
    return (
        <Card sx={{ mt: 1.5, px: 2, py: 2.5, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '12px' }}> 
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ color: '#333', fontSize: 16, fontWeight: 600 }}>推广收益记录</Typography>
            </Box>
            <Box sx={{mt: 3}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Box sx={{ color: '#A2A0A8', fontSize: 12, textAlign: 'left' }}>{promotionGainRecord.date}</Box>
                        <Box sx={{ mt: 0.5 }}>
                            <Box component={'span'} sx={{ fontSize: 20, textAlign: 'left', mr: 0.5, fontWeight: 700 }}>+ {promotionGainRecord.firstLevelGain}</Box>
                            <Box component={'span'} sx={{ fontSize: 14, textAlign: 'left', fontWeight: 700}}>VSD</Box>
                        </Box>
                    </Box>
                    <Box sx={{ fontSize: 14, fontWeight: 600 }}>一级收益</Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 2, opacity: 0.4}} />
            <Box sx={{mt: 3}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Box sx={{ color: '#A2A0A8', fontSize: 12, textAlign: 'left' }}>{promotionGainRecord.date}</Box>
                        <Box sx={{ mt: 0.5 }}>
                            <Box component={'span'} sx={{ fontSize: 20, textAlign: 'left', mr: 0.5, fontWeight: 700 }}>+ {promotionGainRecord.secondLevelGain}</Box>
                            <Box component={'span'} sx={{ fontSize: 14, textAlign: 'left', fontWeight: 700}}>VSD</Box>
                        </Box>
                    </Box>
                    <Box sx={{ fontSize: 14, fontWeight: 600 }}>二级收益</Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 2, opacity: 0.4}} />
            <Box sx={{mt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                        <Box sx={{ color: '#A2A0A8', fontSize: 12, textAlign: 'left' }}>{promotionGainRecord.date}</Box>
                        <Box sx={{ mt: 0.5 }}>
                            <Box component={'span'} sx={{ fontSize: 20, textAlign: 'left', mr: 0.5, fontWeight: 700 }}>+ {promotionGainRecord.leagueGain}</Box>
                            <Box component={'span'} sx={{ fontSize: 14, textAlign: 'left', fontWeight: 700}}>VSD</Box>
                        </Box>
                    </Box>
                    <Box sx={{ fontSize: 14, fontWeight: 600 }}>联盟收益</Box>
                </Box>
            </Box>
        </Card>
    )
}

export default PromotionRecordCard