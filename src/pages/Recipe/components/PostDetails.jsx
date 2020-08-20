import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FollowDialog, {
  FLDIALOG_TYPES,
} from "pages/Profile/components/followDialog";
import React, { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { COLOR } from "ultis/functions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  listUnstyled: {
    listStyleType: "none",
    marginTop: 0,
    lineHeight: "1.75rem",
  },
  listStyled: {
    listStyleType: "circle",
    marginTop: 0,
    lineHeight: "1.75rem",
  },
  stepStyle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  image: {
    width: "100%",
    borderRadius: "1.5rem",
    display: "block",
    marginBottom: theme.spacing(1),
  },
}));

export default (props) => {
  const { readyTime, cookTime, ration, rating, materials, steps } = props;

  const classes = useStyles();
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Typography variant="body1">
            Thời gian chuẩn bị: {readyTime} phút
          </Typography>
          <Typography variant="body1">Khẩu phần: {ration} người</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1">Nấu: {cookTime} phút</Typography>
          <Button
            size="small"
            startIcon={<IoIosHeart size={20} color={COLOR.primary} />}
            onClick={() => setDialog(true)}
          >
            {rating ? rating.length : 0}
          </Button>
        </Grid>
      </Grid>
      {materials && materials.length > 0 && (
        <div className="materials">
          <Typography variant="h6" color="primary">
            Nguyên liệu
          </Typography>
          <ul className={classes.listUnstyled}>
            {materials.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </div>
      )}
      {steps && steps.length > 0 && (
        <div className="steps">
          <Typography variant="h6" color="primary">
            Các bước thực hiện
          </Typography>
          {steps.map((step, index) => (
            <div className="step" key={`step${index}`}>
              <Typography variant="body1" className={classes.stepStyle}>
                <strong>Bước {step.stt}:</strong> {step.making}
              </Typography>
              {step.image && (
                <img src={step.image} alt="img" className={classes.image} />
              )}
            </div>
          ))}
        </div>
      )}
      <FollowDialog
        open={dialog}
        type={FLDIALOG_TYPES.FOLLOWER}
        value={rating}
        onClose={() => setDialog(false)}
        title="Lượt thích"
      />
    </>
  );
};
