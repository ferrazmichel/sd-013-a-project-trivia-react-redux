import React from 'react';

class Game1 extends React.Component {
  constructor() {
    super();
    const getGameFromStore = JSON.parse(localStorage.getItem('game'));

    this.state = {
      index: 0,
      games: getGameFromStore,
    };
  }

  render() {
    const { games, index } = this.state;
    const gameOn = games[index];
    return (
      <>
        <h2>{ gameOn.category }</h2>
        <h4>{ gameOn.question }</h4>
        <button type="button">{ gameOn.correct_answer }</button>
        <button type="button">{ gameOn.incorrect_answers[0] }</button>
        <button type="button">{ gameOn.incorrect_answers[1] }</button>
        <button type="button">{ gameOn.incorrect_answers[2] }</button>
      </>

    );
  }
}

export default Game1;
