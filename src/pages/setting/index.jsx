import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AvatarUpload from "./components/AvatarUpload"

const { Box, Avatar, Typography, TextField, Button } = require("@mui/material")

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
            sx={{ backgroundColor: '#eee', 
                minHeight: 'calc(100vh - 56px)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' }}>
            <AvatarUpload />
            <Typography sx={{color: 'InfoText', mt: 2}}>头像上传</Typography>
            <Typography sx={{color: 'InfoText', mt: 4}}>名称修改</Typography>
            <TextField sx={{ color: '#333', mt: 3}} value={username} onChange={handleUsernameChange} placeholder="请输入昵称" />
            <Button variant="contained" size="large" sx={{mt: 4, minWidth: 120}} onClick={handleSaveClick}>保存修改</Button>
            <Button variant="outlined" size="large" sx={{mt: 2, minWidth: 120}} onClick={handleBackClick}>返回</Button>
        </Box>
    )
}

export default SettingPage