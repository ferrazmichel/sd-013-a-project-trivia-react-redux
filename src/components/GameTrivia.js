import React from 'react';
import PropTypes from 'prop-types';

class GameTrivia extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <form>
        <p
          key={ questions.category }
          data-testid="question-category"
        >
          Categoria:
          {' '}
          {questions.category}
        </p>
        <p
          key={ questions.question }
          data-testid="question-text"
        >
          Pergunta:
          {' '}
          { questions.question }
        </p>
        { questions.incorrect_answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            { answer }
          </button>))}
        <button
          key={ questions.correct_answer }
          type="button"
          data-testid="correct-answer"
        >
          { questions.correct_answer }
        </button>

      </form>
    );
  }
}

GameTrivia.propTypes = {
  questions: PropTypes.arrayOf({}).isRequired,
};

export default GameTrivia;
