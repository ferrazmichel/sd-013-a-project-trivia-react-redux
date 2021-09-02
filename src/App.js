import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
<<<<<<< HEAD
import Game from './pages/Game';
||||||| abb733c
import Game from './pages/Game'
=======

import Game from './pages/Game'
import Settings from './pages/Settings';
>>>>>>> 133b3a14460d5f66a4cd3ede78bc759e760e4e91

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
