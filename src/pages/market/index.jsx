import { Box, Card, CardMedia, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';


const alphas = [
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
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 2234,
        price: 0.03,
        type: 1,
        title: '铜'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 2,
        title: '银'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 3,
        title: '金'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻'
    },{
        image: 'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500',
        id: 1234,
        price: 0.03,
        type: 4,
        title: '钻'
    },
]


const MarketPage = () => {
    const [type, setType] = useState(0)
    const [alpha, setAlpha] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [filteredNFTs, setFilteredNFTs] = useState(nftInfos)
    const handleTypeChange = (e) => {
        setType(e.target.value)
        if (e.target.value === 0) {
            setFilteredNFTs(nftInfos)
        } else {
            setFilteredNFTs(_ => nftInfos.filter(nftInfo => nftInfo.type === e.target.value))
        }
    }

    const handleAlphaChange = (e) => {
        setAlpha(e.target.value)
        if (e.target.value === 0) {
            // TODO: 稀有度规则
        } else {

        }
    }

    const handleSearchBtnClick = () => {
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

    return  <Box sx={{ backgroundColor: '#eee', minHeight: '100vh', px: 3, pb: 5}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="inherit">类型:</Typography>
                        <Select
                            value={type}
                            onChange={handleTypeChange}
                            >
                            {types.map(type => {
                                return <MenuItem key={type.value} value={type.value} sx={{ color: '#333' }}>{ type.label }</MenuItem>
                            })}
                        </Select>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="inherit">稀有度:</Typography>
                        <Select
                            value={alpha}
                            onChange={handleAlphaChange}
                            >
                            {alphas.map(alpha => {
                                return <MenuItem key={alpha.value} value={alpha.value} sx={{ color: '#333' }}>{ alpha.label }</MenuItem>
                            })}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', mt: 2 }}>
                    <TextField
                        placeholder="搜索NFT"
                        value={keyword}
                        onChange={onKeywordChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearchBtnClick}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}/>
                </Box>
                <Grid container columns={12} sx={{ mt: 4 }}>
                {filteredNFTs.map((nftinfo, index) => (
                    <Grid item xs={6} key={index} 
                        sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', width: 150}}>
                        <Card sx={{
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180,
                            width: 150,
                            }}>
                            <CardMedia 
                                component={'img'}
                                sx={{
                                    display: 'inline-block',
                                    objectFit: 'cover',
                                    height: 180,
                                    width: 150,
                                }}
                                image={nftinfo.image } />
                        </Card>
                        <Box sx={{ alignSelf: 'flex-start', px: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Box>
                                <Typography variant={'subtitle2'} color='InfoText' sx={{textAlign: 'left'}}>#{nftinfo.id}</Typography>
                                <Typography variant={'subtitle2'} color='InfoText' sx={{textAlign: 'left'}}>{nftinfo.price} BNB</Typography>
                            </Box>
                            <Box>
                                <Typography variant={'subtitle2'} color='InfoText' sx={{ pr: 2 }} >{nftinfo.title}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                </Grid>
        </Box>
}

export default MarketPage