import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import { Login, Game, Settings, Feedback, Ranking } from './pages';

export default function App() {
  return (
    <div className="trivia-background">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gamescreen" component={ Game } />
        <Route exact path="/configscreen" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
