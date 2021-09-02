import React from 'react';

class GameBoard extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
        </div>
        <div>
          <button type="button" data-testid="correct-answer">{ question.correct_answer }</button>
          { question.incorrect_answers.map((answer, index) => (
            <button type="button" data-testid={ `wrong-answer-${index}` } key={ answer }>{ answer }</button>
          )) }
        </div>
      </div>
    );
  }
}

export default GameBoard;
