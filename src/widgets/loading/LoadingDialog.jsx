import { Box, Dialog, DialogContent, DialogTitle  } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from "react-redux";
import * as animationData from '../../assets/animes/loading.json'
import { getDescription, getErrMessage, getHide, getIsLoading, getSuccessMessage, getTitle, setHide } from "../../redux/reducers/status";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '20px'
    },
    '& .MuiDialogContent-root': {
        minWidth: 200,
        paddingTop: 0,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));
  
const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
        <DialogTitle sx={{ m: '0 auto', pt: 3, color: '#333', fontSize: '16px' }} {...other}>
            {children}
        </DialogTitle>
    );
};
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
};

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const LoadingDialog = (props) => {
    
    const isLoading = useSelector(getIsLoading)
    const title = useSelector(getTitle)
    const description = useSelector(getDescription)
    const hide = useSelector(getHide)
    const errMsg = useSelector(getErrMessage)
    const successMsg = useSelector(getSuccessMessage)
    const dispatch = useDispatch()
    const handleSureClick = () => {
        dispatch(setHide(true))
    }

    return (
        <div>
        <BootstrapDialog
            open={!hide}
        >
            <BootstrapDialogTitle >
                { title }
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    {isLoading && <Lottie options={defaultOptions}
                        height={60}
                        width={60} />}
                    {description && <Box sx={{ px: 6, textAlign: 'center', mt: 4, fontSize: '12px', color: '#7E8186' }}>
                        {description}
                    </Box>}
                    {errMsg && <Box sx={{ px: 6, textAlign: 'center', mt: 4, fontSize: '14px', color: 'red' }}>
                        {errMsg}
                    </Box>}
                    {successMsg && <Box sx={{ px: 6, textAlign: 'center', mt: 4, fontSize: '14px', color: 'green' }}>
                        {successMsg}
                    </Box>}
                    {(errMsg || successMsg) && <Box sx={{ textAlign: 'center', mt: 5, width: '100px', fontSize: '12px', color: '#FFF', background: '#4263EB', borderRadius: '15px', lineHeight: '30px', cursor: 'pointer'}}
                        onClick={handleSureClick}>
                        确定
                    </Box>}
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default LoadingDialog