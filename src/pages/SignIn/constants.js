import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { COLOR } from "ultis/functions";

export const CTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: COLOR.primary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: COLOR.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: COLOR.deactiveGray,
        borderRadius: `25px 25px 25px 25px`,
      },
      "&:hover fieldset": {
        borderColor: COLOR.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLOR.primary,
      },
    },
  },
})(TextField);

export const helperTextStyles = makeStyles(theme => ({
  root: {
    color: "red"
  },
}));

export const styles = {
  input: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 25
  },
};
