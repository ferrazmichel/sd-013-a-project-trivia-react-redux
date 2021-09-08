/**
 * Componente utilizado apenas para renderizar uma `question`.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffleArray from '../helpers';
import './Question.css';
import { toggleNextButton, updateScore } from '../actions/index';

const STARTING_POINTS = 10;

const difficulties = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

class Question extends React.Component {
  constructor() {
    super();

    this.changeColor = this.changeColor.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
    this.handleQuestionAnswering = this.handleQuestionAnswering.bind(this);
  }

  getDifficulty() {
    const { question } = this.props;

    switch (question.difficulty) {
    case 'easy':
      return difficulties.EASY;
    case 'medium':
      return difficulties.MEDIUM;
    case 'hard':
      return difficulties.HARD;
    default:
      return false;
    }
  }

  handleQuestionAnswering(questionId) {
    const { updatePlayerScore } = this.props;

    if (questionId === 'correct') {
      console.log('correct answer from handleQuestionAnswering:', questionId);

      // Atualiza o localStorage com a nova pontuação.
      const localState = JSON.parse(localStorage.getItem('state'));
      const { score, assertions } = localState.player;
      const timer = 10; // Precisa vir do redux
      const newScore = score + (STARTING_POINTS + (timer * this.getDifficulty()));
      localState.player.score = newScore;
      localState.player.assertions = assertions + 1;
      localStorage.setItem('state', JSON.stringify(localState));

      // Atualiza a store do redux (para ser utilizado no Header)
      updatePlayerScore(newScore);
    }
  }

  // Método executado quando uma pessoa usuária responde uma questão.
  changeColor({ target: { id } }) {
    const { enable } = this.props;
    const questions = document.querySelectorAll('button');
    questions.forEach((question) => {
      if (question.id === 'correct') {
        question.classList.add('correct-btn');
      } if (question.id === 'incorrect') {
        question.classList.add('incorrect-btn');
      }
    });
    enable(true);

    // Calcula os pontos
    this.handleQuestionAnswering(id);
  }

  renderAnswer(answer, idx) {
    const { answered } = this.props;

    return (
      <li key={ idx }>
        <button
          data-testid={ answer.textId }
          type="button"
          onClick={ this.changeColor }
          id={ answer.id }
          disabled={ answered }
        >
          {answer.text}
        </button>
      </li>
    );
  }

  renderAnswers(incorrects, correct) {
    const answers = incorrects.map(
      (a, idx) => ({ text: a, textId: `wrong-answer-${idx}`, id: 'incorrect' }),
    );
    answers.push({ text: correct, textId: 'correct-answer', id: 'correct' });
    shuffleArray(answers);

    return (
      <ul>
        {answers.map((a, idx) => this.renderAnswer(a, idx))}
      </ul>
    );
  }

  render() {
    const { question } = this.props;
    const incorrectAnswers = question.incorrect_answers;
    const correctAnswer = question.correct_answer;

    return (
      <div>
        <h1 data-testid="question-text">{question.question}</h1>
        <p data-testid="question-category">{question.category}</p>
        {this.renderAnswers(incorrectAnswers, correctAnswer)}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  enable: PropTypes.func.isRequired,
  updatePlayerScore: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
  updatePlayerScore: (score) => dispatch(updateScore(score)),
});

const mapStateToProps = (store) => ({
  answered: store.game.answered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
