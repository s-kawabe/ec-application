import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import { getOrdersHistory } from '../reducks/users/selector'
// import {OrderHistoryItem} from "../components/Products";
import { fetchOrdersHistory } from '../reducks/users/operations'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { OrderHistoryItem } from 'components/Products'

const useStyles = makeStyles((theme: Theme) => ({
  orderList: {
    background: theme.palette.grey['100'],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 768,
    },
  },
}))

const OrderHistory = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const orders = getOrdersHistory(selector)

  // renderされたらStoreをinitialStateの状態から更新する
  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])

  return (
    <section className="c-section-wrapin">
      <List className={classes.orderList}>
        {orders.length > 0 &&
          orders.map((order: any) => (
            <OrderHistoryItem order={order} key={order.id} />
          ))}
      </List>
    </section>
  )
}

export default OrderHistory
