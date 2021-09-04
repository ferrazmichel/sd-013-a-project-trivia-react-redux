import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Game, Settings, Ranking, FeedBack } from './pages/index';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ FeedBack } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
