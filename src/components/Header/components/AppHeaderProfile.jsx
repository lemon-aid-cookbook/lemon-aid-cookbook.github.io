import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import { SignOut } from 'pages/SignIn/redux/actions'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
})

export default () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const user = useSelector(state => state.Auth.user)
  const userDetail = useSelector(state => state.Profile.userDetail)
  const dispatch = useDispatch()
  const history = useHistory()

  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'primary-search-account-menu'

  return (
    <>
      <div className={classes.grow} />
      <Button
        size="small"
        color="secondary"
        startIcon={<EditIcon />}
        onClick={() => history.push('/create')}
        style={{ marginRight: 16 }}
      >
        Tạo bài đăng
      </Button>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar
          src={
            userDetail && userDetail.avatar ? userDetail.avatar : user.avatar
          }
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            history.push(`/profile/${user.username}`)
            handleMenuClose()
          }}
        >
          Trang cá nhân
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(SignOut.get())
            handleMenuClose()
          }}
        >
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  )
}
