import React, { useCallback, useEffect, useState } from 'react'
import { SelectBox, TextInput } from '../components/UIkit'
import PrimaryButton from '../components/UIkit/PrimaryButton'
import { useDispatch } from 'react-redux'
import { saveProduct } from '../reducks/products/operations'
import { ImageArea, SetSizeArea } from '../components/Products'
import { db } from '../firebase/index'

const ProductEdit = () => {
  const dispatch = useDispatch()
  // URLのedit/ 以降にproductのidが指定されている場合を判定する
  let id = window.location.pathname.split('/product/edit')[1]
  // URLから新規作成ページか編集ページなのか判定する
  if (id !== '') {
    id = id.split('/')[1]
  }

  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])

  // 別コンポーネント呼び出し時、イベントによるstateの変更をしたい場合は
  // useStateの変更関数をuseCallbackでラップして変更を加える
  const inputName = useCallback(
    (event) => {
      setName(event.target.value)
    },
    [setName],
  )

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value)
    },
    [setDescription],
  )

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value)
    },
    [setPrice],
  )

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
  ]

  const genders = [
    { id: 'all', name: '全て' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ]

  // ComponentDidMount時、URLを解析してfirestoreの商品情報が
  // 設定されている場合、firestoreから当該の商品情報をgetして各フォームに設定した状態で
  // 画面描画する
  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot: any) => {
          const data = snapshot.data()
          setImages(data.images)
          setName(data.name)
          setDescription(data.description)
          setCategory(data.category)
          setGender(data.gender)
          setPrice(data.price)
        })
    }
  }, [id])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        ></SelectBox>
        <SelectBox
          label={'性別'}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        ></SelectBox>
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                ),
              )
            }
          />
        </div>
      </div>
    </section>
  )
}

export default ProductEdit
