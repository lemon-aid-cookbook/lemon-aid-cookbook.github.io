import React from 'react'
import { Grid, Avatar, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default props => {
  const { comments } = props

  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      {comments.map(comment => (
        <CardHeader
          avatar={<Avatar src={comment.avatar} alt={comment.name} />}
          title={comment.username}
          subheader={comment.text}
        />
      ))}
    </Grid>
  )
}
