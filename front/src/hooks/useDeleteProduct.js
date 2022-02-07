import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useDeleteProduct = () => {
  const [mutateProduct] = useMutation(DELETE_PRODUCT)

  const deleteProduct = async (productID) => {
    const { data, error } = await mutateProduct({
      variables: {
        productID: productID,
      },
      refetchQueries: [{ query: GET_ALL_PRODUCTS }]
    })

    if (error) {
      console.log(error)
      // todo noti
    }
    return data.deleteProduct.successful
  }
  return [deleteProduct]
}

export default useDeleteProduct