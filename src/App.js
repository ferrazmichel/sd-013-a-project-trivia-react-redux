import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfigScreen, Login, Game } from './pages';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/configurations" component={ ConfigScreen } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
