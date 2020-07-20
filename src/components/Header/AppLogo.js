import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  icon: {
    borderRadius: "50%",
    marginRight: "0.5rem",
    width: "35px",
  },
});

export default () => {
  const classes = useStyles();
  return (
    <a href="/">
      <img src="/icon.png" alt="Lemon-aid" className={classes.icon} />
      <img
        src="https://assets-global.cpcdn.com/assets/logo_text-368daae18951c011f6ec999fcff08f7dd386c2673b7f0e4cda58227138c6b300.png"
        alt="Lemon-aid"
        width="80"
      />
    </a>
  );
};
