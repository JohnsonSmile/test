import { Box, CardMedia,  MenuItem,  Typography } from "@mui/material"
import BootstrapTextField from '../../widgets/textfield/BootstrapTextField'
import { useEffect, useState } from "react"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { approve, getApproved, getUserStakedTokenIDsByPage } from "../../clients/socialNFT"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { apiPostGetNFTInfosByIDs } from "../../http/api"
import { listing } from "../../clients/list"
import { contracts } from "../../clients/contracts"
import { CheckBox } from "@mui/icons-material"
import { asyncSetLoading } from "../../redux/reducers/status"
import { useDispatch } from "react-redux"

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]


const nftTypes = [
    { label: '全部', value: 0 },
    { label: '铜', value: 1 },
    { label: '银', value: 2 },
    { label: '金', value: 3 },
    { label: '钻', value: 4 }
]



const NFTListingPage = () => {
    const [currentQuality, setCurrentQuality] = useState(0)
    const [currentTokenId, setCurrentTokenId] = useState(-1)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [saleTime, setSaleTime] = useState('')
    const [nftInfos, setNftInfos] = useState([])
    const { account } = useWeb3React()
    const dispatch = useDispatch()

    const handleTypeChange = (e) => {
        setCurrentQuality(e.target.value)
    }

    const handleNumberChange = (e) => {
        setCurrentTokenId(e.target.value)
    }

    const handlePriceChange = (e) => {
        setCurrentPrice(e.target.value)
    }

    const handleSaleTimeChange = (e) => {
        console.log(e.target.value)
        setSaleTime(e.target.value)
    }

    const handleListingClick = async () => {
        try {
            dispatch(asyncSetLoading(true, "上架NFT", "查看NFT是否已授权"))
            // get is approved
            const approvedAddr =  await getApproved(currentTokenId)
            if (approvedAddr !== contracts.list) {
                dispatch(asyncSetLoading(true, "上架NFT", "获取NFT授权中..."))
                // approve nft to list
                const res = await approve(contracts.list, currentTokenId)
                console.log(res)
                if (!res.success) {
                    dispatch(asyncSetLoading(false, "上架NFT", "", 0, "获取授权失败!"))
                    return
                }
            }
            dispatch(asyncSetLoading(true, "上架NFT", "正在上架..."))
            // TODO: listing item
            const res = await listing(currentTokenId, currentPrice)
            console.log(res)
            if (res.success) {
                dispatch(asyncSetLoading(false, "铸造NFT", "", 0, "", "上架NFT成功!"))
                setNftInfos(prev => prev.filter(nft =>nft.token_id !== currentTokenId))
                setCurrentTokenId(-1)
            } else {
                dispatch(asyncSetLoading(false, "上架NFT", "", 0, "上架失败!"))
            }
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "上架NFT", "", 0, "上架失败!"))
        }
    }

    const initialInfos = async (quality, account) => {
        // get all nfts not listed with type
        const pageSize = 100
        var index = 0
        var resp = []
        var res = await getUserStakedTokenIDsByPage(account, index, pageSize)
        resp.push(...res)
        while (res.length === 100) {
            index = pageSize * (index + 1)
            res = await getUserStakedTokenIDsByPage(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)
        resp = resp.filter(nft => {
            return !nft.staking
        })
        console.log(resp)
        const tokenIDS = resp.map(nft => nft.tokenId.toNumber())
        console.log(tokenIDS)

        // get nft infos from backend
        const nftInfoResp = await apiPostGetNFTInfosByIDs(tokenIDS)
        console.log(nftInfoResp)
        if (nftInfoResp.code === 200) {
            if (quality === 0) {
                if (nftInfoResp.result && nftInfoResp.result.length > 0) {
                    console.log(nftInfoResp.result)
                    setNftInfos(nftInfoResp.result)
                } else {
                    setNftInfos([])
                }
            } else {

                if (nftInfoResp.result && nftInfoResp.result.length > 0) {
                    setNftInfos(nftInfoResp.result.filter(info => info.quality === quality))
                } else {
                    setNftInfos([])
                }
            }
        }
        console.log(nftInfoResp)
    }

    useEffect(() => {
        dispatch(asyncSetLoading(false, "", "", 0, "", "", true))
        if (account) {
            initialInfos(currentQuality, account)
        }
    }, [currentQuality, account])

    return (
        <Box sx={{backgroundColor: '#FFF'}}>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600}}>NFT类型</Box>
                <BootstrapTextField
                    id="listing-type-select"
                    select
                    value={currentQuality}
                    onChange={handleTypeChange}
                    fullWidth
                    >
                    {nftTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value} sx={{ display: 'flex', flexDirection: 'row',}}>
                            {type.value === 0 && <CheckBox checked sx={{ color: 'green' }}/>}
                            {type.value !== 0 && <CardMedia component="img" image={NFTImages[type.value - 1]} sx={{ width: "20px", height: "20px" }}/>}
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {type.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapTextField>
            </Box>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600}}>NFT编号</Box>
                <BootstrapTextField
                    id="listing-number-select"
                    select
                    value={currentTokenId}
                    onChange={handleNumberChange}
                    fullWidth
                    SelectProps={{
                        renderValue: (selected) => {
                            console.log(selected)
                            if (selected === -1) {
                              return (<Typography component={'span'} sx={{ color: '#7E8186', fontSize: '14px', ml: 0.5}}>
                                    请选择你的NFT编号
                                </Typography>)
                            }
                            return (<Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                        {selected}
                                    </Typography>)
                        },
                        MenuProps: {
                            sx: {
                                maxHeight: '280px'
                            }
                        }
                    }}
                    >
                    {nftInfos && nftInfos.map((nftInfo) => (
                        <MenuItem key={nftInfo.token_id ?? 0 } value={nftInfo.token_id ?? 0} sx={{ display: 'flex', flexDirection: 'row',}}>
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {nftInfo.token_id ?? 0}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapTextField>
            </Box>
            <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600}}>卖出价格</Box>
                <BootstrapTextField
                    id="listing-price"
                    type={'number'}
                    value={currentPrice}
                    onChange={handlePriceChange}
                    fullWidth
                    placeholder="输入卖出价格"
                    >
                </BootstrapTextField>
            </Box>
            {/* <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3 }}>
                <Box component={'label'} for="listing-time" sx={{fontSize: '14px', fontWeight: 600}}>出售时间</Box>
                <BootstrapTextField
                    id="listing-time"
                    type={'time'}
                    value={saleTime}
                    onChange={handleSaleTimeChange}
                    fullWidth
                    placeholder="设置出售时间"
                    >
                </BootstrapTextField>
            </Box> */}
            <Box sx={{ mx: 2, mt: 5, lineHeight: '56px', color: '#FFF', fontWeight: 600, backgroundColor: '#4263EB', borderRadius: '12px', cursor: 'pointer'}}
                onClick={handleListingClick}>
                上架出售
            </Box>
        </Box>
    )
}

export default NFTListingPage