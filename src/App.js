import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ConfigPage from './pages/ConfigPage';
import Feedback from './pages/Feedback';
import Jogo from './pages/Jogo';
import Login from './pages/Login';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
      <Route path="/config" component={ ConfigPage } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </div>
  );
}
