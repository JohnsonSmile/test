import { Avatar, Typography, Box } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const stringAvatar = (name) => {
    return {
        children: `${name.split(' ')[0][0]}`,
    };
}

const useStyles = makeStyles({
    'userinfo-login-container': {
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 30px'
    },
    'login-button': {
        backgroundColor: 'transparent',
        border: '1px solid #FFF',
        color: '#FFF',
        borderRadius: '15px',
        width: '80px',
        height: '30px',
        marginTop: '15px',
        cursor: 'pointer'
    },
    'userinfo-container': {
        minHeight: 140,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 15px'
    },
    'userinfo-title': {
        width: 100,
        textAlign: 'left'
    },
    'userinfo-data': {
        flex: 1,
        textAlign: 'center'
    }
});

export const UserInfo = () => {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    const handleLoginClick = () => {
        // jump to login page
        navigate('/login')
        // TODO:login state should be in global mobx
        // setIsLogin(true)
    }

    const classes = useStyles()
    return (
        <>
            {!isLogin && <Box className={classes['userinfo-login-container']}>
                <Typography variant="h6">请登录后查看收益</Typography>
                <button className={classes['login-button']} onClick={handleLoginClick} >
                    去登录
                </button> 
            </Box>}
            {isLogin && <Box className={classes['userinfo-container']}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar {...stringAvatar('船中八策')} sx={{ width: 56, height: 56 }} />
                    <Typography sx={{mt: 1}}>船中八策</Typography>
                </Box>
                <Box sx={{
                    flex: 2,
                    py: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography className={classes['userinfo-title']}>昨日收益：</Typography>
                        <Typography className={classes['userinfo-data']}>234.23VSD</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography className={classes['userinfo-title']}>今日签到:</Typography>
                        <Typography className={classes['userinfo-data']}>已签到</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography className={classes['userinfo-title']}>持有NFT:</Typography>
                        <Typography className={classes['userinfo-data']}>1000</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <Typography className={classes['userinfo-title']}>推广人数:</Typography>
                        <Typography className={classes['userinfo-data']}>121</Typography>
                    </Box>
                </Box>
                </Box>}
        </>
    )
}