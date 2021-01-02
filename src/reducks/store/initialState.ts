const initialState = {
  products: {
    // トップページに表示する商品情報を格納する
    list: [],
  },
  users: {
    cart: [],
    customer_id: '',
    email: '',
    isSignedIn: false,
    orders: [],
    payment_method_id: '',
    role: '',
    uid: '',
    userName: '',
  },
}

export default initialState
