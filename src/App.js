import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    </BrowserRouter>

  );
}
