import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Jogo from './pages/Jogo';
import Login from './pages/Login';
//

export default function App() {
  return (
    <div className="App">
      {/* <Login */}
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Jogo } />
    </div>
  );
}
