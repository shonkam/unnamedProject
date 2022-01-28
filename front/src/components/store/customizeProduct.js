import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleProduct from '../../hooks/useGetSingleProduct'
import UpdateProductForm from './updateProductForm'

const CustomizeProduct = () => {

  const { id } = useParams()
  console.log(id)

  const customizedProduct = useGetSingleProduct(id)
  console.log(customizedProduct)
  while (!customizedProduct) {
    return (
      <div>loading...</div>
    )
  }
  return (
    < UpdateProductForm customizedProduct={customizedProduct} />
  )


}

export default CustomizeProduct