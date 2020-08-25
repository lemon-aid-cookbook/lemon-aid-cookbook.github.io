import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import CommentSend from 'components/Comment/CommentSend'
import CommentView from 'components/Comment/CommentView'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default props => {
  const { comments, postId } = props
  const user = useSelector(state => state.Auth.user)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Thảo luận
      </Typography>
      {user && <CommentSend owner={user} postId={postId} />}
      {comments &&
        comments.length > 0 &&
        comments.map(item => (
          <CommentView
            key={item.id}
            postId={postId}
            comment={item}
            canReply={true}
          />
        ))}
      {comments && comments.length > 10 && (
        <Button size="small" color="primary" onClick={() => {}}>
          Xem tất cả thảo luận
        </Button>
      )}
    </div>
  )
}
