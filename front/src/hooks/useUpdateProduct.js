import { UPDATE_PRODUCT } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useUpdateProduct = () => {
  const [mutateProduct] = useMutation(UPDATE_PRODUCT)

  const updateProduct = async (updatedProduct) => {

    const tempPrice = parseFloat(updatedProduct.productPrice)
    const productPrice = tempPrice.toFixed(2)

    const productStock = parseInt(updatedProduct.productStock)

    const { data, error } = await mutateProduct({
      variables: {
        productID: updatedProduct.id,
        productName: updatedProduct.productName,
        productPrice: productPrice,
        productStock: productStock,
        productPictureURL: updatedProduct.productPictureURL,
        productDescription: updatedProduct.productDescription
      }
    })

    if (error) {
      console.log(error)
      // todo noti
    }
    return data.updateProduct.successful
  }
  return [updateProduct]
}

export default useUpdateProduct