import { Avatar, Typography, Box } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { useNavigate } from "react-router-dom";
import { ellipsisAccount } from "../../../utils/utils";


const stringAvatar = (name) => {
    return {
        children: `${name.split(' ')[0][0]}`,
    };
}

const useStyles = makeStyles({
    'userinfo-login-container': {
        
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

export const UserInfo = (props) => {
    const navigate = useNavigate()
    const { accountInfo, avatar, userName } = props
    const handleLoginClick = () => {
        // jump to login page
        navigate('/login')
        // TODO:login state should be in global mobx
        // setIsLogin(true)
    }
    const handleNavToNFTClick = () => {
        navigate('/mynft')
    }

    const handleNavToSignClick = () => {
        navigate('/sign')   
    }

    const handleNavToPromotionClick = () => {
        navigate('/invite')
    }

    const handleNavToProfileClick = () => {
        navigate('/profile')
    }

    const classes = useStyles()
    return (
        <>
            {!accountInfo.account && !accountInfo.invitationCode && <Box sx={{
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0 30px',
                backgroundColor: '#4263EB'}}>
                <Typography variant="h6">????????????????????????</Typography>
                <button className={classes['login-button']} onClick={handleLoginClick} >
                    ?????????
                </button> 
            </Box>}
            {accountInfo.account && <Box sx={{px: 2, backgroundColor: '#4263EB'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: 'center', pt: 2, pb: 1, px: 2, cursor: 'pointer'}}
                        onClick={handleNavToProfileClick}>
                        <Avatar {...stringAvatar(accountInfo.userName ? accountInfo.userName : 'AAA')} sx={{ width: 40, height: 40 }} src={avatar} />
                        <Box sx={{ ml: 1 }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: 'left'}}>{userName}</Typography>
                            <Typography sx={{ fontSize: 12, textAlign: 'left', opacity: 0.8 }}>{ellipsisAccount(accountInfo.account)}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: 'center', py: 2}}>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>??????????????????</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{accountInfo.yesterdayGain} VSD</Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, cursor: 'pointer' }}
                            onClick={handleNavToSignClick}>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>????????????</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{accountInfo.isSigned ? '?????????' : '?????????'}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, cursor: 'pointer'}}
                            onClick={handleNavToNFTClick}>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>??????NFT</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{accountInfo.nftAmount}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5, cursor: 'pointer'}}
                            onClick={handleNavToPromotionClick}>
                            <Typography sx={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>????????????</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{accountInfo.promotionCount}</Typography>
                        </Box>
                    </Box>
                </Box>}
        </>
    )
}