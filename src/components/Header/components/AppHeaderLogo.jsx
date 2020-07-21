import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    height: '45px'
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <a href="/">
      <img
        src="https://assets-global.cpcdn.com/assets/logo_text-368daae18951c011f6ec999fcff08f7dd386c2673b7f0e4cda58227138c6b300.png"
        alt=""
        className={classes.title}
      />
    </a>
  )
}
