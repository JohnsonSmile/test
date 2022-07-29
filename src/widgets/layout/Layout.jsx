import { Box, Fab } from "@mui/material"
import TopAppBar from "../appbar/TopAppBar"
import ScrollTop from "../scrolltop/ScrollTop"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingDialog from "../loading/LoadingDialog";
import { useSelector } from "react-redux";
import { getIsLoading, getTitle } from "../../redux/reducers/status";


const Layout = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const isLoading = useSelector(getIsLoading)
    const title = useSelector(getTitle)
    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/home')
        }
    }, [location, navigate])
    
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
                <LoadingDialog isOpen={isLoading} title={title} />
            </Box>
        </>
    )
}

export default Layout