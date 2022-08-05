import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    signInfos: {},
    account: ""
  },
  reducers: {
    setSignInfo: (state, action) => {
      const signInfos = {...state.signInfos}
      signInfos[action.payload.account] = action.payload.sigHex;
      state.signInfos = signInfos;
    },
    setAccount: (state, action) => {
      console.log(action.payload)
      state.account = action.payload
    }
  }
})

export const { setSignInfo, setAccount } = walletSlice.actions

// async function
const asyncSetSignInfo = ({ account, sigHex }) => (dispatch) => {
    dispatch(setSignInfo({account, sigHex }))
}
const asyncSetAccount = (account) => (dispatch) => {
  dispatch(setAccount(account))
}

export { asyncSetSignInfo, asyncSetAccount }


// state selector
const getSigInfo = (state) => {
  console.log(state)
  return state.walletReducer.signInfos
}

const getAccount = (state) => state.walletReducer.account

export { getSigInfo, getAccount }

export default walletSlice.reducer
  