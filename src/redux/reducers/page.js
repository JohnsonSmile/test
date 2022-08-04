import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    home: {
      account: '', 
      id :'', 
      invitationCode: '', 
      inviter: '',
      avatar: '',
      token: ''
    },
    stake: {
        nftInfos: [],
        selectedIDs: []
    }
  },
  reducers: {
    setHome:(state, action) => {
      const home = state.home
      state.home = {
        ...home,
        ...action.payload
      }
    },
    setNftInfos:(state, action) => {
        const stake = state.stake
        state.stake = {
          ...stake,
          nftInfos: action.payload
        }
    },
    setSelectedIDs:(state, action) => {
        const stake = state.stake
        state.stake = {
          ...stake,
          selectedIDs: action.payload
        }
    },
  }
})

export const { setHome, setNftInfos, setSelectedIDs } = pageSlice.actions

// async function
const asyncSetHome = (home) => (dispatch) => {
  dispatch(setHome(home))
}

const asyncSetNftInfos = (nftInfos) => (dispatch) => {
    dispatch(setNftInfos(nftInfos))
}

const asyncSetSelectedIDs = (ids) => (dispatch) => {
    dispatch(setSelectedIDs(ids))
}

export { asyncSetHome, asyncSetNftInfos, asyncSetSelectedIDs }


// state selector
const getHome = (state) => state.pageReducer.home
const getNftInfos = (state) => state.pageReducer.stake.nftInfos
const getSelectedIDs = (state) => state.pageReducer.stake.selectedIDs

export { getHome, getNftInfos, getSelectedIDs }

export default pageSlice.reducer
  