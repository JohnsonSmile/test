import { createSlice } from '@reduxjs/toolkit'

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    isLoading: false,
    title: '',
    description: '',
    timeout: 15000,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setTitle: (state, action) => {
      console.log(action)
      state.title = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setTimeoutDuration: (state, action) => {
      state.timeout = action.payload
    },
  }
})

export const { setLoading, setTitle, setDescription, setTimeoutDuration } = statusSlice.actions

// async function
const asyncSetLoading = (isLoading, title="", description="", timeout=10000) => (dispatch) => {
    dispatch(setTitle(title))
    dispatch(setDescription(description))
    dispatch(setTimeoutDuration(timeout))
    dispatch(setLoading(isLoading))
    if (!window.timer && isLoading) {
      window.timer = setTimeout(() => {
        dispatch(setLoading(false))
        clearTimeout(window.timer)
        window.timer = null
      }, timeout)
    } else if (!isLoading) {
      if (window.timer) {
        clearTimeout(window.timer)
        window.timer = null
      }
    }
}

export { asyncSetLoading }


// state selector
const getIsLoading = (state) => state.statusReducer.isLoading
const getTitle= (state) => state.statusReducer.title
const getDescription = (state) => state.statusReducer.description
const getTimeoutDuration = (state) => state.statusReducer.timeout


export { getIsLoading, getTitle, getDescription, getTimeoutDuration }

export default statusSlice.reducer
  