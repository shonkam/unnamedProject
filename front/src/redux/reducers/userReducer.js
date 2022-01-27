const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.data.userType
    case 'REMOVE_USER_TYPE':
      return state === null
    default:
      return state
  }
}

export const setUserType = (userType) => {
  return {
    type: 'SET_USER_TYPE',
    data: {
      userType: userType
    }
  }
}

export const removeUserType = () => {
  return {
    type: 'REMOVE_USER_TYPE'
  }
}

export default userReducer