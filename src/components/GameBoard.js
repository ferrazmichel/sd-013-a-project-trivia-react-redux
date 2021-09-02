import React from 'react';
import PropTypes from 'prop-types';

class GameBoard extends React.Component {
  render() {
    const { question } = this.props;
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
        </div>
        <div>
          <button type="button" data-testid="correct-answer">{ correct }</button>
          { incorrects.map((answer, index) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              key={ answer }
            >
              { answer }
            </button>
          )) }
        </div>
      </div>
    );
  }
}

export default GameBoard;

GameBoard.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
