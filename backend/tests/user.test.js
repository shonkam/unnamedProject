import { ALL_USERS, ADD_USER, LOGIN, DELETE_USER } from './testQueries.js'
import { testHelper } from './testHelper.js'
import { server as testServer } from '../src/server.js'

testHelper()

describe('tests for users ', () => {
  it('fetches all users', async () => {
    const response = await testServer.executeOperation({
      query: ALL_USERS,
      variables: {}
    })

    expect(response.data.allUsers[0].username).toBe('kayttaja')
    expect(response.data.allUsers[1].username).toBe('user')
  })

  it('creates a new user', async () => {
    const response = await testServer.executeOperation({
      query: ADD_USER,
      variables: {
        "username": "testUser",
        "password": "password"
      }
    })

    expect(response.data.addUser.username).toBe('testUser')
  })

  it('login with a new user', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN,
      variables: {
        "username": "testUser",
        "password": "password"
      }
    })

    expect(response.data.login.tokenValue).toBeTruthy()
  })

  it('deletes a user', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_USER,
      variables: {
        "username": "testUser"
      }
    })

    expect(response.data.deleteUser.message).toBe('Account testUser was successfully deleted')
  })
})