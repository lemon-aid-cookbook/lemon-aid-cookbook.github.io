import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  rightMenu: {
    textAlign: 'right'
  },
  recipesNum: {
    marginLeft: theme.spacing(2)
  },
  sortMenu: {
    height: '2rem',
    marginLeft: theme.spacing(2)
  }
}))

export default props => {
  const classes = useStyles()
  const [sort, setSort] = useState('news')

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">
          {props.name}{' '}
          <Typography variant="caption" className={classes.recipesNum}>
            {props.count} công thức
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.rightMenu}>
        <Typography variant="subtitle1">
          <strong>Sắp xếp theo:</strong>
          <FormControl>
            <Select
              label="Sắp xếp theo"
              variant="outlined"
              value={sort}
              className={classes.sortMenu}
              onChange={e => setSort(e.target.value)}
            >
              <MenuItem value="news">Mới nhất</MenuItem>
              <MenuItem value="favorites">Yêu thích</MenuItem>
            </Select>
          </FormControl>
        </Typography>
      </Grid>
    </Grid>
  )
}
