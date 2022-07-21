import { Avatar, Box, CardMedia, Typography } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import http from "../../../utils/http"

const AvatarUpload = ({
    action = '/upload/image',
    onSuccess,
    onError,
    avatar
  }) => {
  
    // const avatarImg = useMemo(() => {
    //   console.log(avatar, 'avatar')
    //   return ''
    // //   return avatar ? `${upload}/${avatar}` : ''
    // }, [avatar])
    const [avatarImg, setAvatarImg] = useState('')
  
    const onFileChange =  (event) => {
      const file = event.target.files[0]
      console.log(file)
      if (file) {
        // upload file
        const formData = new FormData()
        formData.append('image', file, file.name)
        console.log(file)
        const url = URL.createObjectURL(file)
        console.log(url)
        setAvatarImg(url)
        // const res = await http.post(action, formData)
        
        // if (res && res.data.hash) {
        //   onSuccess(res.data.hash)
        // } else {
        //   onError()
        // }
      }
    }
  
    return (
      <Box>
        <input
          accept="image/*"
          name="avatar"
          id="icon-button-file"
          type="file"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <label htmlFor="icon-button-file">
          {!avatarImg && (
            <Avatar
              sx={{
                p: '2px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: 50,
                boxSizing: 'border-box',
                marginTop: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            />
          )}
          {avatarImg && (
            <CardMedia
              component="img"
              alt="avatar"
              image={avatarImg}
              sx={{
                width: 64,
                height: 64,
                borderRadius: 50,
                boxSizing: 'border-box',
                marginTop: '20px',
                cursor: 'pointer'
              }}
            />
          )}
        </label>
      </Box>
    )
  }

export default AvatarUpload