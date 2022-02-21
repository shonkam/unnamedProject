import { GET_STORES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetStores = () => {

  const { data, loading, error } = useQuery(GET_STORES)

  while (loading) {
    return null
  }

  if (error) {
    console.log(error)
    // todo noti
  }
  return data.allStores[0]
}

export default useGetStores