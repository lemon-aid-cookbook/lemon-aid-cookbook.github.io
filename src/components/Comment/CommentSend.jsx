import { Avatar, IconButton, InputAdornment, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import { CommentPost } from 'pages/RecipeCreate/redux/actions'
import { CTextField } from 'pages/SignIn/constants'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  ava: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  }
}))

export default props => {
  const { owner, postId } = props

  const classes = useStyles()
  const dispatch = useDispatch()
  const [cmt, setCmt] = useState('')
  const isValid = cmt && cmt.length > 0

  const handleKeyPress = event => {
    if (isValid && event.key === 'Enter') {
      comment()
    }
  }

  const comment = () => {
    dispatch(
      CommentPost.get({
        postId,
        userId: owner.id,
        parentCommentId: props.parentComment ? props.parentComment : null,
        message: cmt
      })
    )
    setCmt('')
  }

  return (
    <Paper
      elevation={0}
      className={classes.root}
      style={props.style ? props.style : {}}
    >
      <div style={{ flex: 1 }}>
        <Avatar
          src={owner.avatar}
          alt={owner.username}
          className={classes.ava}
        />
      </div>
      <CTextField
        placeholder="Viết thảo luận"
        variant="outlined"
        style={{ marginLeft: 24, flex: 9 }}
        value={cmt}
        onChange={event => setCmt(event.currentTarget.value)}
        onKeyPress={event => handleKeyPress(event)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={comment} disabled={!isValid} color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Paper>
  )
}
