import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracoes from './pages/Configuracoes';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="background d-flex justify-content-center align-items-center">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/configuracoes" component={ Configuracoes } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
