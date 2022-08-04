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
    build: {
        buildTotalCount: 0,
        buildAmount: 1
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
    setBuildTotalCount: (state, action) => {
        const build = state.build
        state.build = {
          ...build,
          buildTotalCount: action.payload
        }
    },
    setBuildAmount: (state, action) => {
        const build = state.build
        state.build = {
          ...build,
          buildAmount: action.payload
        }
    },
  }
})

export const { setHome, setNftInfos, setSelectedIDs, setMyNft, setBuildTotalCount, setBuildAmount } = pageSlice.actions

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

const asyncSetBuildTotalCount = (count) => (dispatch) => {
    dispatch(setBuildTotalCount(count))
}

const asyncSetBuildAmount = (count) => (dispatch) => {
    dispatch(setBuildAmount(count))
}

export { asyncSetHome, asyncSetNftInfos, asyncSetSelectedIDs, asyncSetMyNft, asyncSetBuildTotalCount, asyncSetBuildAmount }


// state selector
const getHome = (state) => state.pageReducer.home
const getNftInfos = (state) => state.pageReducer.stake.nftInfos
const getSelectedIDs = (state) => state.pageReducer.stake.selectedIDs
const getMyNft = (state) => state.pageReducer.mynft
const getBuildTotalCount = (state) => state.pageReducer.build.buildTotalCount
const getBuildAmount = (state) => state.pageReducer.build.buildAmount

export { getHome, getNftInfos, getSelectedIDs, getMyNft, getBuildTotalCount, getBuildAmount }

export default pageSlice.reducer
  