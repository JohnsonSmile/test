import { Box, CardMedia, Chip, MenuItem, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import MultipleSelection from "./MultipleSelection"
import DiamondNFTImage from "../../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../../assets/images/mynft/copper_nft.png"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetLoading } from "../../../redux/reducers/status";
import { asyncSetNftInfos, asyncSetSelectedIDs, getHome, getNftInfos, getSelectedIDs } from "../../../redux/reducers/page";
import { styled } from "@mui/styles";
import { rescue, staking } from "../../../clients/mine";
import { useWeb3React } from "@web3-react/core";
import { approve, getIsApprovedForAll, setApprovalForAll } from "../../../clients/valuebleNFT";
import { contracts } from "../../../clients/contracts";

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]



const nftTypes = [
    { label: '铜', value: 1 },
    { label: '银', value: 2 },
    { label: '金', value: 3 },
    { label: '钻', value: 4 }
]

const BootstrapSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '14px',
        height: '48px',
        border: '1px solid #F2F2F2'
    },
    '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
    },
}));


const NFTStake = () => {
    const nftInfos = useSelector(getNftInfos)
    const selectedIDs = useSelector(getSelectedIDs)
    const homeInfo = useSelector(getHome)
    const [selectedType, setSelectedType] = useState(1)
    const [nftIDs, setNftIDs] = useState([])
    const [stkIDs, setStkIDs] = useState([])
    const { account } = useWeb3React()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleTypeChange = (e) => {
        console.log(e.target.value)
        setSelectedType(e.target.value)
        dispatch(asyncSetSelectedIDs([]))
        setNftIDs(nftInfos.filter(nft => nft.quality === e.target.value).map(nftInfo => nftInfo.token_id))
    }

    const onNFTSelected = (selectedNFTIDs) => {
        console.log(selectedNFTIDs)
        dispatch(asyncSetSelectedIDs(selectedNFTIDs))
    }

    const handleStakeClick = async () => {
        if (selectedIDs.length === 0) {
            toast.error("至少选择一个")
            return
        }
        dispatch(asyncSetLoading(true, "质押NFT", "正在质押NFT"))
        try {

            // get is approved
            const isApproved = await getIsApprovedForAll(account, contracts.mine)
            console.log(isApproved)
            if (!isApproved) {
                // approve to mine
                dispatch(asyncSetLoading(true, "质押NFT", "正在获取授权"))
                const res = await setApprovalForAll(contracts.mine, true)
                console.log(res)
                if (!res.success) {
                    console.log('获取授权失败...')
                    dispatch(asyncSetLoading(false, "质押NFT",  "", 0, "质押NFT失败"))
                    return
                }
            }
            dispatch(asyncSetLoading(true, "质押NFT", "正在质押NFT"))
            console.log(selectedIDs, account)
            const resp = await staking(account, selectedIDs)
            if (resp.success) {
                dispatch(asyncSetLoading(false, "质押NFT", "", 0, "", "质押NFT成功"))
                const stakedIDSet = new Set(selectedIDs)
                var nfts = JSON.parse(JSON.stringify(nftInfos))
                nfts = nfts.map(nft => {
                    if (stakedIDSet.has(nft.token_id)) {
                        nft.status = 2
                    }
                    return nft
                })
                dispatch(asyncSetNftInfos(nfts))
                dispatch(asyncSetSelectedIDs([]))
                console.log(resp)
            } else {
                dispatch(asyncSetLoading(false, "质押NFT",  "", 0, "质押NFT失败"))
            }
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "质押NFT",  "", 0, "质押NFT失败"))
        }
    }

    const handleUnStakeAllAndGain = async () => {
        if (stkIDs.length === 0) {
            toast.error("当前没有质押的NFT")
            return
        }
        dispatch(asyncSetLoading(true, "解除质押NFT", "正在解除质押NFT"))
        try {
            // TODO: more to stake
            console.log(stkIDs)
            const resp = await rescue(stkIDs)
            return
            if (resp.success) {
                dispatch(asyncSetLoading(false, "解除质押NFT", "", 0, "", "解除质押NFT成功"))
                const stakedIDSet = new Set(stkIDs)
                var nfts = JSON.parse(JSON.stringify(nftInfos))
                nfts = nfts.map(nft => {
                    if (stakedIDSet.has(nft.token_id)) {
                        nft.status = 1
                    }
                    return nft
                })
                dispatch(asyncSetNftInfos(nfts))
                dispatch(asyncSetSelectedIDs([]))
            } else {
                dispatch(asyncSetLoading(false, "解除质押NFT",  "", 0, "解除质押NFT失败"))
            }
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "解除质押NFT",  "", 0, "解除质押NFT失败"))
        }
    }

    useEffect(() => {
        if (nftInfos.length > 0 ) {
            const selectedNFT = nftInfos.filter(nft => nft.token_id === selectedIDs[0])
            const quality = selectedNFT.length > 0 ?  selectedNFT[0].quality : 1
            setSelectedType(quality)
            const nftids = nftInfos.filter(nft => nft.status === 1 && nft.quality === quality).map(nftInfo => nftInfo.token_id)
            console.log(nftids)
            setNftIDs(nftids)
            const stkids = nftInfos.filter(nft => nft.status === 2).map(nftInfo => nftInfo.token_id)
            console.log(stkids)
            setStkIDs(stkids)
        } else {
            setSelectedType(1)
            setNftIDs(nftInfos.filter(nft => nft.status === 1 && nft.quality === 1).map(nftInfo => nftInfo.token_id))
            setStkIDs(nftInfos.filter(nft => nft.status === 2).map(nftInfo => nftInfo.token_id))
        }
    }, [nftInfos])
    

    const handleStakeRecordClick = () => {
        navigate('/mynft/list', {
            state: {
                status: 2,
                type: 0
            }
        })
    }

    const handleSignClick = () => {
        if(homeInfo.isSigned) {
            return
        }
        navigate('/sign')
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box>
                <CardMedia 
                    component={'img'}
                    sx={{
                        display: 'inline-block',
                        objectFit: 'cover',
                        height: 200,
                        width: 200,
                    }}
                    image={NFTImages[selectedType - 1]} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3, width: '100%' }}>
                <Box component={'label'} forid="staking-type-select" sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>NFT类型</Box>
                <BootstrapSelect
                    id="staking-type-select"
                    select
                    value={selectedType}
                    onChange={handleTypeChange}
                    fullWidth
                    >
                    {nftTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value} sx={{ display: 'flex', flexDirection: 'row',}}>
                            <CardMedia component="img" image={NFTImages[type.value - 1]} sx={{ width: 25, height: 25 }}/>
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {type.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapSelect>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3, width: '100%' }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>NFT编号:</Box>
                <MultipleSelection nftIDs={nftIDs} onNFTSelected={onNFTSelected} />
            </Box>
            <Typography component={'div'} sx={{ color: '#333', alignSelf: 'flex-start', mt: 2, fontSize: '14px', fontWeight: 600}}>已选择编号:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignSelf: 'flex-start', gap: 0.5, px: 1, mt: 2 }}>
              {selectedIDs.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3, width: '100%' }}>
                <Box component={'label'} sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>每日产出:</Box>
                <Box sx={{ lineHeight: '48px', backgroundColor: '#F5F5F7', width: '100%', borderRadius: '12px', color: '#333', fontSize: '14px', textAlign: 'left', px: 2, boxSizing: 'border-box'}}>12 VSD</Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.8, justifyContent: 'space-between', alignItems: 'center', mt: 2, py: 1, width: '100%' }}>
                <Box sx={{flex: 1, backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', fontSize: '16px', fontWeight: 600, cursor: 'pointer'}} onClick={handleStakeClick}>质押</Box>
                <Box sx={{flex: 1, backgroundColor: '#ECF0FF', borderRadius: '12px', lineHeight: '44px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', color: '#4263EB'}} onClick={handleStakeRecordClick}>质押记录</Box>
            </Box>
            <Box sx={{ mt: 2, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ fontSize: '12px', color: '#7E8186' }}>我已质押的NFT数量</Box>
                            <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5 }}>{stkIDs.length}</Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ fontSize: '12px', color: '#7E8186' }}>我的所有待提取收益</Box>
                            <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5 }}>1522.32 VSD</Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2, gap: 1}}>
                        <Box sx={{ flex: 1, fontSize: '12px', color: '#fff', backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', fontWeight: 600, cursor: 'pointer'}}
                            onClick={handleUnStakeAllAndGain}>
                            解除质押并提取收益
                        </Box>
                        <Box sx={{ flex: 1, fontSize: '12px', color: '#4263EB', backgroundColor: '#ECF0FF', borderRadius: '12px', lineHeight: '44px', fontWeight: 600, cursor: 'pointer'}}>
                            只提取收益
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1.5, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500 }}>规则：</Box>
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500, pt: 0.5 }}>① 申请提取收益三天后到账</Box>
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500, pt: 0.5 }}> ② 需要每日登录签到，否则当日无收益。</Box>
                    <Box sx={{ fontSize: '12px', color: '#4263EB', textAlign: 'left', pt: 1, cursor: 'pointer'}} onClick={handleSignClick}>{homeInfo.isSigned ? '已签到' :'您今日还未签到，去签到->'}</Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1.5, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', px: 2, py: 2 }} >
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500 }}>其他信息:</Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>我的提取收益</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234.12 VSD+1234.12 SVSD</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>我的历史已提取收益</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234.12 VSD+1234.12 SVSD</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>所有用户已质押铜数量</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>所有用户已质押银数量</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>所有用户已质押金数量</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pt: 1, width: '100%' }}>
                        <Box sx={{ fontSize: '12px', color: '#7E8186', fontWeight: 500 }}>所有用户已质押钻数量</Box>
                        <Box sx={{ fontSize: '12px', color: '#333', fontWeight: 500 }}>1234</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default NFTStake