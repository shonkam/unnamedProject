import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'
import thunk from 'redux-thunk'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3030',
  })
})

const reducer = combineReducers({
  user: userReducer,
  shoppingCart: shoppingCartReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client} >
    <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);