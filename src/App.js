import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
// import Ranking from './pages/Ranking';
// import Feedback from './pages/Feedback';
import Setting from './pages/Setting';
import './App.css';

export default function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/gamepage">
          <Game />
        </Route>
        {/* <Route path="/rakingpage">
          <Ranking />
        </Route>
        <Route path="/feedbackpage">
          <Feedback />
        </Route> */}
        <Route path="/settings">
          <Setting />
        </Route>
      </Switch>
    </div>
  );
}
