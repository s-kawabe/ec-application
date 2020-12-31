const initialState = {
  products: {
    // トップページに表示する商品情報を格納する
    list: [],
  },
  users: {
    cart: [],
    isSignedIn: false,
    orders: [],
    role: '',
    uid: '',
    userName: '',
  },
}

export default initialState
