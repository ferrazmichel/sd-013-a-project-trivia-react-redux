import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfigScreen, Login, Game, FeedbackPage } from './pages';
import RankingPage from './pages/RankingPage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/configurations" component={ ConfigScreen } />
        <Route path="/feedback" component={ FeedbackPage } />
        <Route path="/ranking-page" component={ RankingPage } />
      </Switch>
    );
  }
}

export default App;
