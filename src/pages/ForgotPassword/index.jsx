import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Form, Formik } from "formik";
import { ResetPassword } from "pages/SignIn/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import "../SignIn/signin.css";

function ForgotPassword() {
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
  });

  const sendForgot = (values) => {
    dispatch(ResetPassword.get(values));
  };

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === "Enter") {
      sendForgot(values);
    }
  };

  return (
    <div id="bg">
      <div id="loginBg">
        <span className="dimoName">Lemon-aid</span>
        <div id="loginBox">
          <span id="loginStyle">Quên mật khẩu</span>
          <Formik
            initialValues={{
              email: "",
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={(values) => sendForgot(values)}
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
                  <span style={{ alignSelf: "flex-start" }}>
                    Vui lòng nhập email.
                  </span>
                  <p style={{ alignSelf: "flex-start" }}>
                    Bạn sẽ nhận được đường dẫn tạo mật khẩu mới qua email
                  </p>
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
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid
                        ? COLOR.primary
                        : COLOR.deactiveGray,
                    }}
                    onClick={handleSubmit}
                  >
                    Gửi
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div id="imgBg">
        <img src={require("../../assets/forgot_pass.svg")} alt="img" />
      </div>
    </div>
  );
}

export default ForgotPassword;
