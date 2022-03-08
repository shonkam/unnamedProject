const shoppingCartReducer = (state = [], action) => {
  switch (action.type) {
    case 'EMPTY_CART':
      return state = []
    case 'ADD_PRODUCT':
      return [...state, action.data.shoppingCart]
    default:
      return state
  }
}

export const addProductToCart = (product) => {
  return {
    type: 'ADD_PRODUCT',
    data: {
      shoppingCart: product
    }
  }
}

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART'
  }
}

export default shoppingCartReducer