import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles({
  formControl: {
    marginBottom: 16,
    minWidth: 120,
    width: '100%',
  },
})

const SelectBox = (props: any) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        // リスト選択が変更される旅にuseStateの変更関数を呼ぶ
        onChange={(event) => props.select(event.target.value)}
      >
        {/* optionsはセレクトボックス内のアイテム配列 */}
        {props.options.map((value: any) => {
          return (
            <MenuItem key={value.id} value={value.id}>
              {value.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectBox
