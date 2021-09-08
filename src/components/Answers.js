import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Answers extends Component {
  render() {
    const { question, currentTime, enableButton } = this.props;
    console.log(question);
    const arrayQuestions = [];
    arrayQuestions.push(question.correct_answer, ...question.incorrect_answers);
    const sortQuestions = arrayQuestions.sort();
    let randomQuestions = sortQuestions;
    if (sortQuestions[0] === question.correct_answer) {
      randomQuestions = sortQuestions.reverse();
    }
    return (
      <div>
        {randomQuestions.map((randomQuestion, index) => {
          if (randomQuestion === question.correct_answer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
                disabled={ currentTime === 0 }
                onClick={ () => enableButton(currentTime, question.difficulty) }
              >
                {randomQuestion}
              </button>
            );
          }
          return (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ currentTime === 0 }
              onClick={ enableButton }
            >
              {randomQuestion}
            </button>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  disabled: game.disabled,
});

Answers.propTypes = {
  question: PropTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps)(Answers);
