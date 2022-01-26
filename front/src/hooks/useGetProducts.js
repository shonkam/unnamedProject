import { STORE_PRODUCTS } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetProducts = () => {

  const { data } = useQuery(STORE_PRODUCTS)

  return data
}

export default useGetProducts