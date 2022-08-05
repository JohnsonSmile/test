import { Box, Fab } from "@mui/material"
import TopAppBar from "../appbar/TopAppBar"
import ScrollTop from "../scrolltop/ScrollTop"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingDialog from "../loading/LoadingDialog";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetUserInfo, getUserInfo } from '../../redux/reducers/user';
import { asyncSetHome } from "../../redux/reducers/page";


const Layout = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { account } = useWeb3React()
    const userInfo = useSelector(getUserInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, [location, navigate])
    useEffect(() => {
        if (account) {
          localStorage.setItem("account", account);
          console.log(userInfo)
          if (account !== userInfo.account) {
            console.log('请重新登录！')
            dispatch(asyncSetUserInfo({      
                account: '', 
                id :'', 
                invitationCode: '', 
                inviter: '',
                avatar: '',
                token: ''
            }))
            dispatch(asyncSetHome({
                account: '',
                userName: '',
                avatar: '',
                yesterdayGain: 0,
                isSigned: false,
                nftAmount: 0,
                promotionCount: 0,
                invitationCode: '',
                inviter: '',
            }))
            navigate('/login')
          }
        } else {
          localStorage.setItem("account", "");
        }
    }, [account]);
    return (
        <>
            <Box sx={{backgroundColor: '#4263EB'}}>
                <TopAppBar/>
                <div id="back-to-top-anchor" />
                <Outlet />
                {/* <Box>
                    <UserInfo />
                    <Box sx={{
                        backgroundColor: '#eee', 
                        borderRadius: '30px 30px 0 0',
                        overflow: 'hidden'
                    }}>
                        <Features features={features} informations={informations} />
                        <GlobalData socialData={socialData} vsdData={vsdData} vsdUsdtData={vsdUsdtData} />
                    </Box>
                </Box> */}
                <ScrollTop {...props } anchorName='#back-to-top-anchor'>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
                <LoadingDialog />
            </Box>
        </>
    )
}

export default Layout