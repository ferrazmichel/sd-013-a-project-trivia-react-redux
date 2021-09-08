import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
