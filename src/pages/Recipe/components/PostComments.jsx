import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import CommentSend from '../../../components/Comment/CommentSend'
import CommentView from '../../../components/Comment/CommentView'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default props => {
  const { owner, comments } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Thảo luận
      </Typography>
      <CommentSend owner={owner} />
      <CommentView comments={comments} />
      <a href="#!">Xem tất cả thảo luận</a>
    </div>
  )
}
