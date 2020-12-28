import { db } from '../firebase'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import HTMLReactParser from 'html-react-parser'
import { ImageSwiper, SizeTable } from '../components/Products'

const useStyles = makeStyles((theme: any) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}))

// 改行コードをbrタグに置き換える
const returnCodeBr = (text: any) => {
  if (text === '') {
    return text
  } else {
    return HTMLReactParser(text.replace('/\r?\n/', '<br/>'))
  }
}

const ProductDetail = () => {
  const classes = useStyles()
  const selector = useSelector((state: any) => state)
  const path = selector.router.location.pathname
  const id = path.split('/product/')[1]

  type Product = {
    name: string
    description: string
    price: number
    images: string
    sizes: {
      quantity: string
      size: string
    }[]
  } | null

  const [product, setProduct] = useState<Product>(null)

  // URLで指定されたidをもとにDBから１件データを取得しローカルステートを更新
  useEffect(() => {
    db.collection('products')
      .doc(id)
      .get()
      .then((doc: any) => {
        const data: Product = doc.data()
        setProduct(data)
      })
  }, [id])

  return (
    <section className="c-section-wrappin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--small"></div>
            <SizeTable sizes={product.sizes} />
            <div className="module-spacer--small"></div>
            <p>{returnCodeBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
