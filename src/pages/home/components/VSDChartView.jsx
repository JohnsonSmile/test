import { Card, CardContent, CardMedia, Box, Typography } from "@mui/material"
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'
import SyncAltSharpIcon from '@mui/icons-material/SyncAltSharp';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import BNBIcon from '../../../assets/icon/bnb.png'
import PancakeIcon from '../../../assets/icon/pancake.png'
import ChartViewTabs from "./ChartViewTabs";
import { useEffect, useState } from "react";


const xAxisArr = [
    ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24'],
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
]



const VSDChartView = (props) => {
    const { dayData, weekData, monthData, yearData } = props;
    const [index, setIndex] = useState(0)
    const [option, setOption] = useState({
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
            left: 1,
            right: 1,
            top: 1,
            bottom: 30,
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
            itemStyle: {  
                normal: {    
                    lineStyle: { 
                        width: 3,  
                        type: 'solid',  
                        color: "#3CD3AE"
                    }  
                } 
            },
            symbolSize:5,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                    offset: 0, color: '#3CD3AE' // 0% 处的颜色
                   }, {
                       offset: 0.9, color: '#ECF7FA' // 80% 处的颜色
                   }, {
                       offset: 1, color: '#fff' // 100% 处的颜色
                   }]
                ),
                opacity: 0.5
            },
            emphasis: {
                focus: 'series',
                label: {
                    show: true,
                    position: 'top'
                },
                fontSize: 21
            }
          }
        ]
    })
    useEffect(() => {
        const xAxisData = xAxisArr[index];
        let data = []
        if (index === 0) {
            data = dayData;
        } else if (index === 1) {
            data = weekData;
        } else if (index === 2) {
            data = monthData;
        } else if (index === 3) {
            data = yearData;
        }

        setOption(prev => {
            return {
                ...prev,
                xAxis: {
                    ...prev.xAxis,
                    data: xAxisData,
                },
                series: [{
                    ...prev.series[0],
                    data,
                }]
            }
        })
    }, [index, dayData, weekData, monthData, yearData])
    
    const handleTabChange = (idx) => {
        console.log(idx)
        setIndex(idx)
    }

    return (
        <Card sx={{ backgroundColor: '#F4FCFF', mx: 2, mt: 2}}>
            <CardContent>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <CardMedia
                            component={'img'}
                            sx={{
                                height: 20,
                                width: 20,
                                borderRadius: '50%',
                                mr: 0.5,
                            }}
                            image={BNBIcon} />
                        <CardMedia
                            component={'img'}
                            sx={{
                                height: 20,
                                width: 20,
                                borderRadius: '50%'
                            }}
                            image={PancakeIcon} />
                        <Typography component={"span"} color={"MenuText"} sx={{display: 'flex', ml: 0.5}}>BNB/CAKE</Typography>
                        <SyncAltSharpIcon sx={{
                            color: '#3CD3AE',
                            ml: 0.5,
                        }}/>
                        <Typography component={"span"} sx={{display: 'flex', ml: 0.5, color: '#1FC7D4', backgroundColor: '#E7FAFC', fontSize: '14px', px: 1, py: 0.3}}>Basic</Typography>
                    </Box>
                    <OpenInFullIcon sx={{ width: 20, cursor: 'pointer' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 0.5, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Typography component={"span"} color={"MenuText"} sx={{ fontSize: '21px', fontWeight: 700 }} >70.50</Typography>
                        <Typography component={"span"} color={"MenuText"} sx={{ fontSize: '14px', fontWeight: 700, marginBottom: '3px', ml: 0.5, color: '#7A6EAA' }} >BNB/CAKE</Typography>
                        <Typography component={"span"} color={"MenuText"} sx={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px', ml: 0.5, color: '#3CD3AE' }} >+0.732(0.98%)</Typography>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'block'}}}>
                        <ChartViewTabs onTabChange={handleTabChange} />
                    </Box>
                </Box>
                <ReactECharts option={option} />
                <Box sx={{display: {xs: 'inline-block', md: 'none'}, mt: 2}}>
                    <ChartViewTabs onTabChange={handleTabChange} />
                </Box>
            </CardContent>
        </Card>
    )
}

export default VSDChartView