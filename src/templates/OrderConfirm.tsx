import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart } from '../reducks/users/selector'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { CartListItem } from '../components/Products'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { TextDetail } from '../components/UIkit'
import { orderProduct } from '../reducks/products/operations'
import PrimaryButton from '../components/UIkit/PrimaryButton'

const useStyles = makeStyles((theme: Theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 512,
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
    '& > *:nth-child(1n)': {
      marginBottom: '10px',
    },
  },
}))

const OrderConfirm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const productsInCart = getProductsInCart(selector)

  // 関数のメモ化 関数の中で計算処理を書いて、第２引数に指定した値が変わるたびに再計算される
  // →productsInCartの中身が変わるたびに再計算する
  const subTotal = useMemo(() => {
    return productsInCart.reduce(
      (sum: number, product: any) => (sum += product.price),
      0,
    )
  }, [productsInCart])

  const shippingFee = subTotal >= 10000 ? 0 : 210
  const tax = subTotal * 0.1
  const total = subTotal + shippingFee + tax

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map((product: any) => (
                <CartListItem product={product} key={product.cartId} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={'商品合計'}
            value={'¥' + subTotal.toLocaleString()}
          ></TextDetail>
          <TextDetail
            label={'送料'}
            value={'¥' + shippingFee.toLocaleString()}
          ></TextDetail>
          <TextDetail label={'消費税'} value={'¥' + tax}></TextDetail>
          <Divider />
          <TextDetail
            label={'合計価格'}
            value={'¥' + total.toLocaleString()}
          ></TextDetail>
          <PrimaryButton label={'注文を確定する'} onClick={order} />
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm
