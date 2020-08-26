import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    borderRadius: 25
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
        onClick={() =>
          history.push({
            pathname: '/signin',
            state: { from: '/' }
          })
        }
        className={classes.menuButton}
      >
        Đăng nhập
      </Button>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => history.push('/signup')}
        className={classes.menuButton}
      >
        Đăng ký
      </Button>
    </>
  )
}
