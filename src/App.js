import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ Game } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ FeedBack } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
