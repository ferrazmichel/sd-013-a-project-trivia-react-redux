import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
