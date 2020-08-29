import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Slider,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import { MAX_COOKING_TIME } from 'pages/RecipeCreate/constant'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { filterStyles, MARK_RANGE } from '../constant'

export default props => {
  const classes = filterStyles()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const recipe = useSelector(state => state.Recipe)
  const [expanded, setExpanded] = useState({
    isExpanded: false,
    type: null
  })

  const {
    timeRange,
    setTimeRange,
    level,
    setLevel,
    food,
    setFood,
    sort,
    setSort,
    filterResult,
    category
  } = props

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
    <>
      <Grid container className={classes.namebar}>
        <div
          className={isDesktopOrLaptop ? classes.itemName : classes.itemNameCol}
        >
          <Typography variant="h6" className={classes.recipesNum}>
            {props.name}
          </Typography>
          {!recipe.isLoadingSearch && <Typography variant="caption">
            {recipe.totalItems ? recipe.totalItems : 0} công thức
          </Typography>}
        </div>
        <div
          className={isDesktopOrLaptop ? classes.itemName : classes.itemNameCol}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Typography variant="subtitle1">
            <strong>Sắp xếp theo:</strong>
          </Typography>
          <FormControl>
            <Select
              label="Sắp xếp theo"
              variant="outlined"
              color="primary"
              value={sort}
              className={classes.sortMenu}
              onChange={e => {
                setSort(e.target.value)
                filterResult(e.target.value, 1)
              }}
            >
              <MenuItem value="latest">Mới nhất</MenuItem>
              <MenuItem value="favorite">Yêu thích</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>
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
          {category == null && (
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
          )}
          <span>
            <Button
              onClick={() => filterResult(sort, 1)}
              aria-expanded={expanded.isExpanded}
              size="small"
              variant="contained"
              color="primary"
            >
              Áp dụng
            </Button>
          </span>
          <Collapse in={expanded.isExpanded} timeout="auto" unmountOnExit>
            <FormControl component="fieldset">
              {expanded.type === 'times' ? (
                <Slider
                  value={timeRange}
                  min={0}
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
    </>
  )
}
