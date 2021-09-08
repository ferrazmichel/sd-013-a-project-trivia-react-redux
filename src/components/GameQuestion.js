import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameCounter from './GameCounter';
import {
  disableAnswer,
  nextQuestion } from '../redux/actions';

let assertions = 0;

class GameQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleQuestion = this.handleQuestion.bind(this);
    this.dispatchCorrectAnswer = this.dispatchCorrectAnswer.bind(this);
    this.dispatchIncorrectAnswer = this.dispatchIncorrectAnswer.bind(this);
    this.localStorage = this.localStorage.bind(this);
  }

  async scoreCalculator(difficulty) {
    const { updateScore, userName, userEmail } = this.props;
    const counter = document.getElementById('counter').innerHTML;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let diffMultiplier = 0;

    switch (difficulty) {
    case 'hard':
      diffMultiplier = hard;
      break;

    case 'medium':
      diffMultiplier = medium;
      break;

    case 'easy':
      diffMultiplier = easy;
      break;

    default:
      break;
    }

    const newScore = ten + (counter * diffMultiplier);
    assertions += 1;
    await updateScore(newScore);
    const { score } = this.props;
    const player = {
      name: userName,
      assertions,
      score,
      gravatarEmail: userEmail,
    };
    const state = {
      player,
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  localStorage() {
    const { userName, userEmail, score } = this.props;
    const player = {
      name: userName,
      assertions,
      score,
      gravatarEmail: userEmail,
    };
    const state = {
      player,
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  dispatchCorrectAnswer(difficulty) {
    const { disableAnswers } = this.props;
    disableAnswers();
    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const onecorrectAnswer = document.querySelector('[data-testid="correct-answer"]');
    onecorrectAnswer.style.border = '3px solid rgb(6, 240, 15)';
    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });
    this.localStorage();
    this.scoreCalculator(difficulty);
  }

  dispatchIncorrectAnswer() {
    const { disableAnswers } = this.props;
    disableAnswers();
    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const OnecorrectAnswer = document.querySelector('[data-testid="correct-answer"]');
    OnecorrectAnswer.style.border = '3px solid rgb(6, 240, 15)';
    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  handleQuestion() {
    const { questions, disabled, renderIndex } = this.props;
    const currQuestion = questions[renderIndex];
    const { difficulty } = currQuestion;
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
                  onClick={ () => this.dispatchCorrectAnswer(difficulty) }
                  key={ questionIndex }
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
                onClick={ () => this.dispatchIncorrectAnswer() }
              >
                {question}
              </button>);
          }) }
        </div>
        <GameCounter difficulty={ difficulty } />
      </div>
    );
  }

  render() {
    const { loading, disabled, nextQ, renderIndex } = this.props;
    const nextButton = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => nextQ() }
      >
        Próxima
      </button>);
    const feedbackButton = (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </Link>);
    const howManyQuestions = 5;
    const finalButton = renderIndex === howManyQuestions - 1 ? feedbackButton
      : nextButton;
    const renderNextButton = disabled ? finalButton : null;
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
  updateScore: (score) => dispatch({ type: 'UPDATE_SCORE', score }),
  disableAnswers: () => dispatch(disableAnswer()),
});

const mapStateToProps = ({ userReducer, loginReducer, scoreReducer }) => ({
  loading: userReducer.loading,
  questions: userReducer.questions,
  disabled: userReducer.disabled,
  renderIndex: userReducer.renderIndex,
  userEmail: loginReducer.email,
  userName: loginReducer.name,
  score: scoreReducer.score,
});

GameQuestion.propTypes = {
  loading: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  questions: PropTypes.objectOf().isRequired,
  disabled: PropTypes.bool.isRequired,
  renderIndex: PropTypes.number.isRequired,
  nextQ: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  disableAnswers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
