import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Match from './pages/Match';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/match" component={ Match } />
      </Switch>
    );
  }
}

export default App;
