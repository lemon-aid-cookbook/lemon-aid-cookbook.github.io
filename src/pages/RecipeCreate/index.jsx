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
import ImageUploader from "react-images-upload";
import { useDispatch } from "react-redux";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import AppHeader from "../../components/Header/AppHeader";
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

const contentSchema = yup.object({
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
  content: yup
    .array()
    .required("* Vui lòng thêm ít nhất 1 bước thực hiện")
    .of(contentSchema),
});

export default (props) => {
  const classes = useStyles();
  const helperTextStyle = helperTextStyles();
  const dispatch = useDispatch();

  const addPictureStep = (content, index, picture, setFieldValue) => {
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onloadend = () => {
      content[index].picture = reader.result.substr(
        reader.result.lastIndexOf(",") + 1
      );
      setFieldValue("content", content);
    };
  };

  return (
    <>
      <AppHeader />
      <Formik
        initialValues={{
          title: "",
          description: "",
          avatar: "",
          ration: "",
          cookingTime: 0,
          difficultLevel: 1,
          ingredients: [""],
          categories: "",
          hashtags: "",
          content: [{ stt: 1, making: "", picture: null }],
        }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values) => dispatch(CreateRecipe.get(values))}
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
              <img
                src={
                  "https://thumbs.dreamstime.com/b/lay-flat-herb-spices-table-top-image-ration-shot-dark-moody-cooking-111890196.jpg"
                }
                alt={values.title}
                className={classes.thumbnail}
              />

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
                {values.content.length > 0 &&
                  values.content.map((step, i) => (
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
                            errors.content &&
                            typeof errors.content === "object" &&
                            errors.content[i]?.making &&
                            errors.content[i].making
                          }
                          FormHelperTextProps={{ classes: helperTextStyle }}
                          value={step.making}
                          onTouchStart={() => setFieldTouched("content")}
                          onChange={(event) => {
                            let content = values.content;
                            content[i].making = event.target.value;
                            setFieldValue("content", content);
                          }}
                        />
                        <IconButton
                          color="primary"
                          className={classes.iconButton}
                          onClick={() => {
                            let content = values.content;
                            content.splice(i, 1);
                            setFieldValue("content", content);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Paper>
                      <ImageUploader
                        withIcon={true}
                        buttonText="Thêm ảnh minh hoạ"
                        onChange={(picture) =>
                          addPictureStep(
                            values.content,
                            i,
                            picture[0],
                            setFieldValue
                          )
                        }
                        imgExtension={[".jpg", ".png"]}
                        maxFileSize={5242880}
                        singleImage
                        withPreview
                      />
                    </div>
                  ))}
                {errors.content && typeof errors.content === "string" && (
                  <Typography variant="body2" className={classes.errorStyle}>
                    {errors.content}
                  </Typography>
                )}
                <Button
                  size="small"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={classes.add}
                  onClick={() => {
                    let content = values.content;
                    content.push({
                      stt: values.content.length + 1,
                      making: "",
                    });
                    setFieldValue("content", content);
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
