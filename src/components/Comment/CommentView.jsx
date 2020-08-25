import { Avatar, Button, CardActions, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GlobalModalSetup } from 'components/GlobalModal'
import { DeleteComment } from 'pages/RecipeCreate/redux/actions'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MODAL_TYPE } from 'ultis/functions'
import CommentSend from './CommentSend'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  card: {
    padding: 0
  },
  ava: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  invisibleDiv: {
    width: theme.spacing(6)
  },
  invisibleDiv2: {
    width: theme.spacing(9)
  },
  invisibleDiv3: {
    width: theme.spacing(8)
  },
  action: {
    padding: 0,
    marginBottom: theme.spacing(1.5)
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}))

export default function CommentView(props) {
  const { comment, canReply, postId } = props

  const classes = useStyles()
  const user = useSelector(state => state.Auth.user)
  const [isShowReply, setIsShowReply] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const onReply = () => {
    if (user) {
      setIsShowReply(true)
    } else {
      GlobalModalSetup.getGlobalModalHolder().alertMessage(
        'Xác nhận',
        'Bạn chưa đăng nhập. Vui lòng đăng nhập để trả lời thảo luận.',
        MODAL_TYPE.CHOICE,
        () => history.push('/signin')
      )
    }
  }

  return (
    <div className={classes.container}>
      <CardHeader
        className={classes.card}
        avatar={<Avatar className={classes.ava} src={comment.User.avatar} />}
        title={comment.User.username}
        subheader={comment.message}
      />
      <CardActions
        disableSpacing
        className={canReply ? classes.action : classes.card}
      >
        <div className={classes.invisibleDiv} />
        {canReply && (
          <Button size="small" color="primary" onClick={onReply}>
            Trả lời
          </Button>
        )}
        {canReply && comment.SubComment && comment.SubComment.length > 0 && (
          <Button
            size="small"
            color="primary"
            onClick={() => setIsShowReply(!isShowReply)}
          >
            {comment.SubComment.length} trả lời
          </Button>
        )}
        {user && user.id === comment.userId && (
          <Button
            size="small"
            color="primary"
            onClick={() =>
              GlobalModalSetup.getGlobalModalHolder().alertMessage(
                'Xác nhận',
                'Bạn chắc chắn muốn xóa thảo luận này?',
                MODAL_TYPE.CHOICE,
                () =>
                  dispatch(
                    DeleteComment.get({
                      data: { commentId: comment.id },
                      postId
                    })
                  )
              )
            }
          >
            Xóa
          </Button>
        )}
      </CardActions>
      {isShowReply && (
        <CardActions disableSpacing className={classes.action}>
          <div className={classes.invisibleDiv2} />
          {user && (
            <CommentSend
              owner={user}
              postId={postId}
              parentComment={comment.id}
              style={{ margin: 0 }}
            />
          )}
        </CardActions>
      )}
      {isShowReply &&
        comment.SubComment &&
        comment.SubComment.length > 0 &&
        comment.SubComment.map(item => (
          <CardActions
            key={`subcmt${item.id}`}
            disableSpacing
            className={classes.action}
          >
            <div className={classes.invisibleDiv3} />
            <CommentView
              key={item.id}
              postId={postId}
              comment={item}
              canReply={false}
            />
          </CardActions>
        ))}
    </div>
  )
}
