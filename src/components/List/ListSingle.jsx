import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link } from 'react-router-dom'

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

function ListSingle(props) {
  const classes = useStyles()
  let items = props.children

  if (!Array.isArray(items)) {
    items = [items]
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">
        <strong>{props.name}</strong>
        {props.showMore && (
          <Typography variant="caption">
            <Link to={props.link} className={classes.more}>
              Xem thêm
            </Link>
          </Typography>
        )}
      </Typography>
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
    </div>
  )
}

ListSingle.defaultProps = {
  showMore: true
}

export default ListSingle
