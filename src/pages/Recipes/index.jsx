import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import AppHeader from 'components/Header/AppHeader'
import TitleBar from './components/TitleBar'
import FilterBar from './components/FilterBar'
import ListRecipes from './components/ListRecipes'
import Pagination from 'components/Pagination'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SearchRecipes } from 'pages/RecipeCreate/redux/actions'
import { LIMIT_ITEMS } from 'ultis/functions'

export default () => {
  const params = useParams()
  const { keyword } = params
  const dispatch = useDispatch()
  console.log(keyword)

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

  return (
    <>
      <AppHeader />
      <Container>
        <TitleBar name="Gà Rán" count={23} />
        <FilterBar />
        <ListRecipes />
        <Pagination numPage={10} defaultPage={7} />
      </Container>
    </>
  )
}
