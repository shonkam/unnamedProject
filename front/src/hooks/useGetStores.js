import { GET_STORES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useGetStores = (singleStore) => {

  const { data, error, loading } = useQuery(GET_STORES)

  while (loading) {
    return null
  }
  if (error) {
    console.log(error)
    // todo noti
  }

  if (singleStore) {
    return data.allStores[0]
  }
  else {
    return data.allStores
  }
}

export default useGetStores