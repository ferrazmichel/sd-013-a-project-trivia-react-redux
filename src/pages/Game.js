/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { toggleNextButton } from '../actions/index';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    const { enable } = this.props;
    enable(false);
    this.setState((prev) => ({ index: prev.index + 1 }));
  }

  render() {
    const { questions, loading, answered } = this.props; // Vem da store do redux
    const { index } = this.state;

    if (loading) {
      return <h3>loading...</h3>;
    }

    return (
      <div>
        <Header />
        <Question key={ index } question={ questions[index] } />
        {answered && (
          <button
            onClick={ this.nextQuestion }
            type="button"
            data-testid="btn-next"
          >
            Próxima pergunta
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
  answered: state.game.answered,
});

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
