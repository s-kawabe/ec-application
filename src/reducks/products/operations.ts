import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'

const productsRef = db.collection('products')

export const saveProduct = (
  id: string,
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
  images: string[],
  sizes: string[],
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now()

    interface Data {
      [key: string]: any
    }

    const data: Data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timestamp,
    }

    // 新規登録ページの時のみ
    if (id === '') {
      const ref = productsRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    return productsRef
      .doc(id)
      .set(data, { merge: true }) /* 更新部分を適用する */
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
