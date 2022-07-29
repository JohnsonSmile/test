import { Box, Dialog, DialogContent, DialogTitle  } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useSelector } from "react-redux";
import * as animationData from '../../assets/animes/loading.json'
import { getDescription, getIsLoading, getTitle } from "../../redux/reducers/status";

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
    
    const isOpen = useSelector(getIsLoading)
    const title = useSelector(getTitle)
    const description = useSelector(getDescription)

    return (
        <div>
        <BootstrapDialog
            open={isOpen}
        >
            <BootstrapDialogTitle >
                { title }
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                    <Lottie options={defaultOptions}
                        height={60}
                        width={60} />
                    <Box sx={{ px: 6, textAlign: 'center', mt: 4, fontSize: '12px', color: '#7E8186' }}>
                        {description}
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default LoadingDialog