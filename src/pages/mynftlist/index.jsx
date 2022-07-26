import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import StatusSelect from "./components/StatusSelect"
import TypeSelect from "./components/TypeSelect"
import NFTImage from "../../assets/images/nftlist/nft.png"
import { Box, Card, Typography, Divider, CardMedia } from "@mui/material"

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

// TODO: should be got from contract
const nftInfos = [
    {
        id: 1235,
        status: 1, // 1 闲置 2 质押中 3 出售中
        type: 1,
    }, {
        id: 1236,
        status: 2, // 1 闲置 2 质押中 3 出售中
        type: 2,
    }, {
        id: 1238,
        status: 3, // 1 闲置 2 质押中 3 出售中
        type: 3,
    }, {
        id: 1239,
        status: 1, // 1 闲置 2 质押中 3 出售中
        type: 3,
    }
]


const MyNFTListPage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [fillteredNFTInfos, setFillteredNFTInfos] = useState([])
    const [type, setType] = useState(0)
    const [status, setStatus] = useState(0)
    const [typeOpen, setTypeOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const handleStakeClick = () => {
        navigate('/stake', {
            state: {
                id: 1238
            }
        })
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
                setFillteredNFTInfos(_ => nftInfos.filter(nftInfo => nftInfo.type === type))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === type)
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
                    .filter(nftInfo => nftInfo.type === type))
            }
        } else {
            if (type === 0) {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.status === value))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === type)
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

    useEffect(() => {
        if (location && location.state && location.state.type) {
            setType(location.state.type)
            if (location.state.type === 0) {
                // filter status
                if (location && location.state && location.state.status) {
                    setStatus(location.state.status)
                    if (location.state.status === 0) {
                        setFillteredNFTInfos(nftInfos)
                    } else {
                        setFillteredNFTInfos(_ => {
                            return nftInfos
                            .filter(nftInfo => nftInfo.type === location.state.type)
                            .filter(nftInfo => nftInfo.status === location.state.status)
                        })
                    }
                } else {
                    setFillteredNFTInfos(nftInfos)
                }
            } else {
                setFillteredNFTInfos(_ => {
                    return nftInfos.filter(nftInfo => nftInfo.type === location.state.type)
                })
            }
        } else {
            // TODO: should get from contracts
            setFillteredNFTInfos(nftInfos)
        }

    }, [location])

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
            <Box sx={{ display: 'flex', flexDirection:' column', gap: 3, px: 2}}>
                {fillteredNFTInfos.map(nftinfo => {
                    return (
                        <Card key={nftinfo.id} sx={{ border: '1px solid #F2F2F2', borderRadius: '20px', boxShadow: '0px 10px 50px rgba(242, 242, 242, 0.6)'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', py: 2}}>
                                <Box sx={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <CardMedia component={"img"} src={NFTImage} sx={{ width: '35px', height: '35px' }} />
                                    <Typography variant="inherit" sx={{fontSize: '16px', fontWeight: 700 }}>
                                        {nftinfo.type === 1 && '铜#'+ nftinfo.id}
                                        {nftinfo.type === 2 && '银#'+ nftinfo.id}
                                        {nftinfo.type === 3 && '金#'+ nftinfo.id}
                                        {nftinfo.type === 4 && '钻#'+ nftinfo.id}
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
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}} onClick={handleStakeClick}>去质押</Box>
                                        <Box sx={{ flex: 1, background: '#ECF0FF', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#4263EB', cursor: 'pointer'}}>去出售</Box>
                                    </Box>}
                                {nftinfo.status === 2 && <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}}>解除质押</Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>}
                                {nftinfo.status === 3 && <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                                        <Box sx={{ flex: 1, background: '#4263EB', borderRadius: '12px', height: '36px', lineHeight: '36px', color: '#FFF', cursor: 'pointer'}}>解除出售</Box>
                                        <Box sx={{ flex: 1 }}></Box>
                                    </Box>}
                            </Box>
                        </Card>
                    )
                })}
            </Box>
        </Box>
    )
}

export default MyNFTListPage