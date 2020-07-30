import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import "../SignIn/signin.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { SignUpRequest } from "pages/SignIn/redux/actions";

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth?.user);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, []);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .label("Email")
      .email("Email không hợp lệ")
      .required("* Vui lòng nhập email"),
    password: yup
      .string()
      .required("* Vui lòng nhập mật khẩu")
      .matches(/(?=.{8,})/, {
        message: "Mật khẩu phải gồm 8 kí tự",
      }),
    confirmPassword: yup
      .string()
      .required("* Vui lòng nhập lại mật khẩu")
      .oneOf(
        [yup.ref("password"), null],
        "Mật khẩu nhập lại phải khớp với mật khẩu đã nhập"
      ),
    name: yup
      .string()
      .trim()
      .required("* Vui lòng nhập họ và tên")
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: "Họ tên không hợp lệ",
        }
      ),
    username: yup.string().trim().required("* Vui lòng nhập tên đăng nhập"),
  });

  const handleLogin = (values) => {
    dispatch(SignUpRequest.get(values));
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
          <span id="loginStyle">Đăng ký</span>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
              confirmPassword: "",
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
                      errors.name
                        ? "outlined-error-helper-text"
                        : "outlined-required"
                    }
                    helperText={errors.name && errors.name}
                    label="Tên"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange("name")}
                    onTouchStart={() => setFieldTouched("name")}
                    onBlur={handleBlur("name")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                  />
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
                      errors.email
                        ? "outlined-error-helper-text"
                        : "outlined-required"
                    }
                    helperText={errors.email && errors.email}
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange("email")}
                    onTouchStart={() => setFieldTouched("email")}
                    onBlur={handleBlur("email")}
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
                  <TextField
                    id={
                      errors.confirmPassword
                        ? "outlined-error-helper-text"
                        : "outlined-password-input"
                    }
                    helperText={
                      errors.confirmPassword && errors.confirmPassword
                    }
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    onChange={handleChange("confirmPassword")}
                    onTouchStart={() => setFieldTouched("confirmPassword")}
                    value={values.confirmPassword}
                    onBlur={handleBlur("confirmPassword")}
                    onKeyPress={(event) =>
                      handleKeyPress(isValid, event, values)
                    }
                  />
                  <div style={{ alignSelf: "flex-end" }}>
                    <span>Đã có tài khoản?</span>
                    <Button onClick={() => history.push("/signin")}>
                      Đăng nhập
                    </Button>
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
                    Đăng ký
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <span style={{ fontSize: 18, marginTop: 16, marginBottom: 16 }}>
            Đăng ký với
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

export default SignUp;
