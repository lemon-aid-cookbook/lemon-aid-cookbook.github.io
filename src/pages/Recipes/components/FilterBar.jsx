import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Slider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import { MAX_COOKING_TIME } from 'pages/RecipeCreate/constant'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CATEGORIES, filterStyles, LEVEL_ITEMS, MARK_RANGE } from '../constant'

export default () => {
  const classes = filterStyles()
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState({
    isExpanded: false,
    type: null
  })
  const [timeRange, setTimeRange] = useState([1, MAX_COOKING_TIME])
  const [level, setLevel] = useState(LEVEL_ITEMS)
  const [food, setFood] = useState(CATEGORIES)

  const filterResult = () => {
    const params = new URLSearchParams()
    params.append('mintime', timeRange[0])
    params.append('maxtime', timeRange[1])
    level.forEach(item => {
      if (item.status) {
        params.append('level', item.code)
      }
    })
    food.forEach(item => {
      if (item.status) {
        params.append('category', item.code)
      }
    })
    console.log(params.toString())
  }

  const handleLevelChange = e => {
    const nextLevel = [...level]
    nextLevel[Number(e.target.name)].status = e.target.checked
    setLevel(nextLevel)
  }

  const handleFoodChange = e => {
    const nextfood = [...food]
    nextfood[Number(e.target.name)].status = e.target.checked
    setFood(nextfood)
  }

  const handleExpanded = type => {
    if (type === expanded.type) {
      setExpanded({ isExpanded: !expanded.isExpanded, type })
    } else {
      setExpanded({ isExpanded: true, type })
    }
  }

  const valuetext = value => {
    return `${value} phút`
  }

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
        <Collapse in={expanded.isExpanded} timeout="auto" unmountOnExit>
          <FormControl component="fieldset">
            {expanded.type === 'times' ? (
              <Slider
                value={timeRange}
                min={1}
                max={MAX_COOKING_TIME}
                onChange={(event, value) => setTimeRange(value)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                className={classes.range}
                marks={MARK_RANGE}
              />
            ) : expanded.type === 'level' ? (
              <FormGroup row>
                {level.map((item, index) => (
                  <FormControlLabel
                    key={item.code}
                    control={
                      <Checkbox
                        checked={item.status}
                        color="primary"
                        onChange={handleLevelChange}
                        name={index.toString()}
                      />
                    }
                    label={item.title}
                  />
                ))}
              </FormGroup>
            ) : (
              <FormGroup row>
                {food.map((item, index) => (
                  <FormControlLabel
                    key={item.code}
                    control={
                      <Checkbox
                        checked={item.status}
                        color="primary"
                        onChange={handleFoodChange}
                        name={index.toString()}
                      />
                    }
                    label={item.title}
                  />
                ))}
              </FormGroup>
            )}
          </FormControl>
        </Collapse>
      </CardContent>
    </Card>
  )
}
