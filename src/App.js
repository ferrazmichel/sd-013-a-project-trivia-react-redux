import React from 'react';
import { Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import TelaDeJogo from './pages/TelaDeJogo';
import TelaDeFeedback from './pages/TelaDeFeedback';
import TelaDeRanking from './pages/TelaDeRanking';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/tela-de-jogo" component={ TelaDeJogo } />
      <Route exact path="/tela-de-feedback" component={ TelaDeFeedback } />
      <Route exact path="/tela-de-ranking" component={ TelaDeRanking } />
    </div>
  );
}
