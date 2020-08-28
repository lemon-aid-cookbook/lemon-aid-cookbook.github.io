import { InputBase } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: '25px 25px 25px 25px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchBig: {
    position: 'relative',
    borderRadius: '25px 25px 25px 25px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    borderRadius: '25px 25px 25px 25px'
  },
  inputInput: {
    padding: theme.spacing(1, 3, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    },
    borderRadius: '25px 25px 25px 25px'
  }
}))

export default props => {
  const classes = useStyles()
  const [key, setKey] = useState('')
  const history = useHistory()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })

  const handleKeyPress = event => {
    if (key && key.length > 0 && event.key === 'Enter') {
      history.push(`/search/${key}`)
      setKey('')
    }
  }

  return (
    <div className={isDesktopOrLaptop ? classes.search : classes.searchBig}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Tên công thức..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        onKeyPress={handleKeyPress}
        type="search"
        onChange={event => setKey(event.currentTarget.value)}
      />
    </div>
  )
}
