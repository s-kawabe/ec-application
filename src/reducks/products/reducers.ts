import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action: any) => {
  switch (action.type) {
    case Actions.DELETE_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      }
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        // 新しい配列としてreturnするとAction側で新しい配列と見做される
        list: [...action.payload],
      }
    default:
      return state
  }
}
