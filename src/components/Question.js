/**
 * Componente utilizado apenas para renderizar uma `question`.
 */

import React from 'react';
import PropTypes from 'prop-types';
import shuffleArray from '../helpers';

class Question extends React.Component {
  // O elemento com a alternativa correta deve possuir o atributo data-testid com o valor correct-answer
  // Os elementos com as alternativas incorretas devem possuir o atributo data-testid com o valor
  // wrong-answer-${index}, com ${index} iniciando com o valor 0
  // As alternativas devem ser exibidas em ordem aleatória
  // Dica: utilize botões (<button/>) para as alternativas
  renderAnswer(answer, idx) {
    return (
      <li key={ idx }>
        <button data-testid={ answer.textId } type="button">
          {answer.text}
        </button>
      </li>
    );
  }

  renderAnswers(incorrects, correct) {
    const answers = incorrects.map(
      (a, idx) => ({ text: a, textId: `wrong-answer-${idx}` }),
    );
    answers.push({ text: correct, textId: 'correct-answer' });
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
};

export default Question;
