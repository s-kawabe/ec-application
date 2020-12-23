import React, { useEffect } from 'react'
import { ProductCard } from '../components/Products'
import { useDispatch } from 'react-redux'

const ProductList = () => {
  useEffect(() => {
    const dispatch = useDispatch()
  }, [])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row"></div>
    </section>
  )
}

export default ProductList
