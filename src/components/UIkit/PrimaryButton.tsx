import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

// 追加の独自スタイル設定
const useStyles = makeStyles({
  // buttonクラスのスタイル定義
  button: {
    backgroundColor: '#4dd0c1',
    color: '#000',
    fontSize: 16,
    height: 48,
    magrinBottom: 16,
    width: 256,
  },
})

const PrimaryButton = (props: any) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {/* label: ボタンに表示する文字列 */}
      {props.label}
    </Button>
  )
}

export default PrimaryButton
