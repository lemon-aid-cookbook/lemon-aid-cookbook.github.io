import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    padding: '1rem 0'
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
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.root}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {item}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
