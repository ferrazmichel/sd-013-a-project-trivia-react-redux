import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConfigScreen from './pages/config';
import Login from './pages/Login';
import Match from './pages/Match';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/match" component={ Match } />
        <Route path="/configurations" component={ ConfigScreen } />
      </Switch>
    );
  }
}

export default App;
