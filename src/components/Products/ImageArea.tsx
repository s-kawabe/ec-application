import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core'
// import { useDispatch } from 'react-redux';
import { storage } from '../../firebase/index'
import ImagePreview from './ImagePreview'

const useStyles = makeStyles({
  icon: {
    marginRight: 8,
    height: 48,
    width: 48,
  },
})

const ImageArea = (props: any) => {
  const classes = useStyles()
  // const dispatch = useDispatch();
  const images = props.images

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('この画像を削除しますか？')
      if (!ret) {
        return false
      } else {
        const newImages = images.filter((image: any) => image.id !== id)
        props.setImages(newImages)
        return storage.ref('images').child(id).delete()
      }
    },
    [images, props],
  )

  const uploadImage = useCallback(
    (event: any) => {
      const file = event.target.files
      let blob = new Blob(file, { type: 'image/png' })

      // Generate random 16 digits strings
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')

      const uploadRef = storage.ref('images').child(fileName)
      const uploadTask = uploadRef.put(blob)

      uploadTask
        .then(() => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = { id: fileName, path: downloadURL }
            // prevState→現在のstateの状態を引数にとれる
            props.setImages((prevState: any) => [...prevState, newImage])
          })
        })
        .catch(() => {})
    },
    [props],
  )

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 &&
          props.images.map((image: any) => (
            <ImagePreview
              delete={deleteImage}
              id={image.id}
              path={image.path}
              key={image.id}
            ></ImagePreview>
          ))}
      </div>
      <div className="u-text-right">
        <span>商品画像を登録</span>
        <IconButton className={classes.icon}>
          <label>
            <CloudUploadIcon />
            <input
              className="u-display-none"
              type="file"
              id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
