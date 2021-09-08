import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameCounter from './GameCounter';

const index = 0;
let assertions = 0;

class GameQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.dispatchCorrectAnswer = this.dispatchCorrectAnswer.bind(this);
    this.dispatchIncorrectAnswer = this.dispatchIncorrectAnswer.bind(this);
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
    localStorage.setItem('player', JSON.stringify(player));
  }

  dispatchCorrectAnswer(difficulty) {
    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const correctAnswer = document.querySelector('[data-testid="correct-answer"]');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });

    this.setState({
      disabled: true,
    });

    this.scoreCalculator(difficulty);
  }

  dispatchIncorrectAnswer() {
    // adiciona cores a borda das alternativas conforme resposta correta ou errada
    const correctAnswer = document.querySelector('[data-testid="correct-answer"]');
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    const wrongAnswers = document.querySelectorAll('[data-testid*="wrong-answer"]');
    wrongAnswers.forEach((wrongAnswer) => {
      wrongAnswer.style.border = '3px solid rgb(255, 0, 0)';
    });

    this.setState({
      disabled: true,
    });
    const { userName, userEmail, score } = this.props;
    const player = {
      name: userName,
      assertions,
      score,
      gravatarEmail: userEmail,
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  handleQuestion() {
    const { questions } = this.props;
    const { disabled } = this.state;
    const { difficulty } = questions[index];

    const currQuestion = questions[index];

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
    const { loading } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        { this.handleQuestion() }
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, loginReducer, scoreReducer }) => ({
  loading: userReducer.loading,
  questions: userReducer.questions,
  userEmail: loginReducer.email,
  userName: loginReducer.name,
  score: scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch({ type: 'UPDATE_SCORE', score }),
});

GameQuestion.propTypes = {
  loading: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  questions: PropTypes.objectOf().isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
