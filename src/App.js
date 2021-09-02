import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Feedback } />
        <Route path="/login" component={ Login } />
      </Switch>
    );
  }
}

export default App;
