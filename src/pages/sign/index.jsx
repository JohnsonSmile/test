import { Box, Button, Card, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import SignCalendar from './components/SignCalendar';



const SignPage = () => {
    const [isSigned, setIsSigned] = useState(false)
    // FIXME: should be got from backend
    const [markers, setMarkers] = useState([
        '16-07-2022',
        '17-07-2022',
        '19-07-2022',
    ])
    const handleSignClick = () => {
        if (!isSigned) {
            // TODO: call backend sign api
            setIsSigned(true)
            setMarkers(prev => {
                const nowDate = moment(Date.now()).format("DD-MM-YYYY")
                console.log('nowDate', nowDate)
                prev.push(nowDate)
                return prev
            })
        }
    }

    return (
        <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Card sx={{ height: '100%', m: 3 }}>
                <SignCalendar markers={markers} />
            </Card>
            <Box>
                <Button size='large' variant={isSigned ? 'outlined' : 'contained'} sx={{ minWidth: 120 }} onClick={handleSignClick}>{isSigned ? '已签到' : '签到'}</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 5, width: '100%'}}>
                <Typography variant='inherit' sx={{ px: 3 }}>规则:</Typography>
                <Typography variant='inherit' sx={{ px: 3 }}>需要每日登录签到,否则当日无收益</Typography>
            </Box>
        </Box>
    )
}

export default SignPage