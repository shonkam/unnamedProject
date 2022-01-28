import { GET_SINGLE_PRODUCT } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetSingleProduct = (productID) => {

  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productID }
  })

  while (loading) {
    return null
  }
  if (error) {
    console.log(error)
    // todo noti
  }
  return data.singleProduct
}

export default useGetSingleProduct