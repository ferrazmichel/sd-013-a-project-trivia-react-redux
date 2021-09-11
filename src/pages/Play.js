import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getNodeText } from '@testing-library/react';
import Header from '../components/Header';
import { fetchURL, loadFromLocalStaorage, saveToLocalStorage } from '../services';
import { sendPlayerInfo } from '../actions';
import Timer from '../components/Timer';

const CORRECT_ANSWER = 'correct-answer';
const MAX_QUESTIONS = 5;
const LAST_QUESTION_INDEX = MAX_QUESTIONS - 1;
const HALF = 0.5;
const randomOrder = () => Math.random() - HALF; // https://javascript.info/array-methods#shuffle-an-array
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      questionIndex: 0,
      button: false,
      timeLeft: 0,
      answers: [],
    };
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleStyle = this.handleButtonStyle.bind(this);
    this.handleTimeLeft = this.handleTimeLeft.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.setShuffleAnswers = this.setShuffleAnswers.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
    const { name, gravatarEmail, player: { score, assertions }, sendPlayer } = this.props;
    const PLAYER_START = { name, gravatarEmail, score, assertions };
    sendPlayer({ player: PLAYER_START });
    saveToLocalStorage('state', { player: PLAYER_START });
  }

  componentDidUpdate(prevProps, prevState) {
    const { timeLeft } = this.state;
    const { sendPlayer,
      player: { name, gravatarEmail, score, assertions },
    } = this.props;

    const CORRECT_ALTERNATIVE = prevProps.player.assertions < assertions;
    const TIME_LEFT_UPDATE = prevState.timeLeft !== timeLeft;

    if (CORRECT_ALTERNATIVE && TIME_LEFT_UPDATE) {
      const { questionIndex, questions: { results } } = this.state;
      const { difficulty } = results[questionIndex];

      const POINTS = { easy: 1, medium: 2, hard: 3, base: 10 };
      const answerPoints = POINTS.base + (timeLeft * POINTS[difficulty]);
      const PLAYER_SCORE_UPDATE = {
        name,
        gravatarEmail,
        score: score + answerPoints,
        assertions,
      };
      sendPlayer({ player: PLAYER_SCORE_UPDATE });
      saveToLocalStorage('state', { player: PLAYER_SCORE_UPDATE });
    }
  }

  componentWillUnmount() {
    const {
      player: { name, gravatarEmail, score, assertions },
      sendPlayer,
    } = this.props;
    const TESTE = { name,
      gravatarEmail,
      score,
      assertions };
    sendPlayer({ player: TESTE });
    saveToLocalStorage('state', { player: TESTE });
  }

  setShuffleAnswers() {
    const { questions } = this.state;
    const answerData = questions.results;
    const answers = answerData.map((answer) => {
      const shuffleAnswer = [
        ...answer.incorrect_answers,
        { correct_answer: answer.correct_answer },
      ];
      return (shuffleAnswer.sort(randomOrder));
    });
    this.setState({ answers });
  }

  handleAnswers(answers, results) {
    const { button } = this.state;
    return (answers.map((answer, index) => (
      <button
        key={ answer.correct_answer || answer }
        type="button"
        className="answer-style"
        name={ answer.correct_answer ? CORRECT_ANSWER
          : `wrong-answer-${index}` }
        data-testid={ answer.correct_answer ? CORRECT_ANSWER
          : `wrong-answer-${index}` }
        disabled={ button }
        onClick={ this.handleClick }
        dificulty={ results.difficulty }
      >
        {answer.correct_answer || answer}
      </button>))
    );
  }

  handleButtonStyle() {
    const whichButton = document.querySelectorAll('.answer-style');
    whichButton.forEach((button) => {
      if (button.name === CORRECT_ANSWER) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
  }

  async handleQuestions() {
    const token = loadFromLocalStaorage('token');
    const questionURL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&token=${token}`;
    const requestQuestions = await fetchURL(questionURL);
    this.setState({ questions: requestQuestions }, this.setShuffleAnswers);
  }

  redirectTo(path) {
    const { history } = this.props;
    history.push(path);
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    if (questionIndex === LAST_QUESTION_INDEX) {
      this.redirectTo('/feedback');
    } else {
      this.setState({ questionIndex: questionIndex + 1 });
    }
  }

  handleButton() {
    this.setState((prevState) => ({
      button: !prevState.button,
    }));
  }

  handleClick(e) {
    this.handleButtonStyle();
    const playerAnswer = e.target.name;
    this.setState({ button: true }, () => {
      if (playerAnswer === CORRECT_ANSWER) {
        const {
          player: { name, gravatarEmail, score, assertions },
          sendPlayer,
        } = this.props;
        const TESTE = { name,
          gravatarEmail,
          score,
          assertions: assertions + 1 };
        sendPlayer({ player: TESTE });
        saveToLocalStorage('state', { player: TESTE });
      }
    });
  }

  handleTimeLeft(time) {
    this.setState({ timeLeft: time });
  }

  render() {
    const { questions, questionIndex, button, answers } = this.state;
    if (!questions || !answers.length) {
      return (
        <div className="play-main">
          <Header />
          <div>Loading...</div>
        </div>);
    }
    const { results } = questions;
    return (
      <div className="play-main">
        <Header />
        <div className="body-div">
          <div className="play-question">
            <section className="play-question-board">
              <h2 data-testid="question-category">
                { results[questionIndex].category }
              </h2>
              <p data-testid="question-text">
                { results[questionIndex].question }
              </p>
            </section>
            <div className="play-question-answers">
              <div className="playquestion-answers-options">
                { this.handleAnswers(answers[questionIndex], results[questionIndex]) }
              </div>
              <Timer
                nextQuestion={ this.nextQuestion }
                handleButton={ this.handleButton }
                button={ button }
                handleTimeLeft={ this.handleTimeLeft }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { name, gravatarEmail }, play: { player } }) => ({
  player,
  name,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  sendPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});

Play.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendPlayer: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.shape({
    trim: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Play);
