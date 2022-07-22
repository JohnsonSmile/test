import { Box, Card, CardMedia, Typography } from "@mui/material"

const MyNftCard = (props) => {
    const { myNftInfos, onNftClick, onMoreClick } = props
    return (
        <Card sx={{ mt: 1.5, px: 2, py: 2.5, boxShadow: '0px 0px 10px rgba(66, 61, 247, 0.08)', borderRadius: '12px' }}> 
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ color: '#333', fontSize: 16, fontWeight: 600 }}>我的NFT</Typography>
                <Typography sx={{ color: '#4263EB', fontSize: 12, fontWeight: 500, cursor: 'pointer' }} onClick={onMoreClick}>{'查看全部>'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', pt: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>总数量</Typography>
                    <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myNftInfos.totalAmount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>已质押</Typography>
                    <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myNftInfos.stakeAmount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>市场价值</Typography>
                    <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myNftInfos.totalPrice}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography sx={{ color: '#000', fontSize: 12, fontWeight: 400, opacity: 0.5 }}>昨日收益</Typography>
                    <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 800 }}>{myNftInfos.yesterdayGain}</Typography>
                </Box>
            </Box>
            {myNftInfos.latestNfts && <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, overflow: 'scroll', mt: 2 }}>
                {myNftInfos.latestNfts.map(nftInfo => {
                    return <CardMedia 
                    key={nftInfo.id}
                    component={'img'}
                    sx={{
                        height: 90,
                        width: 90,
                        borderRadius: '12px',
                        cursor: 'pointer'
                    }}
                    onClick={() => { onNftClick(nftInfo.id)}}
                    image={nftInfo.image}/>
                })}
            </Box>}
        </Card>
    )
}

export default MyNftCard