import { Avatar, Box, Card, Typography } from "@mui/material"

const MyAssetsPage = () => {
    return (
        <Box sx={{ px: 2, backgroundColor: '#eee', minHeight: 'calc(100vh - 56px)' }}>
            <Box  sx={{ pt: 2 }}>
                <Card>
                    <Box>
                        <Avatar />
                        <Box>
                            <Typography sx={{ color: 'InfoText' }}>总资产</Typography>
                            <Typography sx={{ color: 'InfoText' }}>$2340 USD</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}

export default MyAssetsPage