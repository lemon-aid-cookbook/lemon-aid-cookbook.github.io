import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem'
  },
  more: {
    marginLeft: '2rem',
    color: '#696969',
    textDecoration: 'none'
  }
})

export default props => {
  const classes = useStyles()
  let items = props.children

  if (!Array.isArray(items)) {
    items = [items]
  }

  return (
    <Grid
      container
      spacing={3}
      className={classes.root}
      alignItems="center"
      direction="row"
    >
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {item}
        </Grid>
      ))}
    </Grid>
  )
}
