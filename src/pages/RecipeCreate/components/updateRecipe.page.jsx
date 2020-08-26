import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import { Formik } from 'formik'
import { helperTextStyles } from 'pages/SignIn/constants'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import AppHeader from '../../../components/Header/AppHeader'
import {
  CATEGORY_ITEMS,
  IMAGE_TYPE,
  recipeStyles,
  validationRecipeSchema
} from '../constant'
import { GetDetailRecipe, UpdateRecipe } from '../redux/actions'
import ImageUpload from './imageUpload'

export default function UpdateRecipePage(props) {
  const params = useParams()
  const { id } = params
  const classes = recipeStyles()
  const helperTextStyle = helperTextStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const detail = useSelector(state => state.Recipe.detailRecipe)
  const history = useHistory()

  useEffect(() => {
    dispatch(GetDetailRecipe.get({ postId: id }))
  }, [])

  const addPictureStep = (steps, index, picture, setFieldValue) => {
    steps[index].image = picture
    setFieldValue('steps', steps)
  }

  const removePictureStep = (steps, index, setFieldValue) => {
    steps[index].image = null
    setFieldValue('steps', steps)
  }

  const onChangeCategories = (item, isIn, ingres, setFieldValue) => {
    if (isIn > -1) {
      ingres.splice(isIn, 1)
    } else {
      ingres.push(item)
    }
    setFieldValue('categories', ingres)
  }

  const submitRecipe = values => {
    dispatch(
      UpdateRecipe.get({
        data: {
          ...values,
          ingredients: values.ingredients.join('|'),
          categories: values.categories.join('|'),
          ration: values.ration.toString()
        },
        id
      })
    )
  }

  if (!detail || id !== detail.id) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="md" style={{ textAlign: 'center' }}>
          <CircularProgress style={{ marginTop: 64 }} />
        </Container>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <AppHeader />
        <Container
          maxWidth="md"
          className={classes.root}
          style={{ textAlign: 'center' }}
        >
          <Typography variant="body1" style={{ margin: 28 }}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để sửa bài viết.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() =>
              history.push({
                pathname: '/signin',
                state: { from: `/edit/${id}` }
              })
            }
          >
            Đăng nhập
          </Button>
        </Container>
      </>
    )
  }

  if (user.id !== detail.userId) {
    return (
      <>
        <AppHeader />
        <Container
          maxWidth="md"
          className={classes.root}
          style={{ textAlign: 'center' }}
        >
          <Typography variant="body1" style={{ margin: 28 }}>
            Bạn không thể sửa bài viết này.
          </Typography>
        </Container>
      </>
    )
  }

  return (
    <>
      <AppHeader />
      <Formik
        initialValues={{
          title: detail.title,
          description: detail.description,
          avatar: detail.avatar,
          ration: detail.ration,
          cookingTime: detail.cookingTime,
          difficultLevel: detail.difficultLevel,
          ingredients: detail.ingredients,
          categories:
            detail.categories && detail.categories[0] !== ''
              ? detail.categories
              : [],
          hashtags: detail.hashtags,
          steps: detail.content
        }}
        isInitialValid={false}
        validationSchema={validationRecipeSchema}
        onSubmit={values => submitRecipe(values)}
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
          setFieldValue
        }) => {
          return (
            <Container maxWidth="md" className={classes.root}>
              <Typography variant="h5">Sửa bài đăng</Typography>
              <ImageUpload
                type={IMAGE_TYPE.WIDE}
                onChange={handleChange('avatar')}
                onRemove={() => setFieldValue('avatar', null)}
                value={values.avatar}
              />
              {errors.avatar && (
                <Typography variant="body2" className={classes.errorStyle}>
                  {errors.avatar}
                </Typography>
              )}

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Tiêu đề</strong>
                </Typography>
                <TextField
                  placeholder="Gỏi..."
                  variant="outlined"
                  fullWidth
                  className={classes.field}
                  helperText={errors.title && errors.title}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  value={values.title}
                  onChange={handleChange('title')}
                  onTouchStart={() => setFieldTouched('title')}
                  onBlur={handleBlur('title')}
                />
              </div>

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Khẩu phần (người ăn)</strong>
                </Typography>
                <TextField
                  placeholder="4"
                  variant="outlined"
                  className={classes.select}
                  helperText={errors.ration && errors.ration}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  value={values.ration ? Number(values.ration) : ''}
                  onChange={handleChange('ration')}
                  onTouchStart={() => setFieldTouched('ration')}
                  onBlur={handleBlur('ration')}
                  type="number"
                />
              </div>

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Thời gian thực hiện (phút)</strong>
                </Typography>
                <TextField
                  placeholder="20"
                  variant="outlined"
                  className={classes.select}
                  helperText={errors.cookingTime && errors.cookingTime}
                  FormHelperTextProps={{ classes: helperTextStyle }}
                  value={values.cookingTime}
                  onChange={handleChange('cookingTime')}
                  onTouchStart={() => setFieldTouched('cookingTime')}
                  onBlur={handleBlur('cookingTime')}
                  type="number"
                />
              </div>

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Độ khó</strong>
                </Typography>
                <Select
                  labelId="select-difficult-label"
                  id="select-difficult"
                  value={values.difficultLevel}
                  variant="outlined"
                  className={classes.select}
                  onChange={handleChange('difficultLevel')}
                >
                  <MenuItem value={1}>Dễ</MenuItem>
                  <MenuItem value={2}>Trung bình</MenuItem>
                  <MenuItem value={3}>Khó</MenuItem>
                </Select>
              </div>

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Nhóm thức ăn</strong>
                </Typography>
                {CATEGORY_ITEMS.map((item, index) => {
                  const isIn = values.categories.indexOf(item)
                  return (
                    <Chip
                      key={`chip${index}`}
                      label={item}
                      color={isIn > -1 ? 'primary' : 'default'}
                      className={classes.chip}
                      onClick={() =>
                        onChangeCategories(
                          item,
                          isIn,
                          values.categories,
                          setFieldValue
                        )
                      }
                    />
                  )
                })}
              </div>

              <div className={classes.group}>
                <Typography variant="body1">
                  <strong>Mô tả</strong>
                </Typography>
                <TextField
                  placeholder="Món ăn dành cho mùa hè..."
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  className={classes.field}
                  value={values.description}
                  onChange={handleChange('description')}
                  onTouchStart={() => setFieldTouched('description')}
                  onBlur={handleBlur('description')}
                />
              </div>

              <div className={classes.group}>
                <Typography variant="body1" style={{ marginBottom: '0.75rem' }}>
                  <strong>Nguyên liệu</strong>
                </Typography>
                {values.ingredients.length > 0 &&
                  values.ingredients.map((material, index) => (
                    <Paper
                      component="div"
                      elevation={0}
                      key={index}
                      className={classes.paper}
                    >
                      <TextField
                        placeholder="100g thịt ba chỉ..."
                        variant="outlined"
                        fullWidth
                        className={classes.field}
                        helperText={
                          errors.ingredients &&
                          typeof errors.ingredients === 'object' &&
                          errors.ingredients[index] &&
                          errors.ingredients[index]
                        }
                        FormHelperTextProps={{ classes: helperTextStyle }}
                        value={material}
                        onTouchStart={() => setFieldTouched('ingredients')}
                        onChange={event => {
                          let ingres = values.ingredients
                          ingres[index] = event.target.value
                          setFieldValue('ingredients', ingres)
                        }}
                      />
                      <IconButton
                        color="primary"
                        className={classes.iconButton}
                        onClick={() => {
                          let ingres = values.ingredients
                          ingres.splice(index, 1)
                          setFieldValue('ingredients', ingres)
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Paper>
                  ))}
                {errors.ingredients && typeof errors.ingredients === 'string' && (
                  <Typography variant="body1" className={classes.errorStyle}>
                    {errors.ingredients}
                  </Typography>
                )}
                <Button
                  size="small"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={classes.add}
                  onClick={() => {
                    let ingres = values.ingredients
                    ingres.push('')
                    setFieldValue('ingredients', ingres)
                  }}
                >
                  Thêm nguyên liệu
                </Button>
              </div>

              <div className={classes.group}>
                <Typography variant="body1" style={{ marginBottom: '0.75rem' }}>
                  <strong>Các bước thực hiện</strong>
                </Typography>
                {values.steps.length > 0 &&
                  values.steps.map((step, i) => (
                    <div key={`step${step.stt}`}>
                      <Paper
                        component="div"
                        elevation={0}
                        className={classes.paper}
                      >
                        <Avatar className={classes.stepNum}>{i + 1}</Avatar>
                        <TextField
                          placeholder="Sơ chế thịt..."
                          variant="outlined"
                          fullWidth
                          className={classes.field}
                          helperText={
                            errors.steps &&
                            typeof errors.steps === 'object' &&
                            errors.steps[i]?.making &&
                            errors.steps[i].making
                          }
                          FormHelperTextProps={{ classes: helperTextStyle }}
                          value={step.making}
                          onTouchStart={() => setFieldTouched('steps')}
                          onChange={event => {
                            let steps = values.steps
                            steps[i].making = event.target.value
                            setFieldValue('steps', steps)
                          }}
                        />
                        <IconButton
                          color="primary"
                          className={classes.iconButton}
                          onClick={() => {
                            let steps = values.steps
                            steps.splice(i, 1)
                            setFieldValue('steps', steps)
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Paper>
                      <ImageUpload
                        type={IMAGE_TYPE.NORMAL}
                        onChange={data =>
                          addPictureStep(values.steps, i, data, setFieldValue)
                        }
                        onRemove={() =>
                          removePictureStep(values.steps, i, setFieldValue)
                        }
                        style={{ marginLeft: 40 }}
                        value={step.image}
                      />
                    </div>
                  ))}
                {errors.steps && typeof errors.steps === 'string' && (
                  <Typography variant="body2" className={classes.errorStyle}>
                    {errors.steps}
                  </Typography>
                )}
                <Button
                  size="small"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={classes.add}
                  onClick={() => {
                    let steps = values.steps
                    steps.push({
                      stt: values.steps.length + 1,
                      making: ''
                    })
                    setFieldValue('steps', steps)
                  }}
                >
                  Thêm bước
                </Button>
              </div>

              <div className={classes.group} style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{
                    marginRight: 24,
                    backgroundColor: 'red',
                    color: 'white'
                  }}
                  onClick={() => history.goBack()}
                >
                  Huỷ
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  Cập nhật
                </Button>
              </div>
            </Container>
          )
        }}
      </Formik>
    </>
  )
}
