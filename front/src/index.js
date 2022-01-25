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
import store from './redux/reduxStore'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3030',
  })
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);