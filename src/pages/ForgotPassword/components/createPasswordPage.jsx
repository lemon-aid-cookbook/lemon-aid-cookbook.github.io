import Button from '@material-ui/core/Button'
import { Form, Formik } from 'formik'
import { CTextField, helperTextStyles, styles } from 'pages/SignIn/constants'
import { CreatePassword } from 'pages/SignIn/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useHistory, useParams } from 'react-router-dom'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'
import '../../SignIn/signin.css'

function CreatePasswordPage() {
  const history = useHistory()
  const param = useParams()
  const { token } = param
  const dispatch = useDispatch()
  const helperTextStyle = helperTextStyles()
  const user = useSelector(state => state.Auth?.user)
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  useEffect(() => {
    if (user || !token) {
      history.push('/')
    }
  }, [user])

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
      .max(48, 'Mật khẩu không vượt quá 48 kí tự')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự'
      }),
    confirmPassword: yup
      .string()
      .required('* Vui lòng nhập lại mật khẩu')
      .oneOf(
        [yup.ref('password'), null],
        'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập'
      )
  })

  const sendForgot = values => {
    dispatch(CreatePassword.get({ password: values.password, token }))
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      sendForgot(values)
    }
  }

  return (
    <div id="bg">
      <div id="loginBg">
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <span className="dimoName">Lemon-aid</span>
        </a>
        <div id="loginBox">
          <span id="loginStyle">Tạo mật khẩu mới</span>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: ''
            }}
            isInitialValid={false}
            validationSchema={validationSchema}
            onSubmit={values => sendForgot(values)}
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
                  <Button
                    id="loginBtn"
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid
                        ? COLOR.primary
                        : COLOR.deactiveGray
                    }}
                    onClick={handleSubmit}
                  >
                    Cập nhật
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      {isDesktopOrLaptop && (
        <div id="imgBg">
          <img src={require('assets/forgot_pass.svg')} alt="img" />
        </div>
      )}
    </div>
  )
}

export default CreatePasswordPage
