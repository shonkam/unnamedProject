import { GET_ALL_PRODUCTS } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetAllProducts = (id) => {
  const productID = id ? id : null
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS, {
    variables: { productID }
  })

  while (loading) {
    return null
  }
  if (error) {
    console.log(error)
    // todo noti
  }
  return data
}

export default useGetAllProducts