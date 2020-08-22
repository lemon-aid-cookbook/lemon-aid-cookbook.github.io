import { makeStyles } from "@material-ui/core/styles";
import { COLOR } from "ultis/functions";
import * as yup from "yup";

export const IMAGE_TYPE = {
  NORMAL: "NORMAL",
  WIDE: "WIDE",
};

export const recipeStyles = makeStyles((theme) => ({
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

export const stepsSchema = yup.object({
  stt: yup.number(),
  making: yup.string().trim().required("* Vui lòng nhập bước thực hiện"),
});

export const validationRecipeSchema = yup.object().shape({
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
