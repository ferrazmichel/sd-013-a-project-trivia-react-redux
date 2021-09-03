import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gameScreen" component={ Game } />
        <Route exact path="/configScreen" component={ Settings } />
      </Switch>
    </div>
  );
}
