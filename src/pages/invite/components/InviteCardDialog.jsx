import { Avatar, Box, Dialog, Typography } from "@mui/material"
import QRCode from 'qrcode.react';


const InviteCardDialog = (props) => {
    const { avatar, url, isOpen, setIsOpen } = props
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
        >
        </Dialog>
    )
}


export default InviteCardDialog