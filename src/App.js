import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Settings, FeedBack, Ranking } from './pages/index';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
