import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import { helperTextStyles } from "pages/SignIn/constants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import AppHeader from "../../components/Header/AppHeader";
import ImageUpload from "./components/imageUpload";
import { IMAGE_TYPE } from "./constant";
import { CreateRecipe } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  thumbnail: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    width: "100%",
    borderRadius: "1rem",
  },
  group: {
    marginBottom: theme.spacing(2),
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
  },
  add: {
    marginRight: theme.spacing(2),
  },
  stepNum: {
    width: "30px",
    height: "30px",
    marginRight: theme.spacing(1),
    backgroundColor: COLOR.primary,
  },
  button: {
    paddingLeft: "4rem",
    paddingRight: "4rem",
    borderRadius: 25,
  },
  errorStyle: {
    fontSize: "0.8rem",
    color: "red",
  },
}));

const stepsSchema = yup.object({
  stt: yup.number(),
  making: yup.string().trim().required("* Vui lòng nhập bước thực hiện"),
});

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("* Vui lòng nhập tiêu đề")
    .max(255, "Tiêu đề không được quá 255 kí tự"),
  ingredients: yup
    .array()
    .required("* Vui lòng thêm ít nhất 1 nguyên liệu")
    .of(yup.string().required("* Vui lòng nhập nguyên liệu")),
  steps: yup
    .array()
    .required("* Vui lòng thêm ít nhất 1 bước thực hiện")
    .of(stepsSchema),
  avatar: yup
    .string()
    .nullable()
    .required("* Vui chọn hình đại diện cho công thức"),
});

export default (props) => {
  const classes = useStyles();
  const helperTextStyle = helperTextStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const history = useHistory();

  const addPictureStep = (steps, index, picture, setFieldValue) => {
    steps[index].image = picture;
    setFieldValue("steps", steps);
  };

  const removePictureStep = (steps, index, setFieldValue) => {
    steps[index].image = null;
    setFieldValue("steps", steps);
  };

  const submitRecipe = (values) => {
    dispatch(
      CreateRecipe.get({
        ...values,
        ingredients: values.ingredients.join("|"),
        userId: user?.id,
      })
    );
  };

  if (!user) {
    return (
      <>
        <AppHeader />
        <Container
          maxWidth="md"
          className={classes.root}
          style={{ textAlign: "center" }}
        >
          <Typography variant="body1" style={{ margin: 28 }}>
            Bạn chưa đăng nhập. Vui lòng đăng nhập để tạo bài viết.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.replace("signin")}
          >
            Đăng nhập
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <Formik
        initialValues={{
          title: "",
          description: "",
          avatar: null,
          ration: "",
          cookingTime: 20,
          difficultLevel: 1,
          ingredients: [""],
          categories: "",
          hashtags: "",
          steps: [{ stt: 1, making: "", image: null }],
        }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values) => submitRecipe(values)}
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
          setFieldValue,
        }) => {
          return (
            <Container maxWidth="md" className={classes.root}>
              <Typography variant="h5">Tạo bài đăng</Typography>
              <ImageUpload
                type={IMAGE_TYPE.WIDE}
                onChange={handleChange("avatar")}
                onRemove={() => setFieldValue("avatar", null)}
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
                  onChange={handleChange("title")}
                  onTouchStart={() => setFieldTouched("title")}
                  onBlur={handleBlur("title")}
                />
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
                  onChange={handleChange("description")}
                  onTouchStart={() => setFieldTouched("description")}
                  onBlur={handleBlur("description")}
                />
              </div>

              <div className={classes.group}>
                <Typography variant="body1" style={{ marginBottom: "0.75rem" }}>
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
                          typeof errors.ingredients === "object" &&
                          errors.ingredients[index] &&
                          errors.ingredients[index]
                        }
                        FormHelperTextProps={{ classes: helperTextStyle }}
                        value={material}
                        onTouchStart={() => setFieldTouched("ingredients")}
                        onChange={(event) => {
                          let ingres = values.ingredients;
                          ingres[index] = event.target.value;
                          setFieldValue("ingredients", ingres);
                        }}
                      />
                      <IconButton
                        color="primary"
                        className={classes.iconButton}
                        onClick={() => {
                          let ingres = values.ingredients;
                          ingres.splice(index, 1);
                          setFieldValue("ingredients", ingres);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Paper>
                  ))}
                {errors.ingredients && typeof errors.ingredients === "string" && (
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
                    let ingres = values.ingredients;
                    ingres.push("");
                    setFieldValue("ingredients", ingres);
                  }}
                >
                  Thêm nguyên liệu
                </Button>
                <Button size="small" color="primary" startIcon={<AddIcon />}>
                  Thêm phần
                </Button>
              </div>

              <div className={classes.group}>
                <Typography variant="body1" style={{ marginBottom: "0.75rem" }}>
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
                            typeof errors.steps === "object" &&
                            errors.steps[i]?.making &&
                            errors.steps[i].making
                          }
                          FormHelperTextProps={{ classes: helperTextStyle }}
                          value={step.making}
                          onTouchStart={() => setFieldTouched("steps")}
                          onChange={(event) => {
                            let steps = values.steps;
                            steps[i].making = event.target.value;
                            setFieldValue("steps", steps);
                          }}
                        />
                        <IconButton
                          color="primary"
                          className={classes.iconButton}
                          onClick={() => {
                            let steps = values.steps;
                            steps.splice(i, 1);
                            setFieldValue("steps", steps);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Paper>
                      <ImageUpload
                        type={IMAGE_TYPE.NORMAL}
                        onChange={(data) =>
                          addPictureStep(values.steps, i, data, setFieldValue)
                        }
                        onRemove={() =>
                          removePictureStep(values.steps, i, setFieldValue)
                        }
                        style={{ marginLeft: 40 }}
                      />
                    </div>
                  ))}
                {errors.steps && typeof errors.steps === "string" && (
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
                    let steps = values.steps;
                    steps.push({
                      stt: values.steps.length + 1,
                      making: "",
                    });
                    setFieldValue("steps", steps);
                  }}
                >
                  Thêm bước
                </Button>
              </div>

              <div className={classes.group} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{
                    marginRight: "5rem",
                    backgroundColor: "red",
                    color: "white",
                  }}
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
                  Đăng
                </Button>
              </div>
            </Container>
          );
        }}
      </Formik>
    </>
  );
};
