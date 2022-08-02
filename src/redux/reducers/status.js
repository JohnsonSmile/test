import { createSlice } from '@reduxjs/toolkit'

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    isLoading: false,
    title: '',
    description: '',
    timeout: 0,
    errmessage: '',
    successMessage: '',
    hide: true
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
    setHide: (state, action) => {
      if (action.payload) {
        state.isLoading = false
        state.title = ''
        state.description = ''
        state.timeout = 0
        state.errmessage = ''
        state.successMessage = ''
        state.hide = true
      } else {
        state.hide = false
      }
    },
    setErrmessage: (state, action) => {
      state.errmessage = action.payload
    },
    setSuccessmessage: (state, action) => {
      state.successMessage = action.payload
    },
  }
})

export const { setLoading, setTitle, setDescription, setTimeoutDuration, setHide, setErrmessage, setSuccessmessage } = statusSlice.actions

// async function
const asyncSetLoading = (isLoading, title="", description="", timeout=0, errMessage="", successMessage="", hide=false,) => (dispatch) => {
    dispatch(setTitle(title))
    dispatch(setDescription(description))
    dispatch(setTimeoutDuration(timeout))
    dispatch(setLoading(isLoading))
    dispatch(setHide(hide))
    dispatch(setErrmessage(errMessage))
    dispatch(setSuccessmessage(successMessage))
    if (!window.timer && isLoading && timeout !== 0) {
      window.timer = setTimeout(() => {
        dispatch(setHide(true))
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
const getHide = (state) => state.statusReducer.hide
const getErrMessage = (state) => state.statusReducer.errmessage
const getSuccessMessage = (state) => state.statusReducer.successMessage


export { getIsLoading, getTitle, getDescription, getTimeoutDuration, getHide, getErrMessage, getSuccessMessage }

export default statusSlice.reducer
  