import {
  ADD_STORE,
  DELETE_STORE,
  ALL_STORES,
  LOGIN_STORE
} from './testQueries.js'
import { testHelper } from './testHelper.js'
import { server as testServer } from '../src/server.js'

testHelper()

describe('tests for users ', () => {
  it('creates a new store', async () => {
    const response = await testServer.executeOperation({
      query: ADD_STORE,
      variables: {
        "email": "testStore@gmail.com",
        "password": "testStorePassword",
        "name": "testStore",
        "address": "test address",
        "city": "test city",
        "postalNumber": "test postal number",
        "country": "test country",
        "categories": ["books", "writing"]
      }
    })

    expect(response.data.addStore.name).toBe('testStore')
    expect(response.data.addStore.password).toBeFalsy()
  })

  it('creates a new store', async () => {
    const response = await testServer.executeOperation({
      query: ADD_STORE,
      variables: {
        "email": "anotherTestStore@gmail.com",
        "password": "anotherTestStorePassword",
        "name": "anotherTestStore",
        "address": "another test address",
        "city": "another test city",
        "postalNumber": "another test postal number",
        "country": "another test country",
        "categories": ["books", "writing"]
      }
    })

    expect(response.data.addStore.name).toBe('anotherTestStore')
    expect(response.data.addStore.password).toBeFalsy()
  })

  it('fetches all stores', async () => {
    const response = await testServer.executeOperation({
      query: ALL_STORES,
      variables: {}
    })

    expect(response.data.allStores[0].name).toBe('testStore')
    expect(response.data.allStores[1].name).toBe('anotherTestStore')
  })

  it('fetches a single store', async () => {
    const response = await testServer.executeOperation({
      query: ALL_STORES,
      variables: {
        "name": "anotherTestStore"
      }
    })

    expect(response.data.allStores[0].name).toBe('anotherTestStore')
  })

  it('login with a new store', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_STORE,
      variables: {
        "email": "testStore@gmail.com",
        "password": "testStorePassword"
      }
    })

    expect(response.data.loginStore.tokenValue).toBeTruthy()
  })

  it('login fails with false input', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_STORE,
      variables: {
        "email": "testStore@gmail.com",
        "password": "wrongPassword"
      }
    })

    expect(response.errors[0].message).toBe("Check credentials")
  })

  it('deletes a store', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_STORE,
      variables: {
        "email": "testStore@gmail.com"
      }
    })
    expect(response.data.deleteStore.message).toBe('Store was successfully deleted')
  })

  it('deletes a store', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_STORE,
      variables: {
        "email": "anotherTestStore@gmail.com"
      }
    })
    expect(response.data.deleteStore.message).toBe('Store was successfully deleted')
  })
})