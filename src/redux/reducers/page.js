import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    home: {
        account: '',
        userName: '',
        avatar: '',
        yesterdayGain: 0,
        isSigned: false,
        nftAmount: 0,
        promotionCount: 0,
        invitationCode: '',
        inviter: '',
    },
    mynft: {
        copperNftInfos: [],
        silverNftInfos: [],
        goldNftInfos: [],
        diamondNftInfos: [],
    },
    stake: {
        nftInfos: [],
        selectedIDs: [],
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
    setMyNft: (state, action) => {
        const mynft = state.mynft
        state.mynft = {
          ...mynft,
          ...action.payload
        }
    },
  }
})

export const { setHome, setNftInfos, setSelectedIDs, setMyNft } = pageSlice.actions

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

const asyncSetMyNft = (mynft) => (dispatch) => {
    dispatch(setMyNft(mynft))
}

export { asyncSetHome, asyncSetNftInfos, asyncSetSelectedIDs, asyncSetMyNft }


// state selector
const getHome = (state) => state.pageReducer.home
const getNftInfos = (state) => state.pageReducer.stake.nftInfos
const getSelectedIDs = (state) => state.pageReducer.stake.selectedIDs
const getMyNft = (state) => state.pageReducer.mynft

export { getHome, getNftInfos, getSelectedIDs, getMyNft }

export default pageSlice.reducer
  