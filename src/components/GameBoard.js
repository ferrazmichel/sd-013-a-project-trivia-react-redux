import React from 'react';
import PropTypes from 'prop-types';

class GameBoard extends React.Component {
  shuffleOptions(correctOption, incorrectOptions, onSelect) {
    const optionsArray = [...incorrectOptions, correctOption];
    for (let i = optionsArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }
    return optionsArray.map((opt) => (
      <button
        key={ opt }
        type="button"
        className={ opt === correctOption ? 'dev-correct' : null }
        data-testid={ opt === correctOption ? 'correct-answer'
          : `wrong-answer-${incorrectOptions.indexOf(opt)}` }
        name="options"
        value={ opt }
        onClick={ () => onSelect(correctOption) }
      >
        { opt }
      </button>
    ));
  }

  render() {
    const { question, onSelect } = this.props;
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
        </div>
        <div>
          {this.shuffleOptions(correct, incorrects, onSelect)}
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
  onSelect: PropTypes.func.isRequired,
};
