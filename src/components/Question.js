/**
 * Componente utilizado apenas para renderizar uma `question`.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffleArray from '../helpers';
import './Question.css';
import { toggleNextButton } from '../actions/index';

class Question extends React.Component {
  // O elemento com a alternativa correta deve possuir o atributo data-testid com o valor correct-answer
  // Os elementos com as alternativas incorretas devem possuir o atributo data-testid com o valor
  // wrong-answer-${index}, com ${index} iniciando com o valor 0
  // As alternativas devem ser exibidas em ordem aleatória
  // Dica: utilize botões (<button/>) para as alternativas
  constructor() {
    super();

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
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
  }).isRequired,
  enable: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
});

const mapStateToProps = (store) => ({
  answered: store.game.answered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
