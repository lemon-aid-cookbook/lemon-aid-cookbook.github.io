import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <span>home nè</span>
      <Button
        onClick={() => history.push('signin')}
        size={"large"}
      >
        Đăng nhập
      </Button>
    </div>
  );
}

export default Home;
