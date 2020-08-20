import {
  Avatar,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PublishIcon from "@material-ui/icons/Publish";
import { Follow, Unfollow } from "pages/Profile/redux/actions";
import { LikePost, UnlikePost } from "pages/RecipeCreate/redux/actions";
import React from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  actions: {
    marginLeft: theme.spacing(2),
  },
  thumbnail: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    borderRadius: 9,
  },
  bigContainer: {
    position: "relative",
    marginBottom: "1rem",
    borderRadius: 9,
    width: "100%",
    height: 582,
  },
}));

const FavButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    position: "absolute",
    right: theme.spacing(1),
    bottom: theme.spacing(1),
  },
}))(IconButton);

export default (props) => {
  const { thumbnail, title, owner, likes, postId } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const followings = useSelector(
    (state) => state.Profile.userDetail?.followings
  );
  const isFav = user && likes.some((like) => like.postlike.id === user.id);
  const isFollow =
    followings && followings.some((fl) => fl.user.id === owner.id);

  const follow = () => {
    if (user) {
      if (isFollow) {
        dispatch(Unfollow.get({ userId: user.id, followerId: owner.id }));
      } else {
        dispatch(Follow.get({ userId: user.id, followerId: owner.id }));
      }
    }
  };

  const likePost = () => {
    if (user) {
      if (isFav) {
        dispatch(UnlikePost.get({ userId: user.id, postId }));
      } else {
        dispatch(LikePost.get({ userId: user.id, postId }));
      }
    }
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <CardHeader
            avatar={<Avatar src={owner.avatar} alt={owner.username} />}
            title={owner.username}
            style={{ paddingTop: "0.25rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          {((user && user.id !== owner.id) || !user) && (
            <IconButton
              color="primary"
              className={classes.actions}
              onClick={follow}
            >
              {isFollow ? <HowToRegIcon /> : <PersonAddIcon />}
            </IconButton>
          )}
          <IconButton color="primary" className={classes.actions}>
            <PublishIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center" }}>
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
      </div>
    </>
  );
};
