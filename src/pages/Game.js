import React from 'react';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
      </div>
    );
  }
}
export default Game;
