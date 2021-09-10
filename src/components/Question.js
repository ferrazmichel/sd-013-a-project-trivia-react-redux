/**
 * Componente utilizado apenas para renderizar uma `question`.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.css';
import { timerToggle, toggleNextButton, updateScore } from '../actions/index';
import Alternative from './Alternative';

class Question extends React.Component {
  render() {
    const { question } = this.props;

    const { alternatives } = question;

    return (
      <div>
        <h1 data-testid="question-text">{question.question}</h1>
        <p data-testid="question-category">{question.category}</p>
        <ul>
          {alternatives.map((a) => <Alternative key={ a.text } alternative={ a } />)}
        </ul>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      textId: PropTypes.string.isRequired,
      difficulty: PropTypes.number.isRequired,
    })).isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
  updatePlayerScore: (score) => dispatch(updateScore(score)),
  toggleTimer: (bool) => dispatch(timerToggle(bool)),
});

const mapStateToProps = (store) => ({
  answered: store.game.answered,
  timer: store.game.time,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
