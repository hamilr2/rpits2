// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Live from './contexts/Live/Live';
import Splash from './contexts/Splash/Splash';

const App = () => (
  <Switch>
    <Route path="/live">
      <Live />
    </Route>
    <Route path="/">
      <Splash />
    </Route>
  </Switch>
);

export default App;
