import Button from '@material-ui/core/Button'
import { Form, Formik } from 'formik'
import { CTextField, helperTextStyles, styles } from 'pages/SignIn/constants'
import { SignUpRequest } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { COLOR, CLIENT_ID } from 'ultis/functions'
import * as yup from 'yup'
import '../SignIn/signin.css'

function SignUp() {
  const history = useHistory()
  const helperTextStyle = helperTextStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth?.user)

  useEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [])

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .label('Email')
      .email('Email không hợp lệ')
      .required('* Vui lòng nhập email'),
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự'
      }),
    confirmPassword: yup
      .string()
      .required('* Vui lòng nhập lại mật khẩu')
      .oneOf(
        [yup.ref('password'), null],
        'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập'
      ),
    username: yup.string().trim().required('* Vui lòng nhập tên đăng nhập')
  })

  const handleSignup = values => {
    dispatch(
      SignUpRequest.get({
        ...values,
        username: values.username.toLowerCase(),
        email: values.email.toLowerCase()
      })
    )
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      handleSignup(values)
    }
  }

  const responseGoogle = response => {
    // console.log(response);
    // var res = response.profileObj;
    // console.log(res);
  }

  return (
    <div id="bg">
      <div id="loginBg" style={{ paddingBottom: 20 }}>
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <span className="dimoName">Lemon-aid</span>
        </a>
        <div id="loginBox">
          <span id="loginStyle">Đăng ký</span>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              username: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => handleSignup(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
              setFieldTouched
            }) => {
              return (
                <Form className="formStyle">
                  <CTextField
                    helperText={errors.username && errors.username}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Tên đăng nhập"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange('username')}
                    onTouchStart={() => setFieldTouched('username')}
                    onBlur={handleBlur('username')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    autoFocus
                  />
                  <CTextField
                    helperText={errors.email && errors.email}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange('email')}
                    onTouchStart={() => setFieldTouched('email')}
                    onBlur={handleBlur('email')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                  />
                  <CTextField
                    helperText={errors.password && errors.password}
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Mật khẩu"
                    variant="outlined"
                    onChange={handleChange('password')}
                    onTouchStart={() => setFieldTouched('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    type="password"
                  />
                  <CTextField
                    helperText={
                      errors.confirmPassword && errors.confirmPassword
                    }
                    FormHelperTextProps={{ classes: helperTextStyle }}
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    onChange={handleChange('confirmPassword')}
                    onTouchStart={() => setFieldTouched('confirmPassword')}
                    value={values.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onKeyPress={event => handleKeyPress(isValid, event, values)}
                    style={styles.input}
                    type="password"
                  />
                  <div style={{ alignSelf: 'flex-end' }}>
                    <span>Đã có tài khoản?</span>
                    <Button
                      color="primary"
                      onClick={() => history.push('/signin')}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid
                        ? COLOR.primary
                        : COLOR.deactiveGray
                    }}
                    onClick={handleSubmit}
                    size={'large'}
                  >
                    Đăng ký
                  </Button>
                </Form>
              )
            }}
          </Formik>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Đăng ký với Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </div>
      <div id="imgBg">
        <img src={require('../../assets/signin_img.svg')} alt="img" />
        <span className="tagline">Vào bếp không khó</span>
        <span className="tagline">Có Lemon-aid lo</span>
      </div>
    </div>
  )
}

export default SignUp
