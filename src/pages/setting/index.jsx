import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AvatarUpload from "./components/AvatarUpload"
import { Box, Button, InputBase } from "@mui/material"

const SettingPage = () => {
    const [username, setUsername] = useState('船中八策')
    const navigate = useNavigate()
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handleBackClick = () => {
        navigate(-1)
    }
    const handleSaveClick = () => {
        console.log(username)
    }
    return (
        <Box 
            sx={{ backgroundColor: '#FFF', 
                minHeight: 'calc(100vh - 56px)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' }}>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box sx={{flex: 1}}></Box>
                <AvatarUpload />
                <InputBase sx={{ color: '#333', mt: 4, borderRadius: 50, backgroundColor: '#F2F2F5', px: 3, py: 0.5, width: '150px', fontSize: '20px', fontWeight: 700 }} value={username} onChange={handleUsernameChange} placeholder="请输入昵称" />
            </Box>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', px: 4, width: '100vw', boxSizing: 'border-box'}}>
                <Button variant="contained" size="large" fullWidth onClick={handleSaveClick} sx={{mb: 2, height: 56, borderRadius: '28px', backgroundColor: '#423DF7'}}>保存修改</Button>
                <Button variant="contained" size="large" fullWidth onClick={handleBackClick} sx={{mb: 4, height: 56, borderRadius: '28px', backgroundColor: '#ECF0FF', color: '#423DF7'}}>返回</Button>
            </Box>
        </Box>
    )
}

export default SettingPage