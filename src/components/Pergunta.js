import React from 'react';
import PropTypes from 'prop-types';
import './pergunta.css';

class Pergunta extends React.Component {
  constructor() {
    super();

    this.renderCategoryAndTime = this.renderCategoryAndTime.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderCategoryAndTime(currentQuestion) {
    const { seconds } = this.props;
    return (
      <div className="grid mb-4">
        <h2
          className="text-uppercase fs-5 fw-bold text-start"
          data-testid="question-category"
        >
          { currentQuestion.category }
        </h2>
        <p className="text-uppercase fw-bold text-end">
          Tempo:
          {' '}
          { seconds }
        </p>
      </div>
    );
  }

  renderQuestion(currentQuestion) {
    return (
      <div className="rounded p-3 mb-4 current-question">
        <p
          className="m-0 fw-bold fs-5"
          data-testid="question-text"
        >
          { currentQuestion.question }
        </p>
      </div>
    );
  }

  renderAnswers(sortAlternatives, correctAnswer) {
    const { seconds, handleClickAnswer } = this.props;
    return (
      <div className="answers" id="alternatives-container">
        {sortAlternatives.map((alternative, index) => {
          if (alternative === correctAnswer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
                className="correct btn btn-answer"
                onClick={ handleClickAnswer }
                disabled={ seconds === 0 }
              >
                { alternative }
              </button>
            );
          }
          return (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              className="incorrect btn btn-answer"
              onClick={ handleClickAnswer }
              disabled={ seconds === 0 }
            >
              { alternative }
            </button>);
        })}
      </div>
    );
  }

  render() {
    const { questions, currentIndex } = this.props;
    const currentQuestion = questions[currentIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const alternatives = [...currentQuestion.incorrect_answers, correctAnswer];
    const sortAlternatives = alternatives.sort();
    return (
      <div className="quetions-container rounded mb-3">
        { this.renderCategoryAndTime(currentQuestion) }
        { this.renderQuestion(currentQuestion) }
        { this.renderAnswers(sortAlternatives, correctAnswer) }
      </div>
    );
  }
}

Pergunta.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentIndex: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  handleClickAnswer: PropTypes.func.isRequired,
};

export default Pergunta;
