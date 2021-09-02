import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
