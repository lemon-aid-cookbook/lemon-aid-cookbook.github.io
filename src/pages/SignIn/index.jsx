import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLIENT_ID, COLOR } from "ultis/functions";
import * as yup from "yup";
import { CTextField, helperTextStyles, styles } from "./constants";
import { SignInRequest } from "./redux/actions";
import "./signin.css";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const helperTextStyle = helperTextStyles();
  const user = useSelector((state) => state.Auth?.user);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, []);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required("* Vui lòng nhập mật khẩu")
      .matches(/(?=.{8,})/, {
        message: "Mật khẩu phải gồm 8 kí tự",
      }),
    username: yup.string().trim().required("* Vui lòng nhập tên đăng nhập"),
  });

  const handleLogin = (values) => {
    dispatch(
      SignInRequest.get({ ...values, username: values.username.toLowerCase() })
    );
  };

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === "Enter") {
      handleLogin(values);
    }
  };

  const responseGoogle = (response) => {
    // console.log(response);
    // var res = response.profileObj;
    // console.log(res);
  };

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          <span className="dimoName">Lemon-aid</span>
        </a>
        <div id="loginBox">
          <span id="loginStyle">Đăng nhập</span>
          <Formik
            initialValues={{
              password: "",
              username: "",
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
              setFieldTouched,
            }) => {
              return (
                <Form className="formStyle">
                  <CTextField
                    helperText={errors.username && errors.username}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Tên đăng nhập"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange("username")}
                    onTouchStart={() => setFieldTouched("username")}
                    onBlur={handleBlur("username")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                    style={styles.input}
                  />
                  <CTextField
                    helperText={errors.password && errors.password}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Mật khẩu"
                    variant="outlined"
                    onChange={handleChange("password")}
                    onTouchStart={() => setFieldTouched("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                    style={styles.input}
                    type="password"
                  />
                  <div className="buttomBox">
                    <Button onClick={() => history.push("/forgot")}>
                      Quên mật khẩu
                    </Button>
                    <div>
                      <span>Chưa có tài khoản?</span>
                      <Button
                        color="primary"
                        onClick={() => history.push("/signup")}
                      >
                        Đăng ký
                      </Button>
                    </div>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid
                        ? COLOR.primary
                        : COLOR.deactiveGray,
                    }}
                    onClick={handleSubmit}
                    size={"large"}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Đăng nhập bẳng Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </div>
      <div id="imgBg">
        <img src={require("../../assets/signin_img.svg")} alt="img" />
        <span className="tagline">Vào bếp không khó</span>
        <span className="tagline">Có Lemon-aid lo</span>
      </div>
    </div>
  );
}

export default SignIn;
