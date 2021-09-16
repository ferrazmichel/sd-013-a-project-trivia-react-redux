import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import RankingPage from './pages/RankingPage';
import FeedBackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/gamepage" component={ GamePage } />
        <Route exact path="/rankingpage" component={ RankingPage } />
        <Route exact path="/feedbackpage" component={ FeedBackPage } />
        <Route exact path="/settingspage" component={ SettingsPage } />
      </Switch>
    </div>
  );
}
