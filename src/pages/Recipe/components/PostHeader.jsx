import {
  Avatar,
  Button,
  ButtonBase,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { GlobalModalSetup } from 'components/GlobalModal'
import FollowDialog, {
  FLDIALOG_TYPES
} from 'pages/Profile/components/followDialog'
import { Follow, Unfollow } from 'pages/Profile/redux/actions'
import {
  DeleteRecipe,
  LikePost,
  UnlikePost
} from 'pages/RecipeCreate/redux/actions'
import React, { useState } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, MODAL_TYPE } from 'ultis/functions'

const useStyles = makeStyles(theme => ({
  actions: {
    marginLeft: theme.spacing(2)
  },
  thumbnail: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 9
  },
  bigContainer: {
    position: 'relative',
    marginBottom: '1rem',
    borderRadius: 9,
    width: '100%',
    height: 582
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

const FavButton = withStyles(theme => ({
  root: {
    color: 'white',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    position: 'absolute',
    right: theme.spacing(1),
    bottom: theme.spacing(1)
  }
}))(IconButton)

export default props => {
  const { thumbnail, title, owner, likes, postId, rating } = props

  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const followings = useSelector(state => state.Profile.userFollowings)
  const isFav = user && likes.some(like => like.postlike.id === user.id)
  const isFollow = followings && followings.some(fl => fl.user.id === owner.id)
  const [anchor, setAnchor] = useState(null)
  const history = useHistory()
  const [dialog, setDialog] = useState(false)

  const follow = () => {
    if (user) {
      if (isFollow) {
        dispatch(Unfollow.get({ userId: user.id, followerId: owner.id }))
      } else {
        dispatch(Follow.get({ userId: user.id, followerId: owner.id }))
      }
    } else {
      GlobalModalSetup.getGlobalModalHolder().alertMessage(
        'Thông báo',
        'Bạn chưa đăng nhập. Vui lòng đăng nhập để theo dõi người dùng này.',
        MODAL_TYPE.CHOICE,
        () => history.push('/signin')
      )
    }
  }

  const likePost = () => {
    if (user) {
      if (isFav) {
        dispatch(UnlikePost.get({ userId: user.id, postId }))
      } else {
        dispatch(LikePost.get({ userId: user.id, postId }))
      }
    } else {
      GlobalModalSetup.getGlobalModalHolder().alertMessage(
        'Thông báo',
        'Bạn chưa đăng nhập. Vui lòng đăng nhập để thích bài đăng này.',
        MODAL_TYPE.CHOICE,
        () => history.push('/signin')
      )
    }
  }

  const handleMenuClose = () => {
    setAnchor(null)
  }

  return (
    <>
      <div className={classes.author}>
        <ButtonBase
          focusRipple
          onClick={() => history.push(`/profile/${owner.username}`)}
        >
          <CardHeader
            avatar={<Avatar src={owner.avatar} alt={owner.username} />}
            title={owner.username}
          />
        </ButtonBase>

        <div className={classes.author}>
          {((user && user.id !== owner.id) || !user) && (
            <IconButton
              color="primary"
              className={classes.actions}
              onClick={follow}
            >
              {isFollow ? <HowToRegIcon /> : <PersonAddIcon />}
            </IconButton>
          )}
          {user && user.id === owner.id && (
            <IconButton
              color="primary"
              className={classes.actions}
              onClick={event => setAnchor(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Paper elevation={0} className={classes.bigContainer}>
          <span
            className={classes.thumbnail}
            style={{ backgroundImage: `url('${thumbnail}')` }}
          />
          <FavButton onClick={likePost}>
            {isFav ? (
              <IoIosHeart size={28} color={COLOR.primary} />
            ) : (
              <IoIosHeartEmpty size={28} color={COLOR.primary} />
            )}
          </FavButton>
        </Paper>
        <Typography variant="h5">
          <strong>{title}</strong>
        </Typography>
        <Button
          size="medium"
          startIcon={<IoIosHeart size={20} color={COLOR.primary} />}
          onClick={() => setDialog(true)}
          style={{ alignContent: 'center' }}
        >
          {rating ? rating.length : 0}
        </Button>
      </div>
      <Menu
        anchorEl={anchor}
        id={'more-menu'}
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            history.push(`/edit/${postId}`)
            handleMenuClose()
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              'Xác nhận',
              `Bạn có chắc chắn muốn xóa công thức ${title}?`,
              MODAL_TYPE.CHOICE,
              () => dispatch(DeleteRecipe.get({ id: postId }))
            )
            handleMenuClose()
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
      <FollowDialog
        open={dialog}
        type={FLDIALOG_TYPES.FOLLOWER}
        value={rating}
        onClose={() => setDialog(false)}
        title="Lượt thích"
      />
    </>
  )
}
