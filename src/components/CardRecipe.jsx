import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core/";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  link: {
    textDecoration: "none",
    color: "#000000",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`recipe/${props.to}`} className={classes.link}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <div className="content">
          <Grid container className={classes.content}>
            <Grid item xs={6}>
              <Button startIcon={<QueryBuilderIcon />} size="small">
                {props.time}
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                startIcon={<StarIcon style={{ color: "yellow" }} />}
                size="small"
              >
                {props.star}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{props.title}</Typography>
            </Grid>
          </Grid>
        </div>
        <CardHeader
          avatar={<Avatar src={props.avatar} alt={props.owner} />}
          title={props.owner}
          subheader={props.createdDate}
        />
      </Link>
    </Card>
  );
};
