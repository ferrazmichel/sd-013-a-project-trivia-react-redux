import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game, Feedback, Ranking, Settings } from './pages';

export default function App() {
  return (
    <Switch>

      <Route exact path="/">
        <Login />
      </Route>

      <Route exact path="/game">
        <Game />
      </Route>

      <Route exact path="/feedback">
        <Feedback />
      </Route>

      <Route exact path="/ranking">
        <Ranking />
      </Route>

      <Route exact path="/settings">
        <Settings />
      </Route>

    </Switch>
  );
}
