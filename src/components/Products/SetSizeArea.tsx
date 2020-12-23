import React, { useState, useCallback, useEffect } from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core'
import TextInput from '../UIkit/TextInput'

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
})

const SetSizeArea = (props: any) => {
  const classes = useStyles()

  const [index, setIndex] = useState(0)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value)
    },
    [setSize],
  )

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value)
    },
    [setQuantity],
  )

  const addSize = (index: any, size: string, quantity: any) => {
    if (size === '' || quantity === '') {
      // Required input is blank
      return false
    } else {
      if (index === props.sizes.length) {
        // prevState→現在のstateの状態を引数にとれる
        props.setSizes((prevState: any) => [
          ...prevState,
          { size: size, quantity: quantity },
        ])
        setIndex(index + 1)
        setSize('')
        setQuantity(0)
        return
      } else {
        const newSizes = props.sizes
        newSizes[index] = { size: size, quantity: quantity }
        props.setSizes(newSizes)
        setIndex(newSizes.length)
        setSize('')
        setQuantity(0)
        return
      }
    }
  }

  const editSize = (index: any, size: any, quantity: any) => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
  }

  const deleteSize = (index: any) => {
    const newSizes = props.sizes.filter((item: any, i: any) => {
      console.log(item)
      return i !== index
    })
    props.setSizes(newSizes)
  }

  useEffect(() => {
    setIndex(props.sizes.length)
  }, [props.sizes])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* 1行目 */}
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ２行目 */}
            {props.sizes.length > 0 &&
              props.sizes.map((item: any, i: number) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.iconCell}
                      onClick={() => deleteSize(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={'text'}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
          />
        </div>
        <IconButton
          className={classes.checkIcon}
          onClick={() => addSize(index, size, quantity)}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea
