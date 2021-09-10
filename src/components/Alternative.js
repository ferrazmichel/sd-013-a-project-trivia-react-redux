import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerToggle, toggleNextButton, updateScore } from '../actions';

const STARTING_POINTS = 10;

class Alternative extends React.Component {
  constructor() {
    super();

    this.handleAnswering = this.handleAnswering.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
  }

  getClassName() {
    const { alternative, answered } = this.props;

    let theClass = '';
    if (answered) {
      theClass = (alternative.textId === 'correct-answer')
        ? 'correct-btn'
        : 'incorrect-btn';
    }

    return theClass;
  }

  calculatePoints() {
    const { alternative, updatePlayerScore, toggleTimer } = this.props;

    if (alternative.textId === 'correct-answer') {
      // Atualiza o localStorage com a nova pontuação.
      toggleTimer(true);
      const timer = JSON.parse(localStorage.getItem('time'));
      const localState = JSON.parse(localStorage.getItem('state'));
      const { score, assertions } = localState.player;
      const newScore = score + (STARTING_POINTS + (timer * alternative.difficulty));
      localState.player.score = newScore;
      localState.player.assertions = Number(assertions) + 1;
      localStorage.setItem('state', JSON.stringify(localState));

      // Atualiza a store do redux (para ser utilizado no Header)
      updatePlayerScore(newScore);
    }
  }

  // Método executado quando uma pessoa usuária responde uma questão.
  handleAnswering() {
    const { enable } = this.props;

    enable(true); // Ativa o botão `Proxima questão`

    this.calculatePoints();
  }

  render() {
    const { alternative, answered } = this.props;

    return (
      <li>
        <button
          data-testid={ alternative.textId }
          id={ alternative.textId === 'wrong-answer-0' ? 'incorrect' : '' }
          type="button"
          onClick={ this.handleAnswering }
          disabled={ answered }
          className={ this.getClassName() }
        >
          {alternative.text}
        </button>
      </li>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.shape({
    textId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
  }).isRequired,
  enable: PropTypes.func.isRequired,
  updatePlayerScore: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  toggleTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  answered: store.game.answered,
});

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
  updatePlayerScore: (score) => dispatch(updateScore(score)),
  toggleTimer: (bool) => dispatch(timerToggle(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
