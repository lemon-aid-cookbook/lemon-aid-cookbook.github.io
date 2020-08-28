import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'

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
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  return (
    <>
      <div className={classes.grow} />
      {isDesktopOrLaptop && (
        <Button
          color="inherit"
          size="medium"
          variant="outlined"
          onClick={() => history.push('/signup')}
          className={classes.menuButton}
        >
          Đăng ký
        </Button>
      )}
      <Button
        color="inherit"
        size="medium"
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
    </>
  )
}
