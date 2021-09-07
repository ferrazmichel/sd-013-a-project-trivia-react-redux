import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Gamepage from './pages/Gamepage';
import Feedback from './pages/Feedback';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Gamepage } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
