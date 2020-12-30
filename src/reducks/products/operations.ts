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

export const orderProduct = (productsInCart: any, price: number) => {
  return async (dispatch: any, getState: any) => {
    const uid = getState().users.uid
    const userRef = db.collection('users').doc(uid)
    const timestamp = FirebaseTimestamp.now()

    let products: any = []
    let soldOutProducts: string[] = []

    const batch = db.batch()

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get()
      const sizes = snapshot.data()?.sizes

      const updatedSizes = sizes.map((size: any) => {
        if (size.size === product.size) {
          // syncronous buy with other user
          if (size.quantity === 0) {
            soldOutProducts.push(product.name)
            return size
          }
          // user product buy
          return {
            size: size.size,
            quantity: size.quantity - 1,
          }
        } else {
          return size
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      })

      // product quantity -1 update
      batch.update(productsRef.doc(product.productId), { sizes: updatedSizes })

      // delete buied product in user cart
      batch.delete(userRef.collection('cart').doc(product.cartId))
    }

    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join('と')
          : soldOutProducts[0]
      alert(
        `申し訳ありません。${errorMessage}が在庫切れとなった為、注文をキャンセルします`,
      )
      return false
    } else {
      // no probrem! transaction commit!
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc()
          const date = timestamp.toDate()
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3)),
          )

          const history = {
            amount: price,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          }
          console.log(history)
          console.log(orderRef.set(history))

          orderRef.set(history)
          dispatch(push('/order/complete'))
        })
        .catch((error: any) => {
          console.log(error)
          alert(
            '注文処理に失敗しました。通信環境をご確認の上、もう一度お試しください。',
          )
          return false
        })
    }
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
