import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  renderQuestionButton() {
    const { questionData } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questionData;
    const correctButtons = (
      <button
        key={ correctAnswer }
        className="correct-answer"
        type="button"
        data-testid="correct-answer"
      >
        {correctAnswer}
      </button>);
    const wrongButtons = incorrectAnswers.map((answer, index) => (
      <button
        type="button"
        className="wrong-answer"
        key={ index }
        data-testid={ `wrong-answer-${index}` }
      >
        {answer}
      </button>));

    const allButtons = [...wrongButtons, correctButtons];
    this.shuffleArray(allButtons);

    return allButtons;
  }

  render() {
    const { questionData } = this.props;
    const { category, question } = questionData;

    return (
      <div>
        <h1 data-testid="question-category">{category}</h1>
        <p data-testid="question-text">{question}</p>
        {this.renderQuestionButton()}
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questionData: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default QuestionCard;
