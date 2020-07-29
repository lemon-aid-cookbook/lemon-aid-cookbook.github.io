import React from 'react'
import {
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default props => {
  const { owner } = props

  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1}>
        <Grid container alignItems="center" direction="column" justify="center">
          <Grid item>
            <Avatar src={owner.avatar} alt={owner.name} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={11}>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Viết thảo luận...
          </InputLabel>
          <Input
            id="comment-send"
            endAdornment={
              <InputAdornment position="end">
                <IconButton color="primary">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
