import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListRecipes from "pages/Recipes/components/ListRecipes";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import AppHeader from "../../components/Header/AppHeader";
import AvatarDialog from "./components/avatarDialog";
import { GetProfilePost } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
  },
  left: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  right: {
    display: "flex",
    flex: 4,
    flexDirection: "column",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  btnStyle: {
    borderRadius: 25,
    marginTop: theme.spacing(3),
  },
  grayText: {
    color: COLOR.deactiveGray,
  },
  boldText: {
    marginTop: theme.spacing(2),
  },
  emptyText: {
    marginTop: theme.spacing(3),
  },
  flw: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

const tabs = ["Bài đăng", "Yêu thích", "Đang theo dõi"];

export default (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.Auth.user);
  const profile = useSelector((state) => state.Profile);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [src, setSrc] = useState(null);

  useEffect(() => {
    dispatch(GetProfilePost.get({ userId: user.id }));
  }, []);

  const readSrc = (picture) => {
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onloadend = () => {
      setSrc(reader.result);
    };
  };

  const onCloseDialog = () => {
    setSrc(null);
  };

  const renderEmpty = () => {
    switch (tabIndex) {
      case 0:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa đăng công thức nấu ăn nào.
          </Typography>
        );
      case 1:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa thích công thức nấu ăn nào.
          </Typography>
        );
      case 2:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa theo dõi người nào.
          </Typography>
        );
      default:
        return (
          <Typography variant="body1" className={classes.emptyText}>
            Bạn chưa đăng công thức nấu ăn nào.
          </Typography>
        );
    }
  };

  const { favoritePosts, myPosts, followingPosts, isLoading } = profile;

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="lg" style={{ textAlign: "center" }}>
          <CircularProgress style={{ marginTop: 64 }} />
        </Container>
      </>
    );
  }

  const posts =
    tabIndex === 0 ? myPosts : tabIndex === 1 ? favoritePosts : followingPosts;
  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" className={classes.root}>
        <div className={classes.left}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={(e) => readSrc(e.target.files[0])}
          />
          <IconButton
            edge="end"
            onClick={() => inputRef.current.click()}
            color="inherit"
          >
            <Avatar
              className={classes.large}
              src={user && user.avatar ? user.avatar : null}
            />
          </IconButton>
          <Typography variant="h6" className={classes.boldText}>
            {user.name}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            {user.email}
          </Typography>
          <Typography variant="h6" className={classes.boldText}>
            {myPosts ? myPosts.length : 0}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            bài đăng
          </Typography>
          <ButtonBase focusRipple className={classes.flw}>
            <Typography variant="h6" className={classes.boldText}>
              {user.followers ? user.followers.length : 0}
            </Typography>
            <Typography variant="body1" className={classes.grayText}>
              người theo dõi
            </Typography>
          </ButtonBase>
          <ButtonBase focusRipple className={classes.flw}>
            <Typography variant="h6" className={classes.boldText}>
              {user.followings ? user.following.length : 0}
            </Typography>
            <Typography variant="body1" className={classes.grayText}>
              đang theo dõi
            </Typography>
          </ButtonBase>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            className={classes.btnStyle}
            onClick={() => {}}
          >
            Cập nhật thông tin
          </Button>
        </div>
        <div className={classes.right}>
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, value) => setTabIndex(value)}
            aria-label="tab recipre"
          >
            {tabs.map((item) => (
              <Tab label={item} />
            ))}
          </Tabs>
          {posts && posts.length > 0 ? (
            <ListRecipes list={posts} />
          ) : (
            renderEmpty()
          )}
        </div>
      </Container>
      <AvatarDialog open={src != null} value={src} onClose={onCloseDialog} />
    </>
  );
};
