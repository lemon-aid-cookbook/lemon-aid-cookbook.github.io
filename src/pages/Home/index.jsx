import { Container } from '@material-ui/core'
import CardRecipe from 'components/CardRecipe'
import ListSingle from 'components/List/ListSingle'
import { TAB_TYPES } from 'pages/Profile/constants'
import {
  GetFollowingPosts,
  SearchFavoriteRecipes,
  SearchLatestRecipes
} from 'pages/RecipeCreate/redux/actions'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../../components/Header/AppHeader'
import ListCollection from './components/ListCollection'
import ListNews from './components/ListNews'
import ListPopular from './components/ListPopular'
import SearchForm from './components/SearchForm'

export default () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const followingPosts = useSelector(state => state.Recipe.followingPosts)

  useEffect(() => {
    dispatch(SearchFavoriteRecipes.get())
    dispatch(SearchLatestRecipes.get())
    if (user) {
      dispatch(
        GetFollowingPosts.get({
          userId: user.id,
          limit: 4,
          page: 1,
          type: TAB_TYPES[2]
        })
      )
    }
  }, [])

  return (
    <>
      <AppHeader from="home" />
      <SearchForm />
      <Container>
        <ListCollection />
        {user && followingPosts && followingPosts.length > 0 && (
          <ListSingle
            name="Đang theo dõi"
            link={{
              pathname: `/profile/${user.username}`,
              state: { from: '/' }
            }}
          >
            {followingPosts.map(item => (
              <CardRecipe
                key={item.id}
                title={item.title}
                image={item.avatar}
                to={item.id}
                time={item.cookingTime}
                star={item.numberOfLikes}
                owner={item.User}
                createdDate={item.createdAt}
              />
            ))}
          </ListSingle>
        )}
        <ListPopular />
        <ListNews />
      </Container>
    </>
  )
}
