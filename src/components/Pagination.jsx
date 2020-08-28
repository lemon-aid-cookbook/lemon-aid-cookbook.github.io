import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Pagination } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Pagination
            count={props.count}
            page={props.page}
            color="primary"
            onChange={(event, value) => props.onChange(value)}
          />
        </Grid>
      </Grid>
    </div>
  )
}
