import {
  Avatar,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import AppHeader from "../../components/Header/AppHeader";

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
}));

const tabs = ["Bài đăng", "Yêu thích", "Đang theo dõi"];

export default (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.Auth.user);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" className={classes.root}>
        <div className={classes.left}>
          <Avatar
            className={classes.large}
            src={user && user.avatar ? user.avatar : null}
          />
          <Typography variant="h6" className={classes.boldText}>
            {user.name}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            {user.email}
          </Typography>
          <Typography variant="h6" className={classes.boldText}>
            {user.posts ? user.posts.length : 0}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            bài đăng
          </Typography>
          <Typography variant="h6" className={classes.boldText}>
            {user.followers ? user.followers.length : 0}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            người theo dõi
          </Typography>
          <Typography variant="h6" className={classes.boldText}>
            {user.followings ? user.following.length : 0}
          </Typography>
          <Typography variant="body1" className={classes.grayText}>
            đang theo dõi
          </Typography>
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
          <Paper>
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
          </Paper>
        </div>
      </Container>
    </>
  );
};
