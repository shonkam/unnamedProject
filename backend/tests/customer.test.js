import {
  ALL_CUSTOMERS,
  ADD_CUSTOMER,
  LOGIN_CUSTOMER,
  DELETE_CUSTOMER
} from './testQueries.js'
import { testHelper } from './testHelper.js'
import { server as testServer } from '../src/server.js'

testHelper()

describe('tests for customers ', () => {

  it('creates a new customer', async () => {
    const response = await testServer.executeOperation({
      query: ADD_CUSTOMER,
      variables: {
        'email': 'test@gmail.com',
        'password': 'password'
      }
    })

    expect(response.data.addCustomer.email).toBe('test@gmail.com')
  })

  it('customer creation fails when a customer already exists', async () => {
    const response = await testServer.executeOperation({
      query: ADD_CUSTOMER,
      variables: {
        'email': 'test@gmail.com',
        'password': 'password'
      }
    })

    expect(response.errors[0].message).toMatch('E11000 duplicate key error collection')
  })

  it('fetches a single customer', async () => {
    const response = await testServer.executeOperation({
      query: ALL_CUSTOMERS,
      variables: {
        'email': 'test@gmail.com'
      }
    })

    expect(response.data.allCustomers[0].email).toBe('test@gmail.com')
  })

  it('creates another new customer', async () => {
    const response = await testServer.executeOperation({
      query: ADD_CUSTOMER,
      variables: {
        'email': 'anotherTest@gmail.com',
        'password': 'password'
      }
    })

    expect(response.data.addCustomer.email).toBe('anothertest@gmail.com')
  })
  it('fetches all customer', async () => {
    const response = await testServer.executeOperation({
      query: ALL_CUSTOMERS,
      variables: {}
    })

    expect(response.data.allCustomers[0].email).toBe('test@gmail.com')
    expect(response.data.allCustomers[1].email).toBe('anothertest@gmail.com')
  })

  it('login with a new customer', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_CUSTOMER,
      variables: {
        'email': 'test@gmail.com',
        'password': 'password'
      }
    })

    expect(response.data.loginCustomer.tokenValue).toBeTruthy()
  })

  it('login fails with false input', async () => {
    const response = await testServer.executeOperation({
      query: LOGIN_CUSTOMER,
      variables: {
        'email': 'test@gmail.com',
        'password': 'wrongPassword'
      }
    })

    expect(response.errors[0].message).toBe('Check credentials')
  })

  it('deletes a customer', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_CUSTOMER,
      variables: {
        'email': 'test@gmail.com'
      }
    })

    expect(response.data.deleteCustomer.message).toBe('Account "test@gmail.com" was successfully deleted')
  })

  it('deletes a customer', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_CUSTOMER,
      variables: {
        'email': 'anotherTest@gmail.com'
      }
    })

    expect(response.data.deleteCustomer.message).toBe('Account "anotherTest@gmail.com" was successfully deleted')
  })
})