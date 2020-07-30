import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import Recipes from 'pages/Recipes'
import Recipe from 'pages/Recipe'
import SignUp from 'pages/SignUp'
import ForgotPassword from 'pages/ForgotPassword'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/forgot" component={ForgotPassword} />
    </Router>
  )
}

export default App
