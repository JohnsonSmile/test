import { TextField } from "@mui/material";
import { styled } from "@mui/styles";



const InviteTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '22px',
        fontSize: '14px',
        height: '44px',
        backgroundColor: '#FFF',
        padding: '12px 60px',
        textAlign: 'center',
        width: '240px',
    },
}));


export default InviteTextField