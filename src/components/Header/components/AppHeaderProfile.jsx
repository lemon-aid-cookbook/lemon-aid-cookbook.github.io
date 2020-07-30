import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SignOut } from "pages/SignIn/redux/actions";
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

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
        <MenuItem
          onClick={() => {
            dispatch(SignOut.get());
            handleMenuClose();
          }}
        >
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};
