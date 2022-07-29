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
    }
  },
  reducers: {
    setUserInfo:(state, action) => {
      console.log(action.payload)
      const userInfo = state.userInfo
      state.userInfo = {
        ...userInfo,
        ...action.payload
      }
    }
  }
})

export const { setUserInfo } = userSlice.actions

// async function
const asyncSetUserInfo = (userInfo) => (dispatch) => {
  dispatch(setUserInfo(userInfo))
}

export { asyncSetUserInfo }


// state selector
const getUserInfo = (state) => state.userReducer.userInfo

export { getUserInfo }

export default userSlice.reducer
  