import { Box } from "@mui/material"
import { useState } from "react"


const tabs = [{title: '24H'},{title: '1W'},{title: '1M'},{title: '1Y'}]

const ChartViewTabs = (props) => {
    const { onTabChange } = props;
    const [currentIndex, setCurrentIndex] = useState(0)
    const handleTabClick = (index) => {
        onTabChange(index)
        setCurrentIndex(index)
    }
    return (
        <Box variant={'span'} sx={{ 
            display: 'flex', 
            backgroundColor: '#EFF4F5',
            height: '25px', borderRadius: '12.5px', color: '#1FC7D4',
            fontSize: '14px', fontWeight: 700, lineHeight: '25px'}}>
            {tabs.map((tab, index) => (
                <Box onClick={() => {handleTabClick(index)}}
                    sx={{px: 1, cursor: 'pointer',
                    backgroundColor: currentIndex === index ? '#1FC7D4' :'transparent',
                    borderRadius: '12.5px', color: currentIndex === index ? '#FFF' : '#1FC7D4'}} key={index}>{tab.title}</Box>
            ))}
        </Box>
    )
}

export default ChartViewTabs