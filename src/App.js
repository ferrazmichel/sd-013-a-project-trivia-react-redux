import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game, Feedback, Ranking, Settings } from './pages';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
