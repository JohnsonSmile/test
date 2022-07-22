import { Box } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PromotionCard from "./components/PromotionCard"
import PromotionRecordCard from "./components/PromotionRecordCard"

const PromotionDetailPage = () => {
    const [promtionInfo, setPromtionInfo] = useState({
        yesterdayGain: 736,
        totalGain: 2736,
        promotionCount: 25,
        leagueCount: 1230
    })
    const [promotionGainRecord, setPromotionGainRecord] = useState({
        firstLevelGain: 124.122,
        secondLevelGain: 89.99,
        leagueGain: 1200,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm")
    })
    const navigate = useNavigate()
    const handlePromotionClick = () => {
        navigate('/invite')
    }
    return (
        <Box sx={{ px: 2, backgroundColor: '#FFF', minHeight: 'calc(100vh - 56px)', mb: 4 }}>
            <Box sx={{pt: 1}}>
                <PromotionCard promtionInfo={promtionInfo} onPromotionClick={handlePromotionClick} />
            </Box>
            <PromotionRecordCard promotionGainRecord={promotionGainRecord} />
        </Box>
    )
}

export default PromotionDetailPage