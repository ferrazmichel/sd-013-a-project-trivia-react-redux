import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchURL, loadFromLocalStaorage, saveToLocalStorage } from '../services';
import { sendPlayerInfo } from '../actions';
import Timer from '../components/Timer';

const correctAnswer = 'correct-answer';
const MAX_QUESTIONS = 5;
const LAST_QUESTION_INDEX = MAX_QUESTIONS - 1;
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      questionIndex: 0,
      button: false,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleStyle = this.handleButtonStyle.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
  }

  componentWillUnmount() {
    const { player: { name, gravatarEmail }, submitPlayer } = this.props;
    const TESTE = { name,
      gravatarEmail,
      score: 44,
      assertions: 3 };
    submitPlayer((TESTE));
    saveToLocalStorage('state', TESTE);
  }

  handleAnswers(results) {
    const answers = [...results.incorrect_answers, results.correct_answer];
    const HALF = 0.5;
    const { button } = this.state;
    answers.sort(() => Math.random() - HALF);
    // https://javascript.info/array-methods#shuffle-an-array
    return (answers.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        className="answer-style"
        name={ answer === results.correct_answer ? correctAnswer
          : `wrong-answer-${index}` }
        data-testid={ answer === results.correct_answer ? correctAnswer
          : `wrong-answer-${index}` }
        disabled={ button }
        onClick={ this.handleButtonStyle }
      >
        {answer}
      </button>))
    );
  }

  handleButtonStyle() {
    const whichButton = document.querySelectorAll('.answer-style');
    whichButton.forEach((button) => {
      if (button.name === correctAnswer) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
  }

  async handleQuestions() {
    const token = loadFromLocalStaorage('token');
    const questionURL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&token=${token}`;
    const requestQuestions = await fetchURL(questionURL);
    this.setState({ questions: requestQuestions });
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

  render() {
    const { questions, questionIndex } = this.state;
    if (!questions) {
      return <div>Loading...</div>;
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
                { this.handleAnswers(results[questionIndex]) }
              </div>
              <Timer nextQuestion={ this.nextQuestion } onChange={ this.handleButton } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ play: { player } }) => ({
  player,
});

const mapDispatchToProps = (dispatch) => ({
  submitPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});

Play.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Play);
