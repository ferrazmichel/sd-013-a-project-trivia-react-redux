import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameCounter from './GameCounter';
import { correctAnswer, incorrectAnswer, nextQuestion } from '../redux/actions';

class GameQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleQuestion = this.handleQuestion.bind(this);
    this.dispatchCorrectAnswer = this.dispatchCorrectAnswer.bind(this);
    this.dispatchIncorrectAnswer = this.dispatchIncorrectAnswer.bind(this);
  }

  dispatchCorrectAnswer() {
    const { correct } = this.props;

    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const onecorrectAnswer = document.querySelector('[data-testid="correct-answer"]');
    onecorrectAnswer.style.border = '3px solid rgb(6, 240, 15)';

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });
    correct();
  }

  dispatchIncorrectAnswer() {
    const { incorrect } = this.props;

    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const OnecorrectAnswer = document.querySelector('[data-testid="correct-answer"]');
    OnecorrectAnswer.style.border = '3px solid rgb(6, 240, 15)';

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });
    incorrect();
  }

  handleQuestion() {
    const { questions, disabled, renderIndex } = this.props;
    const currQuestion = questions[renderIndex];

    const currQuestionOptions = [currQuestion.correct_answer,
      ...currQuestion.incorrect_answers].sort();
    let wrongIndex = 0;
    return (
      <div>
        <div className="question-n-category">
          <h3 data-testid="question-category">{currQuestion.category}</h3>
          <p data-testid="question-text">{currQuestion.question}</p>
        </div>
        <div className="question-options">
          { currQuestionOptions.map((question, questionIndex) => {
            if (question === currQuestion.correct_answer) {
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  disabled={ disabled }
                  onClick={ this.dispatchCorrectAnswer }
                >
                  {question}
                </button>);
            }
            wrongIndex += 1;
            return (
              <button
                type="button"
                key={ questionIndex }
                disabled={ disabled }
                data-testid={ `wrong-answer-${wrongIndex - 1}` }
                onClick={ this.dispatchIncorrectAnswer }
              >
                {question}
              </button>);
          }) }
        </div>
        <GameCounter counter={ 30 } />
      </div>
    );
  }

  render() {
    const { loading, disabled, nextQ } = this.props;
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => nextQ() }
      >
        Próxima
      </button>);
    const renderNextButton = disabled ? nextButton : null;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        { this.handleQuestion() }
        { renderNextButton }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextQ: () => dispatch(nextQuestion()),
  correct: () => dispatch(correctAnswer(1)),
  incorrect: () => dispatch(incorrectAnswer()),
});

const mapStateToProps = ({ userReducer }) => ({
  loading: userReducer.loading,
  questions: userReducer.questions,
  disabled: userReducer.disabled,
  renderIndex: userReducer.renderIndex,
});

GameQuestion.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.objectOf().isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
