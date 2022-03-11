import { GET_ORDERS } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetOrders = () => {

  const { data, loading, error } = useQuery(GET_ORDERS)

  while (loading) {
    return null
  }
  if (error) {
    console.log(error)
    // todo noti
  }
  return data.allOrders
}

export default useGetOrders