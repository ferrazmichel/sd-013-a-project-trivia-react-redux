import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>

      <Route exact path="/game">
        <Game />
      </Route>
    </Switch>
  );
}
