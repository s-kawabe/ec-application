import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core'
// import { useDispatch } from 'react-redux';
import { storage } from '../../firebase/index'

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

  const uploadImage = useCallback(
    (event: any) => {
      const file = event.target.files
      let blob = new Blob(file, { type: 'image/jpeg' })

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
            props.setImages((prevState: any) => [...prevState, newImage])
          })
        })
        .catch(() => {})
    },
    [props],
  )

  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録</span>
        <IconButton className={classes.icon}>
          <label>
            <CloudUploadIcon />
            <input
              className="u-display-none"
              type="text"
              id="image"
              onClick={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
