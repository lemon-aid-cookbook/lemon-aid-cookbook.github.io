import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  }
})

export default () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

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
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Avatar
          src="https://material-ui.com/static/images/avatar/1.jpg"
          alt="Remy Sharp"
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Trang cá nhân</MenuItem>
        <MenuItem onClick={handleMenuClose}>Yêu thích</MenuItem>
        <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
      </Menu>
    </>
  )
}
