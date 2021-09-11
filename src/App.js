import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Config from './pages/Config';
import FeedBack from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
