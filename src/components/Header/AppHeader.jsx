import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import AppHeaderAction from './components/AppHeaderAction'
import AppHeaderLogo from './components/AppHeaderLogo'
import AppHeaderProfile from './components/AppHeaderProfile'
import AppHeaderSearch from './components/AppHeaderSearch'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
})

export default function PrimarySearchAppBar(props) {
  const classes = useStyles()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  return (
    <div className={classes.grow}>
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <AppHeaderLogo />
            {props.from == null && isDesktopOrLaptop && <AppHeaderSearch />}
            {user ? <AppHeaderProfile /> : <AppHeaderAction />}
          </Toolbar>
          {props.from == null && !isDesktopOrLaptop && <AppHeaderSearch />}
        </AppBar>
      </React.Fragment>
    </div>
  )
}
