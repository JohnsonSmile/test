import { Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { apiGetSignInfos, apiPostSignIn } from '../../http/api';
import SignCalendar from './components/SignCalendar';



const SignPage = () => {
    const [isSigned, setIsSigned] = useState(false)
    // FIXME: should be got from backend
    const [markers, setMarkers] = useState([])
    const { account } = useWeb3React()
    const handleSignClick = async () => {
        if (!isSigned) {
            // TODO: call backend sign api
            setIsSigned(true)

            const resp = await apiPostSignIn(account)
            if (resp.code === 200) {
                setMarkers(prev => {
                    const nowDate = moment(Date.now()).format("DD-MM-YYYY")
                    console.log('nowDate', nowDate)
                    prev.push(nowDate)
                    return prev
                })
            }
            
        }
    }

    const initialInfos = async (account) => {
        const date = new Date()
        const year = date.getFullYear()
        const resp = await apiGetSignInfos(account, year)
        if (resp.result && resp.result.length > 0) {
            console.log(resp.result)
            // TODO: setMarkers
            const nowDate = moment(Date.now()).format("DD-MM-YYYY")
            const markers = resp.result.map(days => {
                const startOfYear = moment().startOf('year')
                const marker = startOfYear.add(days - 1, 'day').format("DD-MM-YYYY")
                if (marker === nowDate) {
                    setIsSigned(true)
                }
                return marker
            })
            console.log(markers)
            setMarkers(markers)
        } else {
            setMarkers([])
        }
    }
    useEffect(() => {
        // initial infos
        initialInfos(account)

    }, [account])

    return (
        <Box sx={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <SignCalendar markers={markers} />
            <Box sx={{ mt: 4, width: '100%'}}>
                <Box sx={{ backgroundColor: isSigned ? '#FFF' : '#4263EB', borderRadius: '12px', lineHeight: '44px', color: isSigned ? '#4263EB' :'#FFF', cursor: 'pointer', mx: 2, fontWeight: 700, border: '1px solid #4263EB' }} 
                    onClick={handleSignClick}>{isSigned ? '已签到' : '签到'}</Box>
            </Box>
            <Box sx={{ mt: 1.5, py: 1, width: '100%' }}>
                <Box sx={{ border: '1px solid #EDEEF2', borderRadius: '12px', mx: 2, py: 2 }} >
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 500, mx: 2 }}>规则：</Box>
                    <Box sx={{ fontSize: '12px', color: '#333', textAlign: 'left', fontWeight: 400, pt: 0.8 , mx: 2}}>需要每日登录签到,否则当日无收益</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SignPage