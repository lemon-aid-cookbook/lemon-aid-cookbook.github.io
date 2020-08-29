import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import React from 'react'
import { IoIosHeart } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { COLOR } from 'ultis/functions'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: '#000000'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1)
  }
}))

export default props => {
  const classes = useStyles()

  return (
    <Card key={props.to}>
      <Link to={`/recipe/${props.to}`} className={classes.link}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        <div className="content">
          <Grid container className={classes.content}>
            <Grid item xs={6}>
              <Button startIcon={<QueryBuilderIcon />} size="small">
                {props.time} phút
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Button
                startIcon={<IoIosHeart size={20} color={COLOR.primary} />}
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
          avatar={<Avatar src={props.owner.avatar} alt={props.owner.id} />}
          title={props.owner.username}
        />
      </Link>
    </Card>
  )
}
