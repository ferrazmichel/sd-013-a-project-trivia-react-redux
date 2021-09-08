import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import { Login, Game, Settings, Feedback } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gameScreen" component={ Game } />
        <Route exact path="/configScreen" component={ Settings } />
        <Route exact path="/feedBack" component={ Feedback } />
      </Switch>
    </div>
  );
}
