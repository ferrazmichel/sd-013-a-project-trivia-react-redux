import React from 'react';
// import logo from './trivia.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LoginScreen } />
        {/* <Route exact path="/game" component={ GameScreen } /> */}
        {/* <Route exact path="/config" component={ ConfigsScreen } /> */}
        {/* <Route exact path="/feedback" component={ FeedbackScreen } /> */}
        {/* <Route exact path="/ranking" component={ RankingScreen } /> */}
      </Switch>
    </Router>
    
  );
}
