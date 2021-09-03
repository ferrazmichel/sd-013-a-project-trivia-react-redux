/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';

class Game extends React.Component {
  render() {
    const { questions } = this.props;

    return (
      <div>
        {questions.map((q, idx) => <Question key={ idx } question={ q } />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps, null)(Game);
