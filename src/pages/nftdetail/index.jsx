import { Box, CardMedia, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]


const NFTDetailPage = () => {
    const location = useLocation()
    return (
        <Box sx={{ backgroundColor: '#FFF' }}>
            <Box sx={{px: 2, py: 2}}>
                <Box sx={{
                    border: '1px solid #F2F2F2',
                    borderRadius: '20px',
                    position: 'relative',
                }}>
                    <Box sx={{ position: 'absolute', right: '10px', top: '10px', borderRadius: '12px', border: '1px solid #F2F2F5', py: 0.5, px: 1, fontSize: '12px', color: '#7E8186'}}>
                        {location.state.nftInfo.time}
                    </Box>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            display: 'inline-block',
                            objectFit: 'cover',
                            height: 200,
                            width: 200,
                        }}
                        image={NFTImages[location.state.nftInfo.type - 1]} />
                </Box>
            </Box>
            <Typography sx={{ color: '#333', fontSize: '21px', fontWeight: 700, mt: 1 }}>NFT#{location.state.nftInfo.id}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500, mt: 1 }}>类型:{location.state.nftInfo.title}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500 , mt: 1}}>价格:{location.state.nftInfo.price} BNB</Typography>
            <Box sx={{ mx: 2, mt: 4, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', color: '#FFF', cursor: 'pointer' }}>确认购买</Box>
        </Box>

    )
}

export default NFTDetailPage