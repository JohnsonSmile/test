import { Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/animes/loading.json'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '20px'
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(5),
        paddingTop: 0
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: '0 auto', pt: 3, color: '#333', fontSize: '16px' }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '(theme) => theme.palette.grey[500]',
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
};
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const InviteCodeDialog = (props) => {
    const {isOpen, setIsOpen} = props
    const navigate = useNavigate()
    const handleClose = () => {
        setIsOpen(false);
    };
    
    const handleJumpToHomeClick = () => {
        console.log('to home')
        navigate('/')   
    }

    return (
        <div>
        <BootstrapDialog
            onClose={handleClose}
            open={isOpen}
        >
            <BootstrapDialogTitle onClose={handleClose}>
                邀请码绑定成功!
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>

                    <Lottie options={defaultOptions}
                        height={60}
                        width={60} />
                    <Box sx={{color: '#7E8186', fontSize: '12px', textAlign: 'center'}} gutterBottom>
                        自动跳转Value Bank首页
                    </Box>
                    <Box sx={{ px: 6, textAlign: 'center', mt: 4, fontSize: '12px', color: '#7E8186' }}>
                        长时间未响应？
                    </Box>
                    <Box sx={{textAlign: 'center', fontSize: '12px', color: '#4263EB', cursor: 'pointer', textDecoration: 'underline' }} onClick={ handleJumpToHomeClick }>手动跳转</Box>
                    <Box sx={{ textAlign: 'center', fontSize: '12px', color: '#7E8186' }}>Value Bank首页</Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default InviteCodeDialog