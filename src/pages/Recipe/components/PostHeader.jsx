import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PublishIcon from "@material-ui/icons/Publish";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  actions: {
    marginRight: theme.spacing(2),
  },
  thumbnail: {
    width: "100%",
    borderRadius: "1.5rem",
    display: "block",
    marginBottom: theme.spacing(1),
  },
}));

export default (props) => {
  const { tags, thumbnail, title, owner } = props;

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">{tags.join("/")}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          <IconButton color="primary" className={classes.actions}>
            <PersonAddIcon />
          </IconButton>
          <IconButton color="primary" className={classes.actions}>
            <PublishIcon />
          </IconButton>
          <IconButton color="primary">
            <StarBorderIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center" }}>
        <img src={thumbnail} alt={title} className={classes.thumbnail} />
        <Typography variant="h5">
          <strong>{title}</strong>
        </Typography>
        <Grid container alignItems="center" direction="column" justify="center">
          <Grid item xs={12}>
            <CardHeader
              avatar={<Avatar src={owner.avatar} alt={owner.name} />}
              title={owner.name}
              style={{ paddingTop: "0.25rem" }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
