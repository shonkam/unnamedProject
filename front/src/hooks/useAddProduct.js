import { ADD_PRODUCT } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useAddProduct = () => {
  const [mutate] = useMutation(ADD_PRODUCT)

  const addProduct = async (values) => {

    const tempPrice = parseFloat(values.productPrice)
    const productPrice = tempPrice.toFixed(2)

    const productStock = parseInt(values.productStock)

    // mutation returns a boolean
    // about the success of the operation
    const { data } = await mutate({
      variables: {
        productName: values.productName,
        productPrice: productPrice,
        productStock: productStock,
        productPictureURL: values.productPictureURL,
        productDescription: values.productDescription
      }
    })

    // received boolean is passed
    // into component, where the success
    // status is checked
    return data.addProduct.successful
  }
  return [addProduct]
}

export default useAddProduct