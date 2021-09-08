import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
