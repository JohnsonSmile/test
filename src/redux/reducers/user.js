const initialUser = {
    userInfo: {
      Following: false
    },
    // token: null,
    token: '',
    DIDMeta: {}
  }
  
  const UserReducer = (state = initialUser, action) => {
    switch (action.type) {
      case 'USER_INFO':
        return { ...state, userInfo: { ...action.value } }
      case 'SET_USER_TOKEN':
        return { ...state, token: action.value }
      case 'SET_FOLLOW':
        return {
          ...state,
          userInfo: { ...state.userInfo, Following: action.value }
        }
      case 'DID_META':
        return { ...state, DIDMeta: { ...action.value } }
      default:
        return state
    }
  }
  
  export default UserReducer
  