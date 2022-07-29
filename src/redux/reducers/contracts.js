import { createSlice } from '@reduxjs/toolkit'

export const contractsSlice = createSlice({
  name: 'status',
  initialState: {
    contractInfo: {
        tokenURI: ''
    }
  },
  reducers: {
    setTokenURI: (state, action) => {
        const contractInfo = state.contractInfo
        state.contractInfo = {
            ...contractInfo,
            tokenURI: action.payload
        }
    },
  }
})

export const { setTokenURI } = contractsSlice.actions

// async function
const asyncSetTokenURI = (tokenURI) => (dispatch) => {
    dispatch(setTokenURI(tokenURI))
}

export { asyncSetTokenURI }


// state selector
const getTokenURI = (state) => state.contractsReducer.isLoading


export { getTokenURI }

export default contractsSlice.reducer
  