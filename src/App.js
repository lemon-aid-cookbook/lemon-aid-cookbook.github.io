import SignIn from 'pages/SignIn'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import Recipes from 'pages/Recipes'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignIn} />
      <Route path="/recipes" component={Recipes} />
    </Router>
  )
}

export default App
