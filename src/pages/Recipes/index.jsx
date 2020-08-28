import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import AppHeader from 'components/Header/AppHeader'
import Pagination from 'components/Pagination'
import { MAX_COOKING_TIME } from 'pages/RecipeCreate/constant'
import { SearchRecipes } from 'pages/RecipeCreate/redux/actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LIMIT_ITEMS } from 'ultis/functions'
import FilterBar from './components/FilterBar'
import ListRecipes from './components/ListRecipes'
import { CATEGORIES, LEVEL_ITEMS } from './constant'

export default () => {
  const params = useParams()
  const { keyword } = params
  const dispatch = useDispatch()
  const recipe = useSelector(state => state.Recipe)
  const { totalItems, searchResult, isLoadingSearch } = recipe
  const totalPages = totalItems ? Math.ceil(totalItems / LIMIT_ITEMS) : 1

  const [timeRange, setTimeRange] = useState([1, MAX_COOKING_TIME])
  const [level, setLevel] = useState(LEVEL_ITEMS)
  const [food, setFood] = useState(CATEGORIES)
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(
      SearchRecipes.get({
        sort: 'latest',
        limit: LIMIT_ITEMS,
        page: 1,
        search: keyword
      })
    )
  }, [keyword])

  const filterResult = (sortValue = sort, index = page) => {
    const params = new URLSearchParams()
    params.append('search', keyword)
    params.append('sort', sortValue)
    params.append('limit', LIMIT_ITEMS)
    params.append('page', index)
    setPage(index)
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
    dispatch(SearchRecipes.get(params))
  }

  return (
    <>
      <AppHeader />
      <Container>
        <FilterBar
          name={keyword}
          sort={sort}
          setSort={setSort}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          level={level}
          setLevel={setLevel}
          food={food}
          setFood={setFood}
          filterResult={filterResult}
        />
        {isLoadingSearch ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <CircularProgress style={{ marginTop: 24 }} />
            </Grid>
          </Grid>
        ) : totalItems > 0 ? (
          <>
            <ListRecipes list={searchResult} />
            <Pagination
              count={totalPages}
              page={page}
              onChange={value => filterResult(sort, value)}
            />
          </>
        ) : (
          <Typography style={{ textAlign: 'center', marginTop: 24 }}>
            Không tìm thấy công thức nào
          </Typography>
        )}
      </Container>
    </>
  )
}
