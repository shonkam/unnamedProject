import { ADD_CUSTOMER } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useSignUp = () => {
  const [mutate] = useMutation(ADD_CUSTOMER)

  const addCustomer = async (email, password) => {

    // mutation return a message
    // containing info about the
    // success of the operation
    const { data } = await mutate({
      variables: {
        email,
        password
      }
    })
    return data.addCustomer.successful
  }
  return [addCustomer]
}

export default useSignUp