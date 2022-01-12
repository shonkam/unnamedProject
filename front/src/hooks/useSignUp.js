import { ADD_CUSTOMER } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useSignUp = () => {
  const [mutate] = useMutation(ADD_CUSTOMER)

  const addCustomer = async (email, password) => {

    // mutation returns a boolean
    // about the success of the operation
    const { data } = await mutate({
      variables: {
        email,
        password
      }
    })

    // received boolean is passed
    // into signUp, where the success
    // status is checked
    return data.addCustomer.successful
  }
  return [addCustomer]
}

export default useSignUp