import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  user: userReducer,
  shoppingCart: shoppingCartReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store