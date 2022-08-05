import { Box, Card, CardMedia, Grid, InputBase, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon} from '../../assets/icon/market/search.svg';
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"

import TypeSelect from "../mynftlist/components/TypeSelect";
import AlphaSelect from "./components/AlphaSelect";
import { getBalance } from "../../clients/socialNFT";
import { apiPostGetNFTInfosByIDs } from "../../http/api.js"
import { getListItems } from "../../clients/list";
import { contracts } from "../../clients/contracts";
import { ethers } from "ethers";
import InfiniteScroll from "react-infinite-scroll-component";


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

const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]


const MarketPage = () => {
    const [quality, setQuality] = useState(0)
    const [alpha, setAlpha] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [filteredNFTs, setFilteredNFTs] = useState([])
    const [typeOpen, setTypeOpen] = useState(false)
    const [alphaOpen, setAlphaOpen] = useState(false)
    const [nftInfos, setNftInfos] = useState([])
    const navigate = useNavigate()
    const [pageNum, setPageNum] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 8
    const [totalAmount, setTotalAmount] = useState(0)
    const handleTypeChange = (type) => {
        console.log(type)
        setTypeOpen(false)
    }

    const handleAlphaChange = (alpha) => {
        setAlpha(alpha)
        setAlphaOpen(false)
    }

    const handleSearchBtnClick = (e) => {
        if (e.keyCode !== 13) {
            return
        }
        if (keyword) {
            // TODO:search for the keyword
            console.log(keyword)
            if (quality === 0) {
                setFilteredNFTs(_ => nftInfos.filter(nftInfo => nftInfo.token_id.toString().indexOf(keyword) !== -1))
            } else {
                setFilteredNFTs(_ => nftInfos
                    .filter(nftInfo => nftInfo.token_id.toString().indexOf(keyword) !== -1)
                    .filter(nftInfo => nftInfo.type === quality))
            }
        } else {
            if (quality === 0) {
                setFilteredNFTs(nftInfos)
            } else {
                setFilteredNFTs(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === quality))
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

    const reLoadData = () => {
        initialInfos(quality, alpha, 1)  
    }
    const handLoadMore = () => {
        initialInfos(quality, alpha, pageNum + 1)    
    }
    
    const initialInfos = async (quality, alpha, currentPage) => {
        // get totalAmount of nft listed
        const amount = await getBalance(contracts.list)
        setTotalAmount(amount)
        // get items of first page
        const items = await getListItems((currentPage - 1)*pageSize, pageSize)
        if (items.length < pageSize) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
        if (items.length > 0) {
            setPageNum(currentPage)
            console.log(items)
            console.log(currentPage)
        } else {
            return;
        }
        var itemInfos = items.map(item => {
            return {
                id: item.tokenId.toNumber(),
                price: ethers.utils.formatEther(item.listItem.price),
                status: item.listItem.listStatu === 1,
                owner: item.listItem.owner,
                buyer: item.listItem.buyer
            }
        })
        // get infos from the back end
        const resp = await apiPostGetNFTInfosByIDs(items.map(item => item.tokenId.toNumber()))
        if (resp.code !== 200) {
            setNftInfos([])
            setFilteredNFTs([])
            return
        }
        if (!resp.result || resp.result.length <= 0) {
            setNftInfos([])
            setFilteredNFTs([])
            return
        }
        var nfts = []
        if (currentPage > 1) {
            nfts = nftInfos
        }
        for (let index = 0; index < itemInfos.length; index++) {
            const itemInfo = itemInfos[index];
            const res = resp.result.find(r => r.token_id === itemInfo.id)
            if (res) {
                nfts.push({
                    ...itemInfo,
                    ...res
                })
            }
        }
        if (quality !== 0) {
            nfts = nfts.filter(nftInfo => nftInfo.quality === quality)
        }
        if (alpha === 1) {
            // 1: 1-60 2: 61-90 3: 91-100
            nfts = nfts.filter(nftInfo => nftInfo.alpha >= 1 && nftInfo.alpha <= 60)
        }
        if (alpha === 2) {
            nfts = nfts.filter(nftInfo => nftInfo.alpha >= 61 && nftInfo.alpha <= 90)
        }
        if (alpha === 3) {
            nfts = nfts.filter(nftInfo => nftInfo.alpha >= 91 && nftInfo.alpha <= 90)
        }
        // load more 
        while (itemInfos.length === pageSize && nfts.length < pageSize) {
            console.log(currentPage)
            const items = await getListItems(currentPage*pageSize, pageSize)
            if (items.length < pageSize) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            if (items.length > 0) {
                console.log(currentPage, items)
                currentPage += 1
                setPageNum(currentPage + 1)
            }
            itemInfos = items.map(item => {
                return {
                    id: item.tokenId.toNumber(),
                    price: ethers.utils.formatEther(item.listItem.price),
                    status: item.listItem.listStatu === 1,
                    owner: item.listItem.owner,
                    buyer: item.listItem.buyer
                }
            })
            // get infos from the back end
            const resp = await apiPostGetNFTInfosByIDs(items.map(item => item.tokenId.toNumber()))
            if (resp.code !== 200) {
                setNftInfos([])
                setFilteredNFTs([])
                return
            }
            if (!resp.result || resp.result.length <= 0) {
                setNftInfos([])
                setFilteredNFTs([])
                return
            }
            for (let index = 0; index < itemInfos.length; index++) {
                const itemInfo = itemInfos[index];
                const res = resp.result.find(r => r.token_id === itemInfo.id)
                if (res) {
                    nfts.push({
                        ...itemInfo,
                        ...res
                    })
                }
            }
            if (quality !== 0) {
                nfts = nfts.filter(nftInfo => nftInfo.quality === quality)
            }
            if (alpha === 1) {
                // 1: 1-60 2: 61-90 3: 91-100
                nfts = nfts.filter(nftInfo => nftInfo.alpha >= 1 && nftInfo.alpha <= 60)
            }
            if (alpha === 2) {
                nfts = nfts.filter(nftInfo => nftInfo.alpha >= 61 && nftInfo.alpha <= 90)
            }
            if (alpha === 3) {
                nfts = nfts.filter(nftInfo => nftInfo.alpha >= 91 && nftInfo.alpha <= 90)
            }
        }
        console.log(nfts)
        setNftInfos(nfts)
        setFilteredNFTs(nfts)
    }

    useEffect(() => {
        initialInfos(quality, alpha, pageNum)
    }, [quality, alpha, pageNum])
    
    return (
        <Box sx={{ backgroundColor: '#FFF', height: 'calc(100vh - 56px)' }}>
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
                        type={quality} setType={setQuality} 
                        types={types} onTypeChange={handleTypeChange}
                        onSelectClick={handleTypeSelectClick} />
                </Box>
                <Box sx={{flex:1, display: 'flex', flexDirection: 'row' }}>
                    <AlphaSelect 
                        title={'稀有度:'}
                        open={alphaOpen}
                        alpha={alpha} setAlpha={setAlpha} 
                        alphaes={alphaes} onAlphaChange={handleAlphaChange}
                        onSelectClick={handleAlphaSelectClick}  />
                </Box>
            </Box>
            <InfiniteScroll
                dataLength={nftInfos.length} 
                next={handLoadMore}
                hasMore={hasMore}
                refreshFunction={reLoadData}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}>
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
                                {/* TODO: no time now */}
                                {/* <Box sx={{ position: 'absolute', right: '10px', top: '10px', borderRadius: '12px', border: '1px solid #F2F2F5', py: 0.5, px: 1, fontSize: '12px', color: '#7E8186'}}>{nftinfo.time}</Box> */}
                                <Box sx={{ 
                                    height: {xs: 170, sm: 180},
                                    width: {xs: 170, sm:180},
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <CardMedia 
                                        component={'img'}
                                        sx={{
                                            display: 'inline-block',
                                            objectFit: 'cover',
                                            height: 120,
                                            width: 120,
                                        }}
                                        // TODO: nft image??
                                        // image={nftinfo.image } />
                                        image={NFTImages[nftinfo.quality - 1] } />
                                </Box>
                                <Typography sx={{ px: 1.8, color: '#333', fontSize: '16px', fontWeight: 700, lineHeight: '20px' }} >NFT#{nftinfo.token_id}</Typography>
                                <Typography sx={{ px: 1.8, color: '#8C8C8C', fontSize: '12px', fontWeight: 400, lineHeight: '18px' }} >价格</Typography>
                                <Typography sx={{ px: 1.8, color: '#333', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }} >{nftinfo.price} USDT</Typography>
                            </Card>
                        </Grid>
                        ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    )
}

export default MarketPage