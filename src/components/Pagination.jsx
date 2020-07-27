import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

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
            count={props.numPage}
            defaultPage={props.defaultPage}
            color="primary"
          />
        </Grid>
      </Grid>
    </div>
  )
}
