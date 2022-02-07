import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleProduct from '../../hooks/useGetSingleProduct'
import UpdateProductForm from './updateProductForm'

const CustomizeProduct = () => {

  const { id } = useParams()
  const customizedProduct = useGetSingleProduct(id)

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