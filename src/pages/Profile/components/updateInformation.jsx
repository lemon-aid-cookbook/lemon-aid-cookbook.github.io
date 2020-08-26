import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Formik } from 'formik'
import { CTextField, helperTextStyles, styles } from 'pages/SignIn/constants'
import React from 'react'
import { FiX } from 'react-icons/fi'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch } from 'react-redux'
import { COLOR } from 'ultis/functions'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 64
  },
  btnStyle: {
    borderRadius: 25,
    paddingLeft: 28,
    paddingRight: 28
  }
}))

const validationSchema = yup.object().shape({
  oldPass: yup
    .string()
    .required('* Vui lòng nhập mật khẩu cũ')
    .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
    .max(48, 'Mật khẩu không vượt quá 48 kí tự')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự'
    }),
  password: yup
    .string()
    .required('* Vui lòng nhập mật khẩu mới')
    .min(8, 'Mật khẩu gồm 8 kí tự trở lên')
    .max(48, 'Mật khẩu không vượt quá 48 kí tự')
    .matches(/(?=.{8,})/, {
      message: 'Mật khẩu phải gồm 8 kí tự'
    })
    .notOneOf([yup.ref('oldPass'), null], 'Mật khẩu mới phải khác mật khẩu cũ'),
  confirmPassword: yup
    .string()
    .required('* Vui lòng nhập lại mật khẩu mới')
    .oneOf(
      [yup.ref('password'), null],
      'Mật khẩu nhập lại phải khớp với mật khẩu đã nhập'
    )
})

function UpdateInfoDialog(props) {
  const classes = useStyles()
  const helperTextStyle = helperTextStyles()
  const dispatch = useDispatch()

  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === 'Enter') {
      // handleSignup(values);
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Paper elevation={0} className={classes.container}>
        <div className={classes.titleContainer}>
          <div style={{ flex: 1 }} />
          <Typography variant="h6" style={{ flex: 8 }}>
            Cập nhật thông tin
          </Typography>
          <IconButton style={{ flex: 1 }} onClick={handleClose}>
            <FiX size={24} color="black" />
          </IconButton>
        </div>
        <Divider />
        <Formik
          initialValues={{
            oldPass: '',
            password: '',
            confirmPassword: ''
          }}
          isInitialValid={false}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}
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
              <Form style={{ padding: 24 }}>
                <CTextField
                  helperText={errors.oldPass && errors.oldPass}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  label="Mật khẩu cũ"
                  variant="outlined"
                  value={values.oldPass}
                  onChange={handleChange('oldPass')}
                  onTouchStart={() => setFieldTouched('oldPass')}
                  onBlur={handleBlur('oldPass')}
                  onKeyPress={event => handleKeyPress(isValid, event, values)}
                  style={styles.input}
                  type="password"
                  autoFocus
                />
                <CTextField
                  helperText={errors.password && errors.password}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  label="Mật khẩu mới"
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
                  helperText={errors.confirmPassword && errors.confirmPassword}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  label="Nhập lại mật khẩu mới"
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
                  className={classes.btnStyle}
                  disabled={!isValid}
                  style={{
                    backgroundColor: isValid
                      ? COLOR.primary
                      : COLOR.deactiveGray
                  }}
                  onClick={handleSubmit}
                  size="medium"
                  color="primary"
                  variant="contained"
                >
                  Cập nhật
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Paper>
    </Dialog>
  )
}

UpdateInfoDialog.defaultProps = {
  onClose: () => {},
  open: false
}

export default UpdateInfoDialog
