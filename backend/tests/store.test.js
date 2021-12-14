import { ApolloServer } from 'apollo-server-express'
import { schema } from '../src/schema'
import index from '../index'
import { ADD_STORE, DELETE_STORE, ALL_STORES } from './testQueries.js'


describe('tests for users ', () => {
  const testServer = new ApolloServer({
    schema
  })

  it('creates a new store', async () => {
    const response = await testServer.executeOperation({
      query: ADD_STORE,
      variables: {
        "name": "testStore",
        "address": "test address",
        "city": "test city",
        "postalNumber": "test postal number",
        "country": "test country",
        "categories": ["books", "writing"]
      }
    })

    expect(response.data.addStore.name).toBe('testStore')
  })

  it('fetches all stores', async () => {
    const response = await testServer.executeOperation({
      query: ALL_STORES,
      variables: {}
    })

    expect(response.data.allStores[0].name).toBe('staying Store')
    expect(response.data.allStores[1].name).toBe('testStore')
  })

  it('deletes a store', async () => {
    const response = await testServer.executeOperation({
      query: DELETE_STORE,
      variables: {
        "name": "testStore"
      }
    })

    expect(response.data.deleteStore.message).toBe('Store testStore was successfully deleted')
  })
})


afterAll(async () => {
  //todo make jest close without force exit
  //const close = true
  //await connectToMongoDB(close)
  console.log('store end')
})