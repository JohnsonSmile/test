import { Box, Divider, Typography } from "@mui/material"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ReorderIcon from '@mui/icons-material/Reorder';
import Marquee from "react-fast-marquee";

const NotificationBar = () => {
    return (
        <>
            <Box sx={{
                    px: 4,
                    py: 1,
                    display: 'flex',
                }}>
                <VolumeUpIcon />
                <Marquee gradientWidth={100} pauseOnHover={true} pauseOnClick={true} style={{margin: "0 5px"}}>
                    {/* TODO: get more from backend */}
                    <Typography variant={'body1'} color='InfoText' sx={{ml: 1}}>AAA社区百万价值空头活动，现已开启</Typography>
                </Marquee>
                <ReorderIcon />
            </Box>
            <Divider sx={{mx: 4, mt: 1}} />
        </>
    )
}

export default NotificationBar