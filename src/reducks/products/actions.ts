export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'
export const deleteProductAction = (products: any) => {
  return {
    type: 'DELETE_PRODUCTS',
    payload: products,
  }
}
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const fetchProductsAction = (products: any) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products,
  }
}
