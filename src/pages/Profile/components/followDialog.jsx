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
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FiX } from "react-icons/fi";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";

export const FLDIALOG_TYPES = {
  FOLLOWER: "FOLLOWER",
  FOLLOWING: "FOLLOWING",
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "40%",
    minWidth: 500,
  },
  btnStyle: {
    borderRadius: 25,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  list: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 64,
  },
}));

function FollowDialog(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  const { onClose, value, open, type } = props;

  const handleClose = () => {
    onClose();
  };

  const unfollow = (flId) => {
    // dispatch(Unfollow.get({ userId: user.id, followerId: flId }));
  };

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
            {type === FLDIALOG_TYPES.FOLLOWING
              ? "Đang theo dõi"
              : "Theo dõi bạn"}
          </Typography>
          <IconButton style={{ flex: 1 }} onClick={handleClose}>
            <FiX size={24} color="black" />
          </IconButton>
        </div>
        <Divider />
        {value && value.length > 0 ? (
          <List className={classes.list}>
            {value.map((fl) => (
              <ListItem divider style={{ padding: 16 }} key={fl.followerId}>
                <ListItemAvatar>
                  <Avatar
                    src={fl.user.avatar ? fl.user.avatar : null}
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={fl.user.name}
                  secondary={fl.user.email}
                />
                {type === FLDIALOG_TYPES.FOLLOWING && (
                  <ListItemSecondaryAction>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.btnStyle}
                      onClick={() => unfollow(fl.followerId)}
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
  );
}

FollowDialog.defaultProps = {
  value: [],
  onClose: () => {},
  open: false,
  type: FLDIALOG_TYPES.FOLLOWING,
};

export default FollowDialog;
