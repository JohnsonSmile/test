import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Fade, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        minWidth: 300,
    },
    '& .MuiDialogContent-root': {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
  }));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: '0 auto', p: 2, color: '#333', fontSize: '16px', fontWeight: 600 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: '#333',
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

const BuildDialog = (props) => {
    const {isOpen, setIsOpen, result, setResult} = props
    const navigate = useNavigate()
    const handleClose = () => {
        setResult(null)
        setIsOpen(false);
    };
    
    const handleJumpToMyNFTClick = () => {
        navigate('/mynft')
    }

    return (
        <div>
        <BootstrapDialog
            onClose={handleClose}
            open={isOpen}
        >
            <BootstrapDialogTitle onClose={handleClose}>
                恭喜你获得了
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', gap: 1, color: '#333', height: '100%'}}>
                    {!result && <Box sx={{ minHeight: 180, display: 'flex', alignItems: 'center' }}>
                            <Fade
                            in={!result}
                            style={{
                                transitionDelay: !result ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>
                        </Box>}
                    {result && <Box sx={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1}}>
                        {result && result.cropper && <Typography sx={{color: '#333', fontSize: '22px', fontWeight: 600, lineHeight: '20px' }} gutterBottom>
                            {result.cropper}个铜
                        </Typography>}
                        {result && result.silver && <Typography sx={{color: '#333', fontSize: '22px', fontWeight: 600, lineHeight: '20px' }} gutterBottom>
                            {result.silver}个银
                        </Typography>}
                        {result && result.gold && <Typography sx={{color: '#333', fontSize: '22px', fontWeight: 600, lineHeight: '20px' }} gutterBottom>
                            {result.gold}个金
                        </Typography>}
                        {result && result.diamond && <Typography sx={{color: '#333', fontSize: '22px', fontWeight: 600, lineHeight: '20px' }} gutterBottom>
                            {result.diamond}个钻
                        </Typography>}
                    </Box>}
                    
                    <Box fullWidth sx={{
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        backgroundColor: '#4263EB', 
                        color: '#FFF', 
                        fontWeight: 600,
                        width: '220px',
                        height: '56px', lineHeight: '56px',borderRadius: '20px',
                    }} onClick={handleJumpToMyNFTClick} >
                        到我的NFT查看</Box>
                    
                    <Box fullWidth sx={{
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        backgroundColor: '#ECF0FF', 
                        color: '#4263EB', 
                        fontWeight: 600,
                        width: '220px',
                        height: '56px', lineHeight: '56px',borderRadius: '20px',
                    }} onClick={handleClose} >
                        关闭弹窗</Box>
                    
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default BuildDialog