import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar } from '@material-ui/core'
import AppHeaderLogo from './components/AppHeaderLogo'
import AppHeaderSearch from './components/AppHeaderSearch'
import AppHeaderAction from './components/AppHeaderAction'
// import AppHeaderProfile from './components/AppHeaderProfile'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
})

export default function PrimarySearchAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <AppHeaderLogo />
          <AppHeaderSearch />
          <AppHeaderAction />
          {/* <AppHeaderProfile /> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}
