import { Box, CardMedia, Typography } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { injected } from "../../clients/client"
import { asyncSetAccount, asyncSetSignInfo, getAccount, getSigInfo } from "../../redux/reducers/wallet"
import { isIMTokenAvailable, isTokenPocketAvailable } from "../../utils/wallet"
import LoginDialog from "./components/LoginDialog"
import { useSelector, useDispatch } from "react-redux"
import { apiPostCreateUser, apiPostLogin } from "../../http"
import InviteBgTopImage from "../../assets/images/invite/background_top.png";
import InviteBgBottomImage from "../../assets/images/invite/background_bottom.png";
import { ReactComponent as BNBIcon } from "../../assets/icon/login/bnb.svg";
import InviteTextField from "./components/InviteTextField";
import InviteCodeDialog from "./components/InviteCodeDialog"


// const stringAvatar = (name) => {
//     return {
//         children: `${name.split(' ')[0][0]}`,
//     };
// }

const LoginPage = () => {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
    const [inviteCode, setInviteCode] = useState("")
    const { activate, account } = useWeb3React();
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const sigInfo = useSelector(getSigInfo)
    const signAccount = useSelector(getAccount)
    const dispatch = useDispatch()
    const handleWalletConnectClick = async () => {
        if (isIMTokenAvailable() || isTokenPocketAvailable() || typeof window.ethereum !== 'undefined') {
            // connect to ethereum directly
            await activate(injected)
        } else {
            setIsLoginDialogOpen(true)
        }
    }

    const handleStartBankClick = () => {
        console.log(inviteCode)
        apiPostCreateUser(account, inviteCode).then(res => {
            console.log(res)
        })
        // validate invite code
        // navigate('/')
    }

    const handleInviteCodeChange = (e) => {
        setInviteCode(e.target.value)
    }

    useEffect(() => {
        if (!account) {
            // TODO: fetch is user has already been verified with an invite code, 
            // if dont have an invite code and is the first time for the account to open the session show dialog
            // const res = await http.post(xxxxx), get user infos
        } else {
            if (account !== signAccount) {
                window.Library.getSigner(account).signMessage("hello").then((sigHex) => {
                    console.log("account==", account)
                    console.log("sig==", sigHex)
                    // save message info local
                    dispatch(asyncSetSignInfo({ account, sigHex }))
                    dispatch(asyncSetAccount(account))
                    apiPostLogin(account, sigHex, "hello").then(res => {
                        console.log('res===', res)
                    })
                })
            }
        }
    }, [account, signAccount, dispatch])
    

    return (
        <Box sx={{ height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4263EB', position: 'relative' }}>
            <CardMedia component={"img"} image={InviteBgTopImage} sx={{ width: '100vw', height: '100vw', position: 'absolute', top: '-56px', left: 0, zIndex: 1 }} />
            <CardMedia component={"img"} image={InviteBgBottomImage} sx={{ width: '100vw', height: '100vw', position: 'absolute', bottom: 0, left: 0, zIndex: 1 }} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, position: 'relative', zIndex: 2 }} >
                <Typography variant="h2" sx={{
                    fontSize: '36px',
                    fontWeight: 600}}>Value 算法理财</Typography>    
                <Typography variant="h3" sx={{
                    fontSize: '24px',
                }}>Value Bank</Typography>
                <Typography sx={{
                    display: 'inline-block',
                    opacity: 0.8,
                    fontSize: '12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    width: 200
                }}>- Web3社交应用经济共享平台 -</Typography>   
                <Box sx={{ mt: 6 }}>
                    <Typography sx={{ fontSize: '16px' }}>欢迎加入Value Bank</Typography>
                    <Typography sx={{ fontSize: '16px', mt: 0.5}}>开始前,请绑定邀请码</Typography> 
                </Box>
            </Box> 
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', position: 'relative', zIndex: 2}}>
                <BNBIcon sx={{ height: 56, width: 56, mb: 3 }}/>
                {!account && <Box sx={{ lineHeight: '44px', mt: 3, width: '240px', borderRadius: '12px', backgroundColor: '#FFF', color: '#4263EB', fontSize: '16px', fontWeight: 600, cursor: 'pointer'}} onClick={handleWalletConnectClick}>连接钱包</Box>}
                {account && <InviteTextField placeholder="请输入邀请码" variant="outlined" onChange={handleInviteCodeChange} sx={{ mt: 3 }} fullWidth/>}
                {!errMsg && <Box sx={{fontSize: '12px', color: 'red', lineHeight: '15px', mt: 0, visibility: account ? 'visible' : 'hidden', height: '12px' }}>{ errMsg }</Box>}
                <Box sx={{ lineHeight: '44px', mt: 2, width: '240px', borderRadius: '12px', backgroundColor: '#FFF', color: '#4263EB', fontSize: '16px', fontWeight: 600, cursor: 'pointer', visibility: account ? 'visible' : 'hidden'}} onClick={handleStartBankClick}>开启 Value Bank</Box>
            </Box>
            <Box sx={{position: 'absolute',bottom: 0, zIndex: 2 }}>
                <Typography sx={{ fontSize: '12px', opacity: 0.6 }}>Powered by AAA Group & Binance Smart Chain</Typography>
                <Typography sx={{fontSize: '12px', mb: 3, opacity: 0.6 }}>版本号: V0.0.1</Typography>
            </Box>
            <LoginDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen}/>
            <InviteCodeDialog isOpen={isInviteDialogOpen} setIsOpen={setIsInviteDialogOpen}/>
        </Box>
    )
}

export default LoginPage