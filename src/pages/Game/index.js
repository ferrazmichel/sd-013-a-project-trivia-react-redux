import React, { Component } from 'react';
import GameHeader from '../../components/GameHeader';
import GameQuestion from '../../components/GameQuestion';

class Game extends Component {
  render() {
    return (
      <div>
        <GameHeader />
        <br />
        <GameQuestion />
      </div>
    );
  }
}

export default Game;
