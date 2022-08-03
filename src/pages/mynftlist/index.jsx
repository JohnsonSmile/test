import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import StatusSelect from "./components/StatusSelect"
import TypeSelect from "./components/TypeSelect"
import { Box, Card, Typography, Divider, CardMedia } from "@mui/material"
import DiamondNFTImage from "../../assets/images/mynft/diamond_nft.png"
import GoldNFTImage from "../../assets/images/mynft/gold_nft.png"
import SilverNFTImage from "../../assets/images/mynft/silver_nft.png"
import CopperNFTImage from "../../assets/images/mynft/copper_nft.png"
import { getUserStakedTokenIDsByPage, stakeNFT } from "../../clients/socialNFT"
import { apiPostGetNFTInfosByIDs } from "../../http/api"
import { useWeb3React } from "@web3-react/core"
import { getUserListItems, getUserListItemsNum, unlist } from "../../clients/list"
import { useDispatch } from "react-redux"
import { asyncSetLoading } from "../../redux/reducers/status"


const NFTImages = [CopperNFTImage, SilverNFTImage, GoldNFTImage, DiamondNFTImage]
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

const statuses = [
    {
        label: '全部', 
        value: 0,
    },{
        label: '闲置', 
        value: 1,
    },{
        label: '质押中', 
        value: 2,
    },{
        label: '出售中', 
        value: 3,
    }
]


const MyNFTListPage = () => {

    const navigate = useNavigate()
    const [fillteredNFTInfos, setFillteredNFTInfos] = useState([])
    const [type, setType] = useState(0)
    const [status, setStatus] = useState(0)
    const [typeOpen, setTypeOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const { account } = useWeb3React()
    const [nftInfos, setNftInfos] = useState([])
    const [freeNftInfos, setFreeNftInfos] = useState([])
    const location = useLocation()
    const dispatch = useDispatch()
    const handleStakeClick = (nftInfo) => {
        navigate('/stake', {
            state: {
                nftInfo,
                nftInfos: freeNftInfos
            }
        })
    }
    const handleUnstakeClick = async (nftInfo) => {
        dispatch(asyncSetLoading(true, "解除质押NFT", "正在解除质押NFT"))
        try {
            console.log(nftInfo)
            // TODO: more to stake
            const resp = await stakeNFT(nftInfo.token_id, false)
            if (resp.success) {
                dispatch(asyncSetLoading(false, "解除质押NFT", "", 0, "", "解除质押NFT成功"))
                console.log(resp.tokenId.toNumber())
                setFreeNftInfos(prev => [...prev, nftInfo ])
                setNftInfos(prev => {
                    prev.map(p => {
                        if (p.token_id === nftInfo.token_id) {
                            p.status = 1
                        }
                        return p
                    })
                    return prev
                })
                setFillteredNFTInfos(prev => {
                    prev.map(p => {
                        if (p.token_id === nftInfo.token_id) {
                            p.status = 1
                        }
                        return p
                    })
                    return prev
                })
            } else {
                dispatch(asyncSetLoading(false, "解除质押NFT",  "", 0, "解除质押NFT失败"))
            }
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "解除质押NFT",  "", 0, "解除质押NFT失败"))
        }
    }

    const handleListClick = (nftInfo) => {
        navigate('/nft/listing')
    }

    const handleDisListClick = async (nftInfo) => {
        dispatch(asyncSetLoading(true, "解除出售NFT", "正在解除出售NFT"))
        try {
            console.log(nftInfo)
            // TODO: more to stake
            const resp = await unlist(nftInfo.token_id)
            if (resp.success) {
                dispatch(asyncSetLoading(false, "解除出售NFT", "", 0, "", "解除出售NFT成功"))
                console.log(resp.tokenId.toNumber())
                setFreeNftInfos(prev => [...prev, nftInfo ])
                setNftInfos(prev => {
                    prev.map(p => {
                        if (p.token_id === nftInfo.token_id) {
                            p.status = 1
                        }
                        return p
                    })
                    return prev
                })
                setFillteredNFTInfos(prev => {
                    prev.map(p => {
                        if (p.token_id === nftInfo.token_id) {
                            p.status = 1
                        }
                        return p
                    })
                    return prev
                })
            } else {
                dispatch(asyncSetLoading(false, "解除出售NFT",  "", 0, "解除出售NFT失败"))
            }
        } catch (e) {
            console.log(e)
            dispatch(asyncSetLoading(false, "解除出售NFT",  "", 0, "解除出售NFT失败"))
        }
    }

    const handleTypeChange = (type) => {
        console.log(type)
        setTypeOpen(false)
        setType(type)
        if (type === 0) {
            if (status === 0) {
                setFillteredNFTInfos(nftInfos)
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.status === status))
            }
        } else {
            if (status === 0) {
                setFillteredNFTInfos(_ => nftInfos.filter(nftInfo => nftInfo.quality === type))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.quality === type)
                    .filter(nftInfo => nftInfo.status === status))
            }
        }
    }

    const handleStatusChange = (value) => {
        console.log(value)
        setStatusOpen(false)
        setStatus(value)
        if (value === 0) {
            if (type === 0) {
                setFillteredNFTInfos(nftInfos)
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.quality === type))
            }
        } else {
            if (type === 0) {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.status === value))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.quality === type)
                    .filter(nftInfo => nftInfo.status === value))
            }
        }
    }

    const handleTypeSelectClick = () => {
        setTypeOpen(prev => {
            // set value open false
            setStatusOpen(false)
            return !prev
        })
    }

    const handleStatusSelectClick = () => {
        setStatusOpen(prev => {
            // set type open false
            setTypeOpen(false)
            return !prev
        })
    }


    const initialInfos = async (status, type) => {
        // get all nfts not listed with type
        // 闲置的和 staking的
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

        // get free
        const freeNFTs = resp.filter(nft => {
            return !nft.staking
        })
        console.log(freeNFTs)
        const freeIDs = freeNFTs.length > 0 ? freeNFTs.map(nft => nft.tokenId.toNumber()) : []
        console.log(freeIDs)

        // get nft infos from backend
        const freeNFTResp = freeNFTs.length > 0 ?  await apiPostGetNFTInfosByIDs(freeIDs) : []
        console.log(freeNFTResp)



        // get staked nfts
        const stakedNFTs = resp.filter(nft => {
            return nft.staking
        })
        console.log(stakedNFTs)
        const stakedIDs = stakedNFTs.length > 0 ? stakedNFTs.map(nft => nft.tokenId.toNumber()) : []
        console.log(stakedIDs)

        // get nft infos from backend
        const stakedNFTResp = stakedNFTs.length > 0 ?  await apiPostGetNFTInfosByIDs(stakedIDs) : []
        console.log(stakedNFTResp)

        // listed nft info
        const amount = await getUserListItemsNum(account)
        index = 0
        resp = []
        res = await getUserListItems(account, index, pageSize)
        resp.push(...res)
        while (resp.length === amount) {
            index = pageSize * (index + 1)
            res = await getUserListItemsNum(account, index, pageSize)
            resp.push(...res)
        }
        console.log(resp)
        const tokenIDS = resp.length > 0 ? resp.map(nft => nft.tokenId.toNumber()) : []
        console.log(tokenIDS)

        // get nft infos from backend
        const onSaleNFTResp = resp.length > 0 ? await apiPostGetNFTInfosByIDs(tokenIDS) : []
        console.log(onSaleNFTResp)

        // all infos
        var nftInfos = []

        // 1 闲置 2 质押中 3 出售中
        if (freeNFTResp.code === 200 && freeNFTResp.result && freeNFTResp.result.length > 0) {
            setFreeNftInfos(freeNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 1
                }
            }))
            nftInfos.push(...(freeNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 1
                }
            })))
        }
        if (stakedNFTResp.code === 200 && stakedNFTResp.result && stakedNFTResp.result.length > 0) {
            nftInfos.push(...(stakedNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 2
                }
            })))
        }
        if (onSaleNFTResp.code === 200 && onSaleNFTResp.result && onSaleNFTResp.result.length > 0) {
            nftInfos.push(...(onSaleNFTResp.result.map(nft => {
                return {
                    ...nft,
                    status: 3
                }
            })))
        }
        // 排序
        nftInfos = nftInfos.sort((a, b) => a.id < b.id)
        console.log(nftInfos)
        setNftInfos(nftInfos)
        if (status !== 0) {
            nftInfos = nftInfos.filter(nftInfo => nftInfo.status === status)
        }
        if (type !== 0) {
            nftInfos = nftInfos.filter(nftInfo => nftInfo.quality === type)
        }
        console.log(nftInfos, type, status)
        setFillteredNFTInfos(nftInfos)
    }

    useEffect(() => {
        if (location && location.state 
            && status === 0 && type === 0
            && (location.state.status !== 0 || location.state.type !== 0) ) {
            console.log(location.state)
            setStatus(location.state.status)
            setType(location.state.type)
            if (account) {
                initialInfos(location.state.status, location.state.type)
            }
        } else {

            if (account) {
                initialInfos(0, 0)
            }
        }
    }, [account, location])
    

    return (
        <Box sx={{ backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', py: 3, borderTop: '1px solid #F2F2F5',}}>
                <Box sx={{flex:1, display: 'flex', flexDirection: 'row',}}>
                    <TypeSelect 
                        title={'NFT类型'}
                        open={typeOpen}
                        type={type} setType={setType} 
                        types={types} onTypeChange={handleTypeChange}
                        onSelectClick={handleTypeSelectClick} />
                </Box>
                <Divider orientation={"vertical"}/>
                <Box sx={{flex:1, display: 'flex', flexDirection: 'row'}}>
                    <StatusSelect 
                        title={'状态:'}
                        open={statusOpen}
                        status={status} setStatus={setStatus} 
                        statuses={statuses} onStatusChange={handleStatusChange}
                        onSelectClick={handleStatusSelectClick}  />
                </Box>
            </Box>
            {(!fillteredNFTInfos || fillteredNFTInfos.length === 0) && <Box>Loading...</Box>}
            {fillteredNFTInfos && <Box sx={{ display: 'flex', flexDirection:' column', gap: 3, px: 2}}>
                {fillteredNFTInfos.map(nftinfo => {
                    return (
                        <Card key={nftinfo.id} sx={{ border: '1px solid #F2F2F2', borderRadius: '20px', boxShadow: '0px 10px 50px rgba(242, 242, 242, 0.6)'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', py: 2}}>
                                <Box sx={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <CardMedia component={"img"} src={NFTImages[nftinfo.quality - 1]} sx={{ width: '30px', height: '30px', mr: 0.5 }} />
                                    <Typography variant="inherit" sx={{fontSize: '16px', fontWeight: 700 }}>
                                        {nftinfo.quality === 1 && '铜#'+ nftinfo.token_id}
                                        {nftinfo.quality === 2 && '银#'+ nftinfo.token_id}
                                        {nftinfo.quality === 3 && '金#'+ nftinfo.token_id}
                                        {nftinfo.quality === 4 && '钻#'+ nftinfo.token_id}
                                    </Typography>
                                </Box>
                                <Typography variant="inherit" sx={{flex: 1, fontSize: '14px', fontWeight: 400}}>
                                状态: {nftinfo.status === 1 && '闲置'}
                                    {nftinfo.status === 2 && '质押中'}
                                    {nftinfo.status === 3 && '出售中'}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{py: 3, px: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1}}>
                                {nftinfo.status === 1 && <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}} onClick={ () => { handleStakeClick(nftinfo) }}>去质押</Box>
                                        <Box sx={{ flex: 1, background: '#ECF0FF', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#4263EB', cursor: 'pointer'}} onClick={ () => { handleListClick(nftinfo) }}>去出售</Box>
                                    </Box>}
                                {nftinfo.status === 2 && <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}} onClick={ () => { handleUnstakeClick(nftinfo) }}>解除质押</Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>}
                                {nftinfo.status === 3 && <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}} onClick={ () => { handleDisListClick(nftinfo) }}>解除出售</Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>}
                            </Box>
                        </Card>
                    )
                })}
            </Box>}
        </Box>
    )
}

export default MyNFTListPage