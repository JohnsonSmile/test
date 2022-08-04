import { Avatar, Box, CardMedia } from "@mui/material"
import { useState } from "react"
import domtoimage from 'dom-to-image';
import { ReactComponent as CameraIcon } from "../../../assets/icon/profile/camera.svg"
import { asyncSetAatar } from "../../../redux/reducers/user";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch()
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

        // TODO: upload image
        // const res = await http.post(action, formData)
        
        // if (res && res.data.hash) {
        //   onSuccess(res.data.hash)
        // } else {
        //   onError()
        // }
        // TODO: fix this to api
        setTimeout(() => {
          console.log('get download')
          const node = document.querySelector('#avatar')
          console.log(node)
          domtoimage.toJpeg(node, { quality: 0.95 }).then((dataUrl) => {
            console.log(dataUrl)
            // setAvatarImg(url)
            onSuccess(dataUrl)
          })
        }, 500);
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
            <Box sx={{position: 'relative'}}>
              <Avatar
                src={avatar}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer', 
                }}
              /> 
              <Box sx={{position: 'absolute', bottom: 0, right: 0}}>
                <CameraIcon  />
              </Box>
            </Box>
          )}
          {avatarImg && (
            <Box 
            id="avatar">
              <CardMedia
                component="img"
                alt="avatar"
                image={avatarImg}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              />
            </Box>
          )}
        </label>
      </Box>
    )
  }

export default AvatarUpload