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
  /*
  it('creates a new store', async () => {
    const response = await testServer.executeOperation({
      query: ADD_STORE,
      variables: {
        "email": "testStore@gmail.com",
        "password": "testStorePassword",
        "name": "testStore",
        "address": "test address      ",
        "city": "OUlu",
        "postalNumber": 90000,
        "country": "finlaND"
      }
    })

    expect(response.data.addStore.name).toBe('testStore')
    expect(response.data.addStore.email).toBe('teststore@gmail.com')
    expect(response.data.addStore.location.address).toBe('test address')
    expect(response.data.addStore.location.city).toBe('oulu')
    expect(response.data.addStore.location.address).toBe('test address')
    expect(response.data.addStore.location.country).toBe('FINLAND')
    expect(response.data.addStore.location.postalNumber).toBe('90000')
    expect(response.data.addStore.password).toBeFalsy()
  })
  
    it('creates a new store', async () => {
      const response = await testServer.executeOperation({
        query: ADD_STORE,
        variables: {
          "email": "constantTestStore@gmail.com",
          "password": "constantTestStorePassword",
          "name": "constantTestStore",
          "address": "constant test address",
          "city": "constant test city",
          "postalNumber": 9000,
          "country": "constant test country"
        }
      })
  
      expect(response.data.addStore.name).toBe('constantTestStore')
      expect(response.data.addStore.password).toBeFalsy()
    })
  
    it('fetches all stores', async () => {
      const response = await testServer.executeOperation({
        query: ALL_STORES,
        variables: {}
      })
  
      expect(response.data.allStores[0].name).toBe('constantTestStore')
      expect(response.data.allStores[1].name).toBe('testStore')
    })
  */
  it('fetches a single store', async () => {
    const response = await testServer.executeOperation({
      query: ALL_STORES,
      variables: {
        'name': 'constantTestStore'
      }
    })

    expect(response.data.allStores[0].name).toBe('constantTestStore')
  })

  it('login with a new store', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_STORE,
      variables: {
        'email': 'testStore@gmail.com',
        'password': 'testStorePassword'
      }
    })

    expect(response.data.loginStore.tokenValue).toBeTruthy()
  })

  it('login fails with false input', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_STORE,
      variables: {
        'email': 'testStore@gmail.com',
        'password': 'wrongPassword'
      }
    })

    expect(response.errors[0].message).toBe('Check credentials')
  })

  it('fails to delete store without token', async () => {


    const response = await testServer.executeOperation({
      query: DELETE_STORE
    })

    expect(response.errors[0].message).toBe('not authorized')
  })
  /*
    it('deletes a store', async () => {
      const loginResponse = await testServer.executeOperation({
        query: LOGIN_STORE,
        variables: {
          "email": "testStore@gmail.com",
          "password": "testStorePassword"
        }
      })
  
      const storeToken = loginResponse.data.loginStore.tokenValue
      console.log(`bearer ${storeToken}`)
      const response = await testServer.executeOperation({
        query: DELETE_STORE,
        authorization: `bearer ${storeToken}`
  
      })
      console.log(response)
      expect(response.data.deleteStore.message).toBe('Store was successfully deleted')
    })
    */
})