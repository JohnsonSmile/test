import { Box, Typography } from "@mui/material"
import { ReactComponent as WaveImg } from "../../../assets/images/profile/wave.svg"

const AssetsCard = (props) => {
    const { assetsDetail } = props;
    return (
        <Box sx={{ width: '100%', position: 'relative'}}>
                <WaveImg />
                <Typography sx={{ position: 'absolute', top: 0, width: '100%', mt: 2 }}>总资产</Typography>
                <Box sx={{ position: 'absolute', top: 0, width: '100%', mt: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                    <Typography sx={{ fontSize: 28, fontWeight: 800 }}>${assetsDetail.totalAssets}</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, mt: '3px' }}>USD</Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, width: '100%', px: 3, py: 3, boxSizing: 'border-box', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', gap: 1}}>
                            <Typography sx={{ fontSize: 14, width: 50, textAlign: 'left' }}>USDT</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{assetsDetail.usdt}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', gap: 1}}>
                            <Typography sx={{ fontSize: 14, width: 50, textAlign: 'left' }}>VSD</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{assetsDetail.vsd}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', gap: 1}}>
                            <Typography sx={{ fontSize: 14, width: 50, textAlign: 'left' }}>NFT</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{assetsDetail.nft}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', gap: 1}}>
                            <Typography sx={{ fontSize: 14, width: 50, textAlign: 'left'}}>VALUE</Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 800 }}>{assetsDetail.value}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
    )
}

export default AssetsCard