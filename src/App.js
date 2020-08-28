import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import { GetProfile } from 'pages/Profile/redux/actions'
import Recipe from 'pages/Recipe'
import RecipeCreate from 'pages/RecipeCreate'
import UpdateRecipePage from 'pages/RecipeCreate/components/updateRecipe.page'
import Recipes from 'pages/Recipes'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { history } from 'ultis/functions'
import './App.css'

function App() {
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(GetProfile.get(user.username))
    }
  }, [])
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route exact path="/search/:keyword" component={Recipes} />
      <Route path="/create" component={RecipeCreate} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/edit/:id" component={UpdateRecipePage} />
      <Route path="/profile/:username" component={Profile} />
    </Router>
  )
}

export default App
