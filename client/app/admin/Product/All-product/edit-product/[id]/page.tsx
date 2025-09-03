import React from 'react'
import ProductForm from './components/ProductForm'

interface PageProps {
  params: {
    id: string
  }
}

function page({ params }: PageProps) {
  return (
    <ProductForm productId={params.id} />
  )
}

export default page
