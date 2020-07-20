import React from "react";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const useStyles = makeStyles({
  actions: {
    marginLeft: "auto",
  },
  actionSpace: {
    marginRight: "0.5rem",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginLeft: "0.25rem",
  },
});

export default () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.actions}>
        <Button
          size="small"
          endIcon={<RestaurantIcon />}
          className={classes.actionSpace}
        >
          Khám phá
        </Button>
        <Button
          size="small"
          endIcon={<AddCircleIcon />}
          className={classes.actionSpace}
        >
          Viết món mới
        </Button>
        <Button
          size="small"
          endIcon={<RestaurantMenuIcon />}
          className={classes.actionSpace}
        >
          Chọn món
        </Button>
      </div>

      <Button
        size="small"
        endIcon={
          <Avatar
            src="https://img-global.cpcdn.com/users/c4afcc1ba1aca2cf/32x32cq50/photo.jpg"
            alt="Username"
            className={classes.avatar}
          />
        }
      >
        Zumi
      </Button>
    </>
  );
};
