import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      account: '', 
      id :'', 
      invitationCode: '', 
      inviter: '',
      avatar: '',
      token: ''
    },
    avatar: '',
    userName: ''
  },
  reducers: {
    setUserInfo:(state, action) => {
      const userInfo = state.userInfo
      state.userInfo = {
        ...userInfo,
        ...action.payload
      }
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    },
  }
})

export const { setUserInfo, setAvatar, setUserName } = userSlice.actions

// async function
const asyncSetUserInfo = (userInfo) => (dispatch) => {
  dispatch(setUserInfo(userInfo))
}

const asyncSetAatar = (avatar) => (dispatch) => {
  dispatch(setAvatar(avatar))
}

const asyncSetUserName = (avatar) => (dispatch) => {
  dispatch(setUserName(avatar))
}

export { asyncSetUserInfo, asyncSetAatar, asyncSetUserName }


// state selector
const getUserInfo = (state) => state.userReducer.userInfo
const getAvatar = (state) => state.userReducer.avatar
const getUserName = (state) => state.userReducer.userName

export { getUserInfo, getAvatar, getUserName }

export default userSlice.reducer
  