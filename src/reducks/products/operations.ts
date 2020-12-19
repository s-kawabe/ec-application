import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'

const productsRef = db.collection('products')

export const saveProduct = (
  name: string,
  description: string,
  category: string,
  gender: string,
  price: string,
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
      name: name,
      price: parseInt(price, 10),
      updated_at: timestamp,
    }

    const ref = productsRef.doc()
    const id = ref.id
    data.id = id
    data.created_at = timestamp

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw Error(error)
      })
  }
}
