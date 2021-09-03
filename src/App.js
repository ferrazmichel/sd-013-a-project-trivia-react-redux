import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';
import FeedBackPage from './pages/FeedbackPage';
import './App.css';

export default function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/gamepage">
          <GamePage />
        </Route>
        <Route path="/rakingpage">
          <RankingPage />
        </Route>
        <Route path="/feedbackpage">
          <FeedBackPage />
        </Route>
      </Switch>
    </div>
  );
}
