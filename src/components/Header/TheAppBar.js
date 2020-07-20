import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import AppLogo from "./AppLogo";
import AppSearch from "./AppSearch";
import AppLogin from "./AppLogin";
import AppActions from "./AppActions";

export default () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <AppLogo />
        <AppSearch />
        <AppLogin />
      </Toolbar>
    </AppBar>
  );
};
