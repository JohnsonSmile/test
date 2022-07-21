import { Box, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import BNBIcon from '../../../assets/icon/bnb.png'
import IMTokenIcon from '../../../assets/icon/im_token.png'
import TokenPocketIcon from '../../../assets/icon/token_pocket.png'
import { openInIMTokenExplorer, openInTokenPocketExplorer } from "../../../utils/wallet";

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

const LoginDialog = (props) => {
    const {isOpen, setIsOpen} = props
    const handleClose = () => {
        setIsOpen(false);
    };
    
    const handleIMTokenClick = () => {
        // is IMToken installed, if installed, open the follow url
        openInIMTokenExplorer()
    }
    const handleTokenPocketClick = () => {
        // is token pocket installed, if installed, open the follow url
        openInTokenPocketExplorer()
    }

    return (
        <div>
        <BootstrapDialog
            onClose={handleClose}
            open={isOpen}
        >
            <BootstrapDialogTitle onClose={handleClose}>
                欢迎加入Value Bank
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 1}}>

                    <Typography sx={{color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12}} gutterBottom>
                        请选择您的钱包连接至<CardMedia component='img'sx={{
                            height: 20,
                            width: 20,
                            borderRadius: '50%', 
                            display: 'inline-block',
                            px: 0.5
                        }} image={BNBIcon}/>BSC网络
                    </Typography>
                    <Box fullWidth sx={{
                        display: 'flex', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        backgroundColor: '#eee', 
                        color: '#333', 
                        py: 1.2, px: 1}} onClick={handleIMTokenClick} >
                        <CardMedia component='img'sx={{
                            height: 30,
                            width: 30,
                            display: 'inline-block',
                            px: 3
                        }} image={IMTokenIcon} />imtoken</Box>
                    <Box fullWidth sx={{
                        display: 'flex', 
                        justifyContent: 'flex-start',
                        alignItems: 'center', 
                        cursor: 'pointer', 
                        backgroundColor: '#eee', 
                        color: '#333', 
                        py: 1.2, px: 1 }} onClick={handleTokenPocketClick} >
                        <CardMedia component='img'sx={{
                            height: 30,
                            width: 30,
                            display: 'inline-block',
                            px: 3
                        }} image={TokenPocketIcon}/>Token Pocket</Box>
                    
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default LoginDialog