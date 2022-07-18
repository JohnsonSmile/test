import { Box, Button, CardMedia, FormControl, FormHelperText, OutlinedInput, TextField, Typography, useFormControl } from "@mui/material"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { injected } from "../../clients/client"
import { isIMTokenAvailable, isTokenPocketAvailable } from "../../utils/wallet"
import LoginDialog from "./components/LoginDialog"

// const stringAvatar = (name) => {
//     return {
//         children: `${name.split(' ')[0][0]}`,
//     };
// }

const LoginPage = () => {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const { activate, account } = useWeb3React();
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const handleWalletConnectClick = async () => {
        if (isIMTokenAvailable()) {
            // connect to ethereum directly
            // toast.success('connect to im token ..')
            await activate(injected)
        } else if (isTokenPocketAvailable()) {
            // connect to ethereum directly
            await activate(injected)
            // toast.success('connect to token pocket..')
        } else if (typeof window.ethereum !== 'undefined') {
            // connect to ethereum directly
            await activate(injected)
        } else {
            setIsLoginDialogOpen(true)
        }
    }

    const handleStartBankClick = () => {
        // validate invite code
        navigate('/')
    }

    useEffect(() => {
        if (!account) {
            // TODO: fetch is user has already been verified with an invite code, 
            // if dont have an invite code and is the first time for the account to open the session show dialog
            // const res = await http.post(xxxxx), get user infos
        }
    }, [account])
    

    return (
        <>
            <Box sx={{ backgroundColor: '#eee', height: '100%', minHeight: window.innerHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2}}>
                    <Typography variant="h2" sx={{
                        color: '#333',
                        fontSize: '3.0rem',
                        fontWeight: 700}}>Value 算法理财</Typography>    
                    <Typography variant="h3" sx={{
                        color: '#333',
                        fontSize: '2.8rem',
                    }}>Value Bank</Typography>
                    <Typography variant="h5" sx={{
                        color: '#333',
                        fontSize: '1.2rem'
                    }}>Web3 社交应用经济共享平台</Typography>    
                </Box> 
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
                    <CardMedia 
                        component={'img'}
                        sx={{
                            height: 56,
                            width: 56,
                            mb: 3
                        }}
                        image={'https://img2.baidu.com/it/u=2859542338,3761174075&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'} />
                    {!account && <Button variant='contained' sx={{px: 4, py: 1, fontSize: '1.2rem'}} onClick={handleWalletConnectClick}>连接钱包</Button>}
                    {account && <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                    <Typography variant='subtitle1' sx={{color: '#333'}}>欢迎加入Value Bank</Typography>
                    <Typography variant='subtitle1' sx={{color: '#333'}}>开始前,请绑定邀请码</Typography>

                    <FormControl sx={{ width: '25ch' }}>
                        <TextField placeholder="请输入邀请码" variant="outlined" fullWidth/>
                        {errMsg && <Typography variant='subtitle1' sx={{fontSize: '12px'}}>{ errMsg }</Typography>}
                    </FormControl>
                    <Button variant='contained' size='large' sx={{textTransform: 'capitalize', mt: 2}} onClick={handleStartBankClick}>开启 Value Bank</Button>
                    {/* <Avatar {...stringAvatar('船中八策')} sx={{ width: 56, height: 56 }} />
                    <Typography  variant='subtitle1' sx={{
                        color: '#333',
                        fontSize: '1.2rem',}}>{ellipsisAccount(account)}</Typography> */}
                    </Box>}
                </Box>
                
                <Typography variant='subtitle1' sx={{
                    mt: 'auto',
                    color: '#333',
                    fontSize: '1.0rem',}}>Powered by AAA Group & Binance Smart Chain</Typography>
                <Typography variant='subtitle1' sx={{
                    color: '#333',
                    fontSize: '1.0rem', mb: 2}}>版本号: V0.0.1</Typography>
                <LoginDialog isOpen={isLoginDialogOpen} setIsOpen={setIsLoginDialogOpen}/>
            </Box>
        </>
    )
}

export default LoginPage