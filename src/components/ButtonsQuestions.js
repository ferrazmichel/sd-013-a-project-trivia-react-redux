import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ButtonsQuestions extends Component {
  render() {
    const {
      id,
      readyQuestions,
      classCorrect,
      classWrong,
      isAnswered,
      questions,
      handleAnswer,
      calculateScore,
    } = this.props;
    const question = questions[id];
    const INDEX_NUM = -1;
    let index = INDEX_NUM;
    return (
      <div>
        {readyQuestions.map((alternative) => {
          if (alternative === question.correct_answer) {
            return (
              <button
                key={ 999 }
                type="button"
                data-testid="correct-answer"
                id="correct-answer"
                onClick={ () => {
                  handleAnswer();
                  calculateScore();
                } }
                className={ classCorrect }
                disabled={ isAnswered }
              >
                {alternative}
              </button>);
          }
          index += 1;
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ handleAnswer }
              className={ classWrong }
              disabled={ isAnswered }
            >
              {alternative}
            </button>);
        })}
      </div>
    );
  }
}

ButtonsQuestions.propTypes = {
  classCorrect: PropTypes.string,
  classWrong: PropTypes.string,
  handleAnswer: PropTypes.func,
  id: PropTypes.number,
  isAnswered: PropTypes.bool,
  questions: PropTypes.array,
  readyQuestions: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default ButtonsQuestions;
