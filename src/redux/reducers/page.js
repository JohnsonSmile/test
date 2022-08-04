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
    },
    myassets: {
        assetsDetail: {
            usdt: 1234.21,
            nft: 1223,
            vsd: 121.22,
            value: 123124.21,
            totalAssets: 2735
        },
        myNftInfos: {
            totalAmount: 10,
            stakeAmount: 10,
            totalPrice: 750,
            yesterdayGain: 150,
            latestNfts: []
        },
        myVsdInfos: {
            vsdAmount: 11023.23,
            vsdPrice: 0.1,
            vsdTotalPrice: 1120.82,
            stakeRate: 100,
            lpToken: 230,
            vsdCanBeAcheived: 840
        }
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
    setAssetsDetail: (state, action) => {
        const myassets = state.myassets
        state.myassets = {
          ...myassets,
          assetsDetail: action.payload
        }
    },
    setMyNftInfos: (state, action) => {
        const myassets = state.myassets
        state.myassets = {
          ...myassets,
          myNftInfos: action.payload
        }
    },
    setMyVsdInfos: (state, action) => {
        const myassets = state.myassets
        state.myassets = {
            ...myassets,
            myVsdInfos: action.payload
        }
    }
  }
})

export const { 
    setHome, 
    setNftInfos, 
    setSelectedIDs, 
    setMyNft, 
    setBuildTotalCount, 
    setBuildAmount, 
    setAssetsDetail,
    setMyNftInfos,
    setMyVsdInfos,
} = pageSlice.actions

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


const asyncSetAssetsDetail = (detail) => (dispatch) => {
    dispatch(setAssetsDetail(detail))
}

const asyncSetMyNftInfos = (nftinfos) => (dispatch) => {
    dispatch(setMyNftInfos(nftinfos))
}

const asyncSetMyVsdInfos = (vsdinfos) => (dispatch) => {
    dispatch(setMyVsdInfos(vsdinfos))
}

export { 
    asyncSetHome, 
    asyncSetNftInfos, 
    asyncSetSelectedIDs, 
    asyncSetMyNft, 
    asyncSetBuildTotalCount, 
    asyncSetBuildAmount,
    asyncSetAssetsDetail,
    asyncSetMyNftInfos,
    asyncSetMyVsdInfos,
}


// state selector
const getHome = (state) => state.pageReducer.home
const getNftInfos = (state) => state.pageReducer.stake.nftInfos
const getSelectedIDs = (state) => state.pageReducer.stake.selectedIDs
const getMyNft = (state) => state.pageReducer.mynft
const getBuildTotalCount = (state) => state.pageReducer.build.buildTotalCount
const getBuildAmount = (state) => state.pageReducer.build.buildAmount
const getAssetsDetail = (state) => state.pageReducer.myassets.assetsDetail
const getMyNftInfos = (state) => state.pageReducer.myassets.myNftInfos
const getMyVsdInfos = (state) => state.pageReducer.myassets.myVsdInfos

export { 
    getHome, 
    getNftInfos, 
    getSelectedIDs, 
    getMyNft, 
    getBuildTotalCount, 
    getBuildAmount,
    getAssetsDetail,
    getMyNftInfos,
    getMyVsdInfos,
}

export default pageSlice.reducer
  