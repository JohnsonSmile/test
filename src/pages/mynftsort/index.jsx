const { Box, Card, Button, Typography, Divider } = require("@mui/material")


const nftInfos = [
    {
        id: 1235,
        status: 1, // 1 闲置 2 质押中 3 出售中
        type: 1,
    }, {
        id: 1236,
        status: 2, // 1 闲置 2 质押中 3 出售中
        type: 1,
    }, {
        id: 1238,
        status: 3, // 1 闲置 2 质押中 3 出售中
        type: 1,
    }, {
        id: 1239,
        status: 1, // 1 闲置 2 质押中 3 出售中
        type: 1,
    }
]


const MyNFTSortPage = () => {
    return (
        <Box sx={{display: 'flex', flexDirection:' column', gap: 3, py: 3, backgroundColor: '#eee'}}>
            {nftInfos.map(nftinfo => {
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
                                    <Button variant="contained">去质押</Button>
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
    )
}

export default MyNFTSortPage