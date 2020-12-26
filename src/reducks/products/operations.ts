import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'
import { deleteProductAction, fetchProductsAction } from './actions'

const productsRef = db.collection('products')

export const deleteProduct = (id: string) => {
  return async (dispatch: any, getState: any) => {
    productsRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list
        // 引数のidと一致しない物だけ残す(引数のidのデータを削除した配列を再生成)
        const nextProducts = prevProducts.filter(
          (product: any) => product.id !== id,
        )
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const fetchProducts = () => {
  return async (dispatch: any) => {
    // updated_atキーを基準に降順に並び替える
    productsRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const productsList: any = []
        snapshots.forEach((snapshot) => {
          const product = snapshot.data()
          productsList.push(product)
        })
        dispatch(fetchProductsAction(productsList))
      })
  }
}

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
