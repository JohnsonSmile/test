import { Box, CardMedia, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { useCallback, useEffect } from "react"
import { buy } from "../../clients/list"
import { useDispatch } from "react-redux"
import { asyncSetLoading } from "../../redux/reducers/status"
import { ethers } from "ethers"
import { getUsdtAllowance, getUsdtBalance, usdtApprove } from "../../clients/usdt"
import { useWeb3React } from "@web3-react/core"
import { getFormatBigNumber } from "../../utils"
import { contracts } from "../../clients/contracts"
import { toast } from "react-toastify"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]


const NFTDetailPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { account } = useWeb3React()
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
        // if (location.state.nftInfo.owner === account || location.state.nftInfo.buyer === account) {
        //     toast.warn("您不能购买您自己的NFT")
        //     return
        // }
        dispatch(asyncSetLoading(true, "购买NFT", "购买NFT中..."))
        try {
            // approve price
            const price = ethers.utils.parseEther(location.state.nftInfo.price)
            console.log(location.state.nftInfo.price)
            // get balance
            const usdtBalance = await getUsdtBalance(account)
            console.log('usdtBalance===', getFormatBigNumber(usdtBalance))
            if (usdtBalance.lt(price)) {
                dispatch(asyncSetLoading(false, "购买NFT", "", 0, "USDT余额不足"))
                return
            }
            // get approved usdt
            dispatch(asyncSetLoading(true, "购买NFT", "获取USDT授权..."))
            const usdtApproved = await getUsdtAllowance(account, contracts.list)
            console.log(getFormatBigNumber(usdtApproved))
            if (usdtApproved.lt(price)) {
                // approve usdt
                const approveUsdtResp = await usdtApprove(contracts.list, price)
                console.log(approveUsdtResp)
                if (!approveUsdtResp || !approveUsdtResp.success) {
                    dispatch(asyncSetLoading(false, "购买NFT", "", 0, "获取USDT授权失败!"))
                    return
                }
            }
            dispatch(asyncSetLoading(true, "购买NFT", "购买中..."))
            const res = await buy(location.state.nftInfo.token_id)
            // TODO: deal with the response 
            if (res.success) {
                dispatch(asyncSetLoading(false, "购买NFT", "", 0, "", "购买NFT成功"))
            } else {
                dispatch(asyncSetLoading(false, "购买NFT", "", 0, "购买NFT失败！"))
            }
            console.log(res)
        } catch (e) {
            dispatch(asyncSetLoading(false, "购买NFT", "", 0, "购买NFT失败！"))
            console.log(e)
        }
    }
    
    useEffect(() =>{
        if (location.state) {
            console.log(location.state.nftInfo)
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
            <Typography sx={{ color: '#333', fontSize: '14px', fontWeight: 500 , mt: 1}}>价格:{location.state.nftInfo.price} USDT</Typography>
            {<Box sx={{ mx: 2, mt: 4, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', color: '#FFF', cursor: 'pointer' }}
                onClick={handleBuyClick}>确认购买</Box>}
        </Box>

    )
}

export default NFTDetailPage