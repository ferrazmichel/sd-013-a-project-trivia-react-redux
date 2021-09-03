import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/trivia" component={ () => <h1>Trivia</h1> } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
