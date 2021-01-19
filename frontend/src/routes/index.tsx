import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import CreatePoint from '../pages/CreatePoint'

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/create-point" component={CreatePoint} />
  </Switch>
)

export default Routes
