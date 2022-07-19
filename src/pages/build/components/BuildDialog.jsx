import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(5),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
  }));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: '0 auto', p: 2, color: '#333' }} {...other}>
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
                Value Bank
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 1, color: '#333'}}>
                    {!result && <>Loading...</>}
                    {result && result.cropper && <Typography sx={{color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
                        {result.cropper}个铜
                    </Typography>}
                    {result && result.silver && <Typography sx={{color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
                        {result.silver}个银
                    </Typography>}
                    {result && result.gold && <Typography sx={{color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
                        {result.gold}个金
                    </Typography>}
                    {result && result.diamond && <Typography sx={{color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}} gutterBottom>
                        {result.diamond}个钻
                    </Typography>}
                    
                    <Box fullWidth sx={{
                        display: 'flex', 
                        justifyContent: 'flex-start',
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        backgroundColor: '#eee', 
                        color: '#333', 
                        py: 1.2, px: 1 }} onClick={handleJumpToMyNFTClick} >
                        到我的NFT查看</Box>
                    
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default BuildDialog