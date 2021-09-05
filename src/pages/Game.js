/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((prev) => ({ index: prev.index + 1 }));
  }

  render() {
    const { questions, loading } = this.props; // Vem da store do redux
    const { index } = this.state;

    if (loading) {
      return <h3>loading...</h3>;
    }

    return (
      <div>
        <Question key={ index } question={ questions[index] } />
        <button
          onClick={ this.nextQuestion }
          type="button"
        >
          Próxima pergunta
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
});

export default connect(mapStateToProps)(Game);
