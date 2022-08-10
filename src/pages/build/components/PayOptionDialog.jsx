import { Box, Checkbox, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/styles";
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { getTotalPrice } from "../../../clients/valuebleNFT";
import { ethers } from "ethers";
import { getFormatBigNumber } from "../../../utils";
import { useSelector } from "react-redux";
import { getBuildAmount } from "../../../redux/reducers/page";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        width: 300,
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

const PayOptionDialog = (props) => {
    const {isOpen, setIsOpen,  onPaySelected } = props
    const [type, setType] = useState(1)
    const [prices, setPrices] = useState([])
    const [totalPrices, setTotalPrices] = useState([])
    const count = useSelector(getBuildAmount)
    const handleClose = () => {
        setIsOpen(false);
    };
    
    const handlePaySelected = () => {
        onPaySelected(prices[type - 1], type)
        setIsOpen(false);
    }

    const getPrice = async () => {
        try {
            const res1 = await getTotalPrice(count, 1)
            const res2 = await getTotalPrice(count, 2)
            console.log(res1)
            console.log(res2)
            setPrices([res1, res2])
            // setPriceInfo(res)
            const prices1 = []
            if (res1.totalUsdtPrice.gt(ethers.BigNumber.from(0))) {
                prices1.push(getFormatBigNumber(res1.totalUsdtPrice) + ' USDT')
            }
            if (res1.totalValuePrice.gt(ethers.BigNumber.from(0))) {
                prices1.push(getFormatBigNumber(res1.totalValuePrice) + ' V6')
            }
            if (res1.totalVsdPrice.gt(ethers.BigNumber.from(0))) {
                prices1.push(getFormatBigNumber(res1.totalVsdPrice) + ' VSD')
            }
            const price1 = prices1.join(' + ')
            const prices2 = []
            if (res2.totalUsdtPrice.gt(ethers.BigNumber.from(0))) {
                prices2.push(getFormatBigNumber(res2.totalUsdtPrice) + ' USDT')
            }
            if (res2.totalValuePrice.gt(ethers.BigNumber.from(0))) {
                prices2.push(getFormatBigNumber(res2.totalValuePrice) + ' V6')
            }
            if (res2.totalVsdPrice.gt(ethers.BigNumber.from(0))) {
                prices2.push(getFormatBigNumber(res2.totalVsdPrice) + ' VSD')
            }
            const price2 = prices2.join(' + ')
            setTotalPrices([price1, price2])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(count)
        if (count) {
            getPrice()
        }
    }, [count])
    

    return (
        <div>
        <BootstrapDialog
            onClose={handleClose}
            open={isOpen}
        >
            <BootstrapDialogTitle onClose={handleClose}>
                请选择支付方式
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', gap: 1, color: '#333', height: '100%'}}>
                    
                    <Box sx={{ minHeight: 170, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', px: 2, boxSizing: 'border-box',
                                width: '100%', backgroundColor: type === 1 ? '#eee' : '#FFF', borderRadius: '22px', height: '44px', border: '1px solid #eee'}} 
                            onClick={() => {setType(1)}}>
                            <Checkbox checked={type === 1} />
                            <Box sx={{color: '#333', fontSize: '14px' }} gutterBottom>
                                使用Value+USDT
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer',  px: 2, boxSizing: 'border-box',
                            width: '100%', backgroundColor: type === 2 ? '#eee' : '#FFF', borderRadius: '22px', height: '44px', border: '1px solid #eee', mt: 1.5}} 
                            onClick={() => {setType(2)}}>
                            <Checkbox checked={type === 2} />
                            <Box sx={{color: '#333', fontSize: '14px' }} gutterBottom>
                                仅使用USDT
                            </Box>
                        </Box>
                        <Box sx={{ mt: 1, width: '100%', textAlign: 'center',  fontSize: '12px' }} gutterBottom>
                            消耗: {totalPrices.length === 2 ? totalPrices[type - 1] : ''}
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 2}}>
                        <Box sx={{
                            display: 'flex', 
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center', 
                            cursor: 'pointer', 
                            backgroundColor: '#4263EB', 
                            color: '#FFF', 
                            fontWeight: 600,
                            height: '44px', lineHeight: '44px',borderRadius: '20px',
                        }} onClick={handlePaySelected} >
                            确定</Box>
                        <Box sx={{
                            display: 'flex', 
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center', 
                            cursor: 'pointer', 
                            backgroundColor: '#ECF0FF', 
                            color: '#4263EB', 
                            fontWeight: 600,
                            height: '44px', lineHeight: '44px',borderRadius: '20px',
                        }} onClick={handleClose} >
                            取消</Box>
                    </Box>
                    
                </Box>
            </DialogContent>
        </BootstrapDialog>
        </div>
    );
}

export default PayOptionDialog