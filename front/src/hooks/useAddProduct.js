import { ADD_PRODUCT } from '../graphql/queries'
import { useMutation } from '@apollo/client'

const useAddProduct = () => {
  const [mutate] = useMutation(ADD_PRODUCT)

  const addProduct = async (values) => {
    console.log('addproduct hook')
    const productName = values.productName
    const productPrice = parseFloat(values.productPrice)
    const productStock = parseInt(values.productStock)
    const productPictureURL = values.productPictureURL
    const productDescription = values.productDescription

    // mutation returns a boolean
    // about the success of the operation
    const { data } = await mutate({
      variables: {
        productName,
        productPrice,
        productStock,
        productPictureURL,
        productDescription
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