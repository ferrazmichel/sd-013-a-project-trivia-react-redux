import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Configuracoes from './pages/Configuracoes';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/jogo" component={ Jogo } />
        <Route path="/configuracoes" component={ Configuracoes } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
