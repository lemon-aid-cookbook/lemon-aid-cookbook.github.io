import { makeStyles } from '@material-ui/core/styles'
import { CTextField } from 'pages/SignIn/constants'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    textAlign: 'center',
    maxHeight: 500,
    overflow: 'hidden'
  },
  background: {
    width: '100%',
    opacity: '0.75',
    filter: 'blur(5px)',
    WebkitFilter: 'blur(5px)'
  },
  search: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    opacity: '1',
    width: '60vw'
  },
  searchForm: {
    backgroundColor: '#ffffffaa',
    borderRadius: 25
  },
  list: {
    textAlign: 'left',
    paddingLeft: '0'
  },
  listItem: {
    display: 'inline',
    margin: '0 1rem'
  },
  listItemLink: {
    textDecoration: 'none',
    color: '#000000',
    fontWeight: 'bold'
  }
})

const items = ['Gà rán', 'Gỏi', 'Salad']

export default () => {
  const classes = useStyles()
  const [key, setKey] = useState('')
  const history = useHistory()

  const handleKeyPress = event => {
    if (key && key.length > 0 && event.key === 'Enter') {
      history.push(`/search/${key}`)
      setKey('')
    }
  }

  return (
    <div className={classes.root}>
      <img
        src="https://i.redd.it/weog7y8eh8n01.jpg"
        alt=""
        className={classes.background}
      />
      <div className={classes.search}>
        <CTextField
          id="search-form"
          placeholder="Tên công thức..."
          variant="outlined"
          fullWidth
          className={classes.searchForm}
          type="search"
          value={key}
          onChange={event => setKey(event.currentTarget.value)}
          onKeyPress={handleKeyPress}
        />
        <ul className={classes.list}>
          {items.map(item => (
            <li key={item} className={classes.listItem}>
              <Link className={classes.listItemLink} to={`/search/${item}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
