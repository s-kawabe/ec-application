import React, { useCallback, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { getIsSignedIn } from '../../reducks/users/selector'
// import logo from '../../assets/img/icons/logo.png'
import { HeaderMenu, ClosableDrawer } from './index'
import { push } from 'connected-react-router'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: '#fff',
      color: '#444',
    },
    toolbar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
    },
    logo: {
      fontWeight: 'bold',
      transition: '0.2s',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    },
  }),
)

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false)

  // KeibordEventのGenericsを抽象的なものにする
  const handleDrawerToggle = useCallback(
    (
      event:
        | React.KeyboardEvent<HTMLInputElement>
        | React.MouseEvent<HTMLElement>,
      isOpen: boolean,
    ) => {
      if ('key' in event) {
        if (event.key === 'Tab' || event.key === 'Shift') {
          return
        }
      }
      setSideBarOpen(isOpen)
    },
    [setSideBarOpen],
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <h1 onClick={() => dispatch(push('/'))} className={classes.logo}>
            ReduxShop
          </h1>
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
