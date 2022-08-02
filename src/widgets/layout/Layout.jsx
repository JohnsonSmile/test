import { Box, Fab } from "@mui/material"
import TopAppBar from "../appbar/TopAppBar"
import ScrollTop from "../scrolltop/ScrollTop"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingDialog from "../loading/LoadingDialog";
import { useWeb3React } from "@web3-react/core";


const Layout = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { account } = useWeb3React()
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, [location, navigate])
    useEffect(() => {
        if (account) {
          localStorage.setItem("account", account);
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