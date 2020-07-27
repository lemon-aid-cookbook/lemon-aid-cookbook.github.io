import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Button,
  Collapse,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(0deg)'
  },
  filterMenu: {
    marginRight: theme.spacing(2)
  },
  filterItems: {
    marginTop: theme.spacing(2)
  }
}))

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState({
    isExpanded: false,
    type: null
  })
  const [times, setTimes] = useState({
    mins60: false,
    mins120: false
  })
  const [level, setLevel] = useState({
    easy: false,
    medium: false,
    hard: false
  })
  const [food, setFood] = useState({
    food1: false,
    food2: false
  })

  const handleTimeChange = e =>
    setTimes({ ...times, [e.target.name]: e.target.checked })

  const handleLevelChange = e =>
    setLevel({ ...level, [e.target.name]: e.target.checked })

  const handleFoodChange = e =>
    setFood({ ...food, [e.target.name]: e.target.checked })

  const handleExpanded = type => {
    if (!expanded.isExpanded) {
      return setExpanded({ isExpanded: true, type })
    }

    if (type === expanded.type) {
      setExpanded({ isExpanded: false, type })
    }
  }

  const { mins60, mins120 } = times
  const { easy, medium, hard } = level
  const { food1, food2 } = food

  return (
    <Card className={classes.root}>
      <CardContent>
        <span className={classes.filterMenu}>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded.isExpanded
            })}
            onClick={() => handleExpanded('times')}
            aria-expanded={expanded.isExpanded}
            size="small"
            endIcon={<ExpandMoreIcon />}
          >
            Thời gian
          </Button>
        </span>
        <span className={classes.filterMenu}>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded.isExpanded
            })}
            onClick={() => handleExpanded('level')}
            aria-expanded={expanded.isExpanded}
            size="small"
            endIcon={<ExpandMoreIcon />}
          >
            Độ khó
          </Button>
        </span>
        <span className={classes.filterMenu}>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded.isExpanded
            })}
            onClick={() => handleExpanded('food')}
            aria-expanded={expanded.isExpanded}
            size="small"
            endIcon={<ExpandMoreIcon />}
          >
            Ẩm thực
          </Button>
        </span>
        <Collapse
          in={expanded.isExpanded}
          timeout="auto"
          unmountOnExit
          className={classes.filterItems}
        >
          <FormControl component="fieldset">
            {expanded.type === 'times' ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mins60}
                      onChange={handleTimeChange}
                      name="mins60"
                    />
                  }
                  label="60 phút"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mins120}
                      onChange={handleTimeChange}
                      name="mins120"
                    />
                  }
                  label="120 phút"
                />
              </FormGroup>
            ) : expanded.type === 'level' ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={easy}
                      onChange={handleLevelChange}
                      name="easy"
                    />
                  }
                  label="Dễ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={medium}
                      onChange={handleLevelChange}
                      name="medium"
                    />
                  }
                  label="Trung bình"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hard}
                      onChange={handleLevelChange}
                      name="hard"
                    />
                  }
                  label="Khó"
                />
              </FormGroup>
            ) : (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={food1}
                      onChange={handleFoodChange}
                      name="food1"
                    />
                  }
                  label="Food 1"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={food2}
                      onChange={handleFoodChange}
                      name="food2"
                    />
                  }
                  label="Food 2"
                />
              </FormGroup>
            )}
          </FormControl>
        </Collapse>
      </CardContent>
    </Card>
  )
}
