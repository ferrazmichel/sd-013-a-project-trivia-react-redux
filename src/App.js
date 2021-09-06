import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfigScreen, Login, Game } from './pages';
import FeedBackPage from './pages/FeedbackPage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/configurations" component={ ConfigScreen } />
        <Route exact path="/feedbackpage" component={ FeedBackPage } />
      </Switch>
    );
  }
}

export default App;
