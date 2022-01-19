const userReducer = (state = false, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.data.logged
    case 'USER_LOGGED_OUT':
      return state.user === false
    default:
      return state
  }
}

export const setUserLoggedIn = () => {
  return {
    type: 'USER_LOGGED_IN',
    data: {
      logged: true
    }
  }
}

export const setUserLoggedOut = () => {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export default userReducer