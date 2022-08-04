import { Select, TextField } from "@mui/material";
import { styled } from "@mui/styles";



const BootstrapTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '14px',
        height: '48px',
        border: '1px solid #F2F2F2'
    },
    '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
    },
}));


export default BootstrapTextField