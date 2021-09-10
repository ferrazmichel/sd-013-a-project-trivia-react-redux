/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Question from '../components/Question';
import { timerToggle, toggleNextButton, updateTime } from '../actions/index';
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
    const { /* enable, */ timerIsOn, toggleTimer, timer } = this.props;

    if (seconds > 0) {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    } else {
      document.querySelector('#incorrect').click();
      /* enable(true); */
    }

    if (timerIsOn) {
      console.log('deu certo');
      timer(seconds);
      localStorage.setItem('time', JSON.stringify(seconds));
      this.setState({ seconds: 0 });
      toggleTimer(false);
    }
  }

  render() {
    const { questions, loading, answered } = this.props; // Vem da store do redux
    const { index, seconds } = this.state;
    const FOUR = 4;
    if (loading) {
      return <h3>loading...</h3>;
    }

    if (index > FOUR) {
      return <Redirect to="/feedback" />;
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
  timer: PropTypes.func.isRequired,
  toggleTimer: PropTypes.func.isRequired,
  timerIsOn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
  timerIsOn: state.game.timerIsOn,
  answered: state.game.answered,
});

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
  timer: (time) => dispatch(updateTime(time)),
  toggleTimer: (time) => dispatch(timerToggle(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
