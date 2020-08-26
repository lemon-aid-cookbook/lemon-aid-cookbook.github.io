import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Recipe from 'pages/Recipe'
import RecipeCreate from 'pages/RecipeCreate'
import UpdateRecipePage from 'pages/RecipeCreate/components/updateRecipe.page'
import Recipes from 'pages/Recipes'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { history } from 'ultis/functions'
import './App.css'

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route exact path="/recipes" component={Recipes} />
      <Route path="/create" component={RecipeCreate} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/edit/:id" component={UpdateRecipePage} />
      <Route path="/profile/:username" component={Profile} />
    </Router>
  )
}

export default App
