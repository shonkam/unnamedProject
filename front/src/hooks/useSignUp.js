import { ADD_CUSTOMER, ADD_STORE } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useSignUp = () => {
  const [mutateCustomer] = useMutation(ADD_CUSTOMER)
  const [mutateStore] = useMutation(ADD_STORE)

  const addUser = async (values) => {
    const email = values.email
    const password = values.password
    const userType = values.userType

    if (userType === 'customer') {
      // mutation returns a boolean
      // about the success of the operation
      const { data } = await mutateCustomer({
        variables: {
          email,
          password
        }
      })

      // received boolean is passed
      // into signUp, where the success
      // status is checked
      return data.addCustomer.successful
    } else if (userType === 'store') {
      const name = values.storeName
      const description = values.storeDescription
      const backgroundPictureURL = values.storeBackgroundPictureURL
      const country = values.storeCountry
      const postalNumber = parseInt(values.storePostalNumber)
      const address = values.storeAddress
      const city = values.storeCity

      const { data } = await mutateStore({
        variables: {
          email,
          password,
          name,
          description,
          backgroundPictureURL,
          country,
          postalNumber,
          address,
          city
        }
      })

      return data.addStore.successful
    } else {
      console.log('something went really wrong')
      return false
    }
  }
  return [addUser]
}

export default useSignUp