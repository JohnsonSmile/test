import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    signInfos: [],
    account: ""
  },
  reducers: {
    setSignInfo: (state, action) => {
      const index = state.signInfos.findIndex(signInfo => signInfo.account === action.payload.account);
      console.log(action.payload)
      if (index >= 0) {
        const signInfos = [...state.signInfos]
        signInfos[index] = action.payload.sigHex;
        state.signInfos = signInfos;
      } else {
        const signInfos = [...state.signInfos]
        signInfos.push({account: action.payload.account, sigHex: action.payload.sigHex})
        state.signInfos = signInfos
      }
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
  const index = state.walletReducer.signInfos.findIndex(signInfo => signInfo.account === state.walletReducer.account);
  if (index >= 0) {
    return state.walletReducer.signInfos[index]
  } else {
    return {}
  }
}

const getAccount = (state) => state.walletReducer.account

export { getSigInfo, getAccount }

export default walletSlice.reducer
  