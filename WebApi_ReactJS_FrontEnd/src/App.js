import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Department from './components/Departments/Department'
import Employee from './components/Employees/Employee'
import { Navigation } from './components/Navigation'

const App = () => {
  return (
    <Router>
      <div className="react-container">
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/departments" exact>
              <Department />
            </Route>
            <Route path="/employees" exact>
              <Employee />
            </Route>
          </Switch>
      </div>
    </Router>
  )
}

export default App
