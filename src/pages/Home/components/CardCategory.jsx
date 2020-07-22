import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
  actionMedia: {
    position: 'relative',
    textAlign: 'center'
  },
  media: {
    width: '100%',
    opacity: '0.8'
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    color: '#ffffff',
    fontWeight: 'bold',
    opacity: '1'
  }
})

export default props => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea className={classes.actionMedia}>
        <a href={props.to}>
          <img
            src={props.image}
            alt={props.title}
            title={props.title}
            className={classes.media}
          />
          <Typography variant="h5" className={classes.text}>
            {props.title}
          </Typography>
        </a>
      </CardActionArea>
    </Card>
  )
}
