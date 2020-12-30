import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Badge } from '@material-ui/core'
import { fetchProductsInCart } from '../../reducks/users/operations'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInCart, getUserId } from '../../reducks/users/selector'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { db } from '../../firebase/index'
import MenuIcon from '@material-ui/icons/Menu'

const HeaderMenu = (props: any) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const userId = getUserId(selector)
  let productsInCart = getProductsInCart(selector)

  // Listen products in user's cart
  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(userId)
      .collection('cart')
      // snapshots to many item return by cart collection
      .onSnapshot((snapshots: any) => {
        snapshots.docChanges().forEach((change: any) => {
          const product = change.doc.data()
          const changeType = change.type

          switch (changeType) {
            case 'added':
              productsInCart.push(product)
              break
            case 'modified':
              const index = productsInCart.findIndex(
                (product: any) => product.cartId === change.doc.id,
              )
              productsInCart[index] = product
              break
            case 'removed':
              productsInCart = productsInCart.filter(
                (product: any) => product.cartId !== change.doc.id,
              )
              break
            default:
              break
          }
        })

        dispatch(fetchProductsInCart(productsInCart))
      })

    // execute unsubscribe when do ComponentWillUnmount.
    return () => unsubscribe()
  }, [])

  return (
    <>
      <IconButton>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton
        aria-label="Menu Items"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e) => props.handleDrawerToggle(e, true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </>
  )
}
export default HeaderMenu
