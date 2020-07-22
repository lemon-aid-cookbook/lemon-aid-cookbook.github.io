import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    textAlign: 'center',
    maxHeight: '400px',
    overflow: 'hidden'
  },
  background: {
    width: '100%',
    opacity: '0.75'
  },
  search: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    opacity: '1',
    width: '600px'
  },
  searchForm: {
    backgroundColor: '#ffffffaa'
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

export default () => {
  const classes = useStyles()
  const [items] = useState([
    {
      name: 'Gà Rán',
      link: '#!'
    },
    {
      name: 'Gỏi',
      link: '#!'
    },
    {
      name: 'Salad',
      link: '#!'
    }
  ])

  return (
    <div className={classes.root}>
      <img
        src="https://i.redd.it/weog7y8eh8n01.jpg"
        alt=""
        className={classes.background}
      />
      <div className={classes.search}>
        <TextField
          id="search-form"
          placeholder="Tên công thức..."
          variant="outlined"
          fullWidth
          className={classes.searchForm}
        />
        <ul className={classes.list}>
          {items.map(item => (
            <li key={item.name} className={classes.listItem}>
              <a className={classes.listItemLink} href={item.link}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
