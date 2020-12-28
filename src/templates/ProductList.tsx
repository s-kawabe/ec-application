import React, { useEffect } from 'react'
import { ProductCard } from '../components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from 'reducks/products/operations'
import { getProducts } from '../reducks/products/selector'

const ProductList = () => {
  const dispatch = useDispatch()
  // Store全体を取得
  const selector = useSelector((state) => state)
  const products = getProducts(selector)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
    </section>
  )
}

export default ProductList
