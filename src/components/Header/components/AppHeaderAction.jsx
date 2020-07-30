import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}))

export default () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <div className={classes.grow} />
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => history.push('signin')}
        className={classes.menuButton}
      >
        Đăng nhập
      </Button>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => history.push('signup')}
      >
        Đăng ký
      </Button>
    </>
  )
}
