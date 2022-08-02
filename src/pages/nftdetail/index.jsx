import { Box, CardMedia, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { useCallback, useEffect } from "react"
import { buy } from "../../clients/list"
import { useDispatch } from "react-redux"
import { asyncSetHide, asyncSetLoading } from "../../redux/reducers/status"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]


const NFTDetailPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const getNftType = useCallback(() => {
        if (location.state.nftInfo.quality === 1) {
            return '铜'
        } else if (location.state.nftInfo.quality === 2) {
            return '银'
        } else if (location.state.nftInfo.quality === 3) {
            return '金'
        } else if (location.state.nftInfo.quality === 4) {
            return '钻'
        } else {
            return '未知'
        }
    },[location])

    const handleBuyClick = async () => {
        dispatch(asyncSetLoading(true, "购买NFT", "购买NFT中..."))
        try {
            const res = await buy(location.state.nftInfo.token_id)
            // TODO: deal with the response 
            console.log(res)
        } catch (e) {
            dispatch(asyncSetLoading(false, "购买NFT", "", 0, "购买NFT失败！"))
            console.log(e)
        }
    }
    
    useEffect(() =>{
        if (location.state) {
            console.log(location.state)
        }
    }, [location, dispatch]);
    return (
        <Box sx={{ backgroundColor: '#FFF' }}>
            <Box sx={{px: 2, py: 2}}>
                <Box sx={{
                    border: '1px solid #F2F2F2',
                    borderRadius: '20px',
                    position: 'relative',
                }}>
                    {/* <Box sx={{ position: 'absolute', right: '10px', top: '10px', borderRadius: '12px', border: '1px solid #F2F2F5', py: 0.5, px: 1, fontSize: '12px', color: '#7E8186'}}>
                        {location.state.nftInfo.time}
                    </Box> */}
                    <CardMedia 
                        component={'img'}
                        sx={{
                            display: 'inline-block',
                            objectFit: 'cover',
                            height: 200,
                            width: 200,
                        }}
                        image={NFTImages[location.state.nftInfo.quality - 1]} />
                </Box>
            </Box>
            <Typography sx={{ color: '#333', fontSize: '21px', fontWeight: 700, mt: 1 }}>NFT#{location.state.nftInfo.token_id}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500, mt: 1 }}>类型:{getNftType()}</Typography>
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500 , mt: 1}}>价格:{location.state.nftInfo.price} wei</Typography>
            <Box sx={{ mx: 2, mt: 4, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', color: '#FFF', cursor: 'pointer' }}
                onClick={handleBuyClick}>确认购买</Box>
        </Box>

    )
}

export default NFTDetailPage