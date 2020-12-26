import { createSelector } from 'reselect'

const productsSelector = (state: any) => state.products

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list,
)
