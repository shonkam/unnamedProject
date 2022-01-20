import { LOGIN_STORE } from "../graphql/queries"
import { useMutation } from '@apollo/client'

const useStoreLogin = () => {
  const [mutate] = useMutation(LOGIN_STORE)

  const loginStore = async (email, password) => {

    // mutation returns a jwt 
    // token if params are correct
    const { data } = await mutate({
      variables: {
        email,
        password
      }
    })

    // forward token if received
    // else return false
    if (data.loginStore.token) {
      return data.loginStore.token
    }
    else {
      return false
    }
  }
  return [loginStore]
}

export default useStoreLogin