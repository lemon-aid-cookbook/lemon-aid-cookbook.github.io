import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {},
  actionMedia: {
    position: 'relative',
    textAlign: 'center',
    paddingTop: '100%'
  },
  media: {
    width: '100%',
    opacity: 0.8,
    filter: 'blur(3px)',
    WebkitFilter: 'blur(3px)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    color: '#ffffff',
    fontWeight: 'bold',
    opacity: '1',
    textShadow: '1px 1px 2px #000000'
  }
})

export default props => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea className={classes.actionMedia}>
        <Link to={props.to}>
          <div
            className={classes.media}
            style={{ backgroundImage: `url('${props.image}')` }}
          />
          <Typography variant="h5" className={classes.text}>
            {props.title}
          </Typography>
        </Link>
      </CardActionArea>
    </Card>
  )
}
