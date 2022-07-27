import { Box, Button, Card, CardMedia, Chip, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import MultipleSelection from "./MultipleSelection"
import BootstrapTextField from '../../../widgets/textfield/BootstrapTextField'
import NFTCardImage from "../../../assets/images/mynft/nftcard.png"
import NFTImage from "../../../assets/images/nftlist/nft.png"



const nftTypes = [
    { label: '铜', value: 1 },
    { label: '银', value: 2 },
    { label: '金', value: 3 },
    { label: '钻', value: 4 }
]

const nftIDs = [
    1100,
    1101,
    1102,
    1103,
    1104,
    11005,
    1106,
    11052,
    11051,
    11009,
];

const NFTStake = () => {

    const [selectedType, setSelectedType] = useState(1)
    const [selectedIDs, setSelectedIDs] = useState([])
    const navigate = useNavigate()
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value)
    }

    const onNFTSelected = (selectedNFTIDs) => {
        setSelectedIDs(selectedNFTIDs)
    }

    const handleStakeClick = () => {
        // TODO: stake selected nfts
    }

    const handleStakeRecordClick = () => {
        navigate('/mynft/list', {
            state: {
                status: 2,
                type: 0
            }
        })
    }

    const handleSignClick = () => {
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
                        height: 240,
                        width: 240,
                    }}
                    image={NFTCardImage} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.8, pt: 3, width: '100%' }}>
                <Box component={'label'} forid="staking-type-select" sx={{fontSize: '14px', fontWeight: 600, color: '#333'}}>NFT类型</Box>
                <BootstrapTextField
                    id="staking-type-select"
                    select
                    value={selectedType}
                    onChange={handleTypeChange}
                    fullWidth
                    >
                    {nftTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value} sx={{ display: 'flex', flexDirection: 'row',}}>
                            <CardMedia component="img" image={NFTImage} sx={{ width: 25, height: 25 }}/>
                            <Typography component={'span'} sx={{ color: '#333', fontSize: '14px', ml: 0.5}}>
                                {type.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </BootstrapTextField>
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
                            <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5 }}>1522</Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ fontSize: '12px', color: '#7E8186' }}>我的所有待提取收益</Box>
                            <Box sx={{ fontSize: '16px', color: '#333', fontWeight: 700, mt: 0.5 }}>1522.32 VSD</Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 2, gap: 1}}>
                        <Box sx={{ flex: 1, fontSize: '12px', color: '#fff', backgroundColor: '#4263EB', borderRadius: '12px', lineHeight: '44px', fontWeight: 600, cursor: 'pointer'}}>
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
                    <Box sx={{ fontSize: '12px', color: '#4263EB', textAlign: 'left', pt: 1, cursor: 'pointer'}} onClick={handleSignClick}>{'您今日还未签到，去签到->'}</Box>
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