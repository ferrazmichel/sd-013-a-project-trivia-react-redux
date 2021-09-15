import React from 'react';
import { Switch, Route } from 'react-router';
import Config from './pages/Config';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      {/* <Route path="/ranking" component={ Login } /> */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
