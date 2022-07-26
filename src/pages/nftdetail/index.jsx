import { Box, CardMedia, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import NFTCardImage from "../../assets/images/mynft/nftcard.png"


const NFTDetailPage = () => {
    const location = useLocation()
    return (
        <Box sx={{ backgroundColor: '#FFF' }}>
            <Box sx={{px: 2, py: 2}}>
                <Box sx={{
                    border: '1px solid #F2F2F2',
                    borderRadius: '20px'
                }}>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            display: 'inline-block',
                            objectFit: 'cover',
                            height: 240,
                            width: 240,
                        }}
                        image={NFTCardImage} />
                </Box>
            </Box>
            <Typography sx={{ color: '#333', fontSize: '21px', fontWeight: 700, mt: 1 }}>NFT#{location.state.nftInfo.id}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500, mt: 1 }}>类型:{location.state.nftInfo.title}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500 , mt: 1}}>价格:{location.state.nftInfo.price} BNB</Typography>
            <Box sx={{ mx: 2, mt: 4, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', color: '#FFF' }}>确认购买</Box>
        </Box>

    )
}

export default NFTDetailPage