import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const { Box, Card, Button, Typography, Divider, Select, MenuItem } = require("@mui/material")

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
    const handleStakeClick = () => {
        navigate('/stake', {
            state: {
                id: 1238
            }
        })
    }

    const handleTypeChange = (e) => {
        console.log(e.target.value)
        setType(e.target.value)
        if (e.target.value === 0) {
            if (status === 0) {
                setFillteredNFTInfos(nftInfos)
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.status === status))
            }
        } else {
            if (status === 0) {
                setFillteredNFTInfos(_ => nftInfos.filter(nftInfo => nftInfo.type === e.target.value))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === e.target.value)
                    .filter(nftInfo => nftInfo.status === status))
            }
        }
    }

    const handleStatusChange = (e) => {
        console.log(e.target.value)
        setStatus(e.target.value)
        if (e.target.value === 0) {
            if (type === 0) {
                setFillteredNFTInfos(nftInfos)
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === type))
            }
        } else {
            if (type === 0) {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.status === e.target.value))
            } else {
                setFillteredNFTInfos(_ => nftInfos
                    .filter(nftInfo => nftInfo.type === type)
                    .filter(nftInfo => nftInfo.status === e.target.value))
            }
        }
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
        <Box sx={{ backgroundColor: '#eee', minHeight: 'calc(100vh - 56px)'}}>
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
                <Box sx={{display: 'flex', alignItems: 'center', py: 2}}>
                    <Typography variant="inherit">状态:</Typography>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        >
                        {statuses.map(status => {
                            return <MenuItem key={status.value} value={status.value} sx={{ color: '#333' }}>{ status.label }</MenuItem>
                        })}
                    </Select>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection:' column', gap: 3, pb: 5, background: '#eee'}}>
                {fillteredNFTInfos.map(nftinfo => {
                    return (
                        <Card key={nftinfo.id}>
                            <Box sx={{display: 'flex', flexDirection: 'row', py: 2}}>
                                <Typography variant="inherit" sx={{flex: 1}}>
                                    {nftinfo.type === 1 && '铜#'+ nftinfo.id}
                                    {nftinfo.type === 2 && '银#'+ nftinfo.id}
                                    {nftinfo.type === 3 && '金#'+ nftinfo.id}
                                    {nftinfo.type === 4 && '钻#'+ nftinfo.id}
                                </Typography>
                                <Divider orientation="vertical" flexItem/>
                                <Typography variant="inherit" sx={{flex: 1}}>
                                状态: {nftinfo.status === 1 && '闲置'}
                                    {nftinfo.status === 2 && '质押中'}
                                    {nftinfo.status === 3 && '出售中'}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box sx={{py: 3, px: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1}}>
                                <Typography variant="inherit">操作:</Typography>
                                {nftinfo.status === 1 && <Box sx={{display: 'flex', gap: 2,}}>
                                        <Button variant="contained" onClick={handleStakeClick}>去质押</Button>
                                        <Button variant="outlined">去出售</Button>
                                    </Box>}
                                {nftinfo.status === 2 && <Box>
                                        <Button variant="contained">解除质押</Button>
                                    </Box>}
                                {nftinfo.status === 3 && <Box>
                                        <Button variant="contained">解除出售</Button>
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