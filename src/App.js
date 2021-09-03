import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Settings } from './pages/index';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
