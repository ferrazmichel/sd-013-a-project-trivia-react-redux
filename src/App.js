import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Config from './pages/Config';
import Play from './pages/Play';
import './App.css';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/play" component={ Play } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
