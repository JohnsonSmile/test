import { Tabs } from "@mui/material";
import { styled } from "@mui/styles";

const BootstrapTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-flexContainer': {
        justifyContent: 'center',
        backgroundColor: '#F2F2F5',
        margin: '0 15px',
        borderRadius: '22px',
        boxSizing: 'border-box',
    },
    '& .MuiButtonBase-root': {
        flex: 1,
        minHeight: '32px',
        height: '32px',
        margin: '5px',
        boxSizing: 'border-box',
        color: '#7E8186'
    },
    '& .Mui-selected': {
        backgroundColor: '#FFF',
        borderRadius: '16px',
        color: '#333'
    },
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent'
    }
}));

export default BootstrapTabs