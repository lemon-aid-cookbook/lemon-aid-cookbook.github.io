import {
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FiX } from 'react-icons/fi'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Unfollow } from '../redux/actions'

export const FLDIALOG_TYPES = {
  FOLLOWER: 'FOLLOWER',
  FOLLOWING: 'FOLLOWING'
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: 400
  },
  btnStyle: {
    borderRadius: 25
  },
  avatar: {
    width: 48,
    height: 48
  },
  list: {
    paddingLeft: 32,
    paddingRight: 32
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64
  },
  listItem: {
    paddingTop: 16,
    minWidth: 400
  }
}))

function FollowDialog(props) {
  const classes = useStyles()
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const { onClose, value, open, type, title } = props

  const handleClose = () => {
    onClose()
  }

  const unfollow = flId => {
    dispatch(Unfollow.get({ userId: user.id, followerId: flId }))
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Paper elevation={0} className={classes.container}>
        <div className={classes.titleContainer}>
          <div style={{ flex: 1 }} />
          <Typography variant="h6" style={{ flex: 8 }}>
            {title}
          </Typography>
          <IconButton style={{ flex: 1 }} onClick={handleClose}>
            <FiX size={24} color="black" />
          </IconButton>
        </div>
        <Divider />
        {value && value.length > 0 ? (
          <List className={classes.list}>
            {value.map(fl => (
              <ListItem
                divider
                button
                onClick={() => {
                  history.push(`/profile/${fl.user?.username}`)
                  handleClose()
                }}
                className={classes.listItem}
                key={fl.id}
              >
                <ListItemAvatar>
                  <Avatar
                    src={fl.user?.avatar ? fl.user?.avatar : null}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary={fl.user?.username} />
                {type === FLDIALOG_TYPES.FOLLOWING && (
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.btnStyle}
                      onClick={() => unfollow(fl.user?.id)}
                    >
                      Bỏ theo dõi
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" style={{ margin: 16 }}>
            Không có lượt theo dõi
          </Typography>
        )}
      </Paper>
    </Dialog>
  )
}

FollowDialog.defaultProps = {
  value: [],
  onClose: () => {},
  open: false,
  type: FLDIALOG_TYPES.FOLLOWING,
  title: ''
}

export default FollowDialog
