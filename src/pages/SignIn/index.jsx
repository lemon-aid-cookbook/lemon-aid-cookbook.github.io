import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import "./signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { SignInRequest } from "./redux/actions";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
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
    dispatch(SignInRequest.get(values));
  };

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === "Enter") {
      handleLogin(values);
    }
  };

  return (
    <div id="bg">
      <div id="loginBg">
        <span className="dimoName">Lemon-aid</span>
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
                  <TextField
                    id={
                      errors.username
                        ? "outlined-error-helper-text"
                        : "outlined-required"
                    }
                    helperText={errors.username && errors.username}
                    label="Tên đăng nhập"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange("username")}
                    onTouchStart={() => setFieldTouched("username")}
                    onBlur={handleBlur("username")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                  />
                  <TextField
                    id={
                      errors.password
                        ? "outlined-error-helper-text"
                        : "outlined-password-input"
                    }
                    helperText={errors.password && errors.password}
                    label="Mật khẩu"
                    variant="outlined"
                    onChange={handleChange("password")}
                    onTouchStart={() => setFieldTouched("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                  />
                  <div className="buttomBox">
                    <Button onClick={() => history.push("/forgot")}>
                      Quên mật khẩu
                    </Button>
                    <div>
                      <span>Chưa có tài khoản?</span>
                      <Button onClick={() => history.push("/signup")}>
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
          <span style={{ fontSize: 18, marginTop: 16, marginBottom: 16 }}>
            Đăng nhập bằng
          </span>
          <Button size="small">
            <img
              src={require("assets/Google.png")}
              style={{ width: "40%" }}
              alt="gg"
            />
          </Button>
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
