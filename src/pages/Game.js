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
      seconds: 30,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.chronometer = this.chronometer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;

    setInterval(() => this.chronometer(), ONE_SECOND);
  }

  nextQuestion() {
    const { enable } = this.props;
    enable(false);
    this.setState((prev) => ({ index: prev.index + 1, seconds: 30 }));
  }

  chronometer() {
    const { seconds } = this.state;
    const { enable } = this.props;

    if (seconds > 0) {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    } else {
      enable(true);
    }
  }

  render() {
    const { questions, loading, answered } = this.props; // Vem da store do redux
    const { index, seconds } = this.state;

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
        <p>{!seconds ? 'acabou o tempo!' : `tempo: ${seconds}`}</p>
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
