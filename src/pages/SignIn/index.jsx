import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import "./signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { SignInRequest } from "./redux/actions";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    username: yup.string().required("* Vui lòng nhập tên đăng nhập"),
    password: yup
      .string()
      .required("* Vui lòng nhập mật khẩu")
      .matches(/(?=.{8,})/, {
        message: "Mật khẩu phải gồm 8 kí tự",
      }),
  });

  const handleLogin = (values) => {
    dispatch(SignInRequest.get(values))
  };

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === "Enter") {
      handleLogin(values);
    }
  };

  return (
    <div id="loginBg">
      <span className="dimoName">Lemon-aid</span>
      <div id="loginBox">
        <span id="loginStyle">Đăng nhập</span>
        <Formik
          initialValues={{ username: "", password: "" }}
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
              <Form>
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
                  onKeyPress={(event) => handleKeyPress(isValid, event, values)}
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
                  onKeyPress={(event) => handleKeyPress(isValid, event, values)}
                />
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
      </div>
    </div>
  );
}

export default SignIn;
