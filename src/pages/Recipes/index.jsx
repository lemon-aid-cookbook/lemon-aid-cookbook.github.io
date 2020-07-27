import React from 'react'
import { Container } from '@material-ui/core'
import AppHeader from '../../components/Header/AppHeader'
import TitleBar from './components/TitleBar'
import FilterBar from './components/FilterBar'
import ListRecipes from './components/ListRecipes'
import Pagination from '../../components/Pagination'

export default () => {
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
