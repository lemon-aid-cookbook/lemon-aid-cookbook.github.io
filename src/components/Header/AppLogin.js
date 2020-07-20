import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  login: {
    marginLeft: "auto",
  },
});

export default () => {
  const history = useHistory();

  const classes = useStyles();
  return (
    <Button
      color="primary"
      variant="outlined"
      className={classes.login}
      onClick={() => history.push("signin")}
    >
      Tạo tài khoản Lemon-aid
    </Button>
  );
};
