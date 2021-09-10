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

const ONE_SECOND = 1000;
const NUMBER_OF_QUESTIONS = 5;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      seconds: 30,
      intervalId: null,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.chronometer = this.chronometer.bind(this);
    this.startCronometer = this.startCronometer.bind(this);
  }

  componentDidMount() {
    this.startCronometer();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId); // Encerra o timer ao final de uma partida do jogo
  }

  startCronometer() {
    // Será utilizado em componentWillUnmount para encerrar o timer rodando em background
    const intervalId = setInterval(() => this.chronometer(), ONE_SECOND);
    this.setState((previous) => ({ ...previous, intervalId }));
  }

  nextQuestion() {
    const { index } = this.state;
    const { enable, history } = this.props;

    enable(false);

    // Se a última questão foi respondida
    if (index === NUMBER_OF_QUESTIONS - 1) {
      history.push('/feedback'); // Redireciona
    }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
