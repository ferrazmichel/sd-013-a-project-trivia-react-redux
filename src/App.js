import React from 'react';
import { Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';
import TelaDeJogo from './pages/TelaDeJogo';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/tela-de-jogo" component={ TelaDeJogo } />
    </div>
  );
}
// asdfsdf
