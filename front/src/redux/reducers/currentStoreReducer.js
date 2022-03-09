const currentStoreReducer = (state = null, action) => {
  switch (action.type) {
    case 'REMOVE_STORE':
      return state = null
    case 'SET_STORE':
      return action.data
    default:
      return state
  }
}

export const setStore = (store) => {
  return {
    type: 'SET_STORE',
    data: store
  }
}

export const removeStore = () => {
  return {
    type: 'REMOVE_STORE'
  }
}

export default currentStoreReducer