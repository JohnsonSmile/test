import { Box, Card, CardMedia, Grid, InputBase, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon} from '../../assets/icon/market/search.svg';
import NFTCardImage from "../../assets/images/mynft/nftcard.png"
import TypeSelect from "../mynftlist/components/TypeSelect";
import AlphaSelect from "./components/AlphaSelect";


const alphaes = [
    {
        label: '全部',
        value: 0
    },
    {
        label: '普通',
        value: 1
    },
    {
        label: '稀有',
        value: 2
    },
    {
        label: '史诗',
        value: 3
    },
]

const types = [
    {
        label: '全部', 
        value: 0,
    },
    {
        label: '铜', 
        value: 1,
    },
    {
        label: '银', 
        value: 2,
    },
    {
        label: '金', 
        value: 3,
    },
    {
        label: '钻', 
        value: 4,
    },
]

const nftInfos = [
    {
        image: NFTCardImage,
        id: 2234,
        price: 0.03,
        type: 1,
        title: '铜',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 2,
        title: '银',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 3,
        title: '金',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻',
        time: '11:34:22'
    },{
        image: NFTCardImage,
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻',
        time: '11:34:22'
    },
]


const MarketPage = () => {
    const [type, setType] = useState(0)
    const [alpha, setAlpha] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [filteredNFTs, setFilteredNFTs] = useState(nftInfos)
    const [typeOpen, setTypeOpen] = useState(false)
    const [alphaOpen, setAlphaOpen] = useState(false)
    const navigate = useNavigate()
    const handleTypeChange = (type) => {
        console.log(type)
        setTypeOpen(false)
        if (type === 0) {
            setFilteredNFTs(nftInfos)
        } else {
            setFilteredNFTs(_ => nftInfos.filter(nftInfo => nftInfo.type === type))
        }
    }

    const handleAlphaChange = (alpha) => {
        setAlpha(alpha)
        if (alpha === 0) {
            // TODO: 稀有度规则
        } else {

        }
    }

    const handleSearchBtnClick = (e) => {
        if (e.keyCode !== 13) {
            return
        }
        if (keyword) {
            // TODO:search for the keyword
            console.log(keyword)
            if (type === 0) {
                setFilteredNFTs(_ => nftInfos.filter(nftInfo => nftInfo.id.toString().indexOf(keyword) !== -1))
            } else {
                setFilteredNFTs(_ => nftInfos
                    .filter(nftInfo => nftInfo.id.toString().indexOf(keyword) !== -1)
                    .filter(nftInfo => nftInfo.type === type))
            }
        } else {
            if (type === 0) {
                setFilteredNFTs(nftInfos)
            } else {
                setFilteredNFTs(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === type))
            }
        }
    }

    const onKeywordChange = (e) => {
        setKeyword(e.target.value)
    }
    const handleTypeSelectClick = () => {
        setTypeOpen(prev => {
            // set value open false
            setAlphaOpen(false)
            return !prev
        })
    }

    const handleDetailClick = (nftInfo) => {
        navigate('/nft/detail', {
            state: {
                nftInfo,
            }
        })
    }

    const handleAlphaSelectClick = () => {
        setAlphaOpen(prev => {
            // set type open false
            setTypeOpen(false)
            return !prev
        })
    }
    
    return (
        <Box sx={{ backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)', pb: 5}}>
            <Box sx={{ pt: 2, px: 2 }}>
                <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: '#F2F2F5', 
                height: '44px', 
                borderRadius: '22px', px: 2, gap: 1 }}>
                <SearchIcon />
                <InputBase
                    placeholder="搜索NFT"
                    value={keyword}
                    onChange={onKeywordChange}
                    onKeyDown={handleSearchBtnClick}
                />

                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', py: 3}}>
                <Box sx={{flex:1, display: 'flex', flexDirection: 'row' }}>
                    <TypeSelect 
                        title={'NFT类型'}
                        open={typeOpen}
                        type={type} setType={setType} 
                        types={types} onTypeChange={handleTypeChange}
                        onSelectClick={handleTypeSelectClick} />
                </Box>
                <Box sx={{flex:1, display: 'flex', flexDirection: 'row' }}>
                    <AlphaSelect 
                        title={'稀有度:'}
                        open={alphaOpen}
                        alpha={alpha} setAlpha={setAlpha} 
                        alphaes={alphaes} onStatusChange={handleAlphaChange}
                        onSelectClick={handleAlphaSelectClick}  />
                </Box>
            </Box>
            <Grid container columns={12} sx={{ mt: 1 }}>
            {filteredNFTs.map((nftinfo, index) => (
                <Grid item xs={6} key={index} 
                    sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', width: 150}}>
                    <Card sx={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        height: {xs: 250,sm:260},
                        width: {xs:170,sm:180},
                        border: '1px solid #F2F2F2',
                        boxShadow: '0px 10px 50px rgba(242, 242, 242, 0.6)', 
                        borderRadius: '20px',
                        my: 1,
                        gap: 0.5,
                        position: 'relative',
                        cursor: 'pointer'
                    }} onClick={() => { handleDetailClick(nftinfo) }}>
                        <Box sx={{ position: 'absolute', right: '10px', top: '10px', borderRadius: '12px', border: '1px solid #F2F2F5', py: 0.5, px: 1, fontSize: '12px', color: '#7E8186'}}>{nftinfo.time}</Box>
                        <CardMedia 
                            component={'img'}
                            sx={{
                                display: 'inline-block',
                                objectFit: 'cover',
                                height: {xs: 170, sm: 180},
                                width: {xs: 170, sm:180},
                            }}
                            image={nftinfo.image } />
                        <Typography sx={{ px: 1.8, color: '#333', fontSize: '16px', fontWeight: 700, lineHeight: '20px' }} >NFT#{nftinfo.id}</Typography>
                        <Typography sx={{ px: 1.8, color: '#8C8C8C', fontSize: '12px', fontWeight: 400, lineHeight: '18px' }} >价格</Typography>
                        <Typography sx={{ px: 1.8, color: '#333', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }} >{nftinfo.price} BNB</Typography>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default MarketPage