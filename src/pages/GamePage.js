import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { showMilhaoAPI } from '../actions/index';

class GamePage extends Component {
  constructor(props) {
    super(props);

    const noMagicNumber = 4;

    this.state = {
      numberOfQuestion: 0,
      counter: 30,
      cronoInterval: 'Timer Function Interval',
      cronoTimeout: 'Timer Function Timeout',
      answersButtonsDisables: false,
      nextButtonAppear: 'none',
      randomNumber: Math.floor(Math.random() * noMagicNumber),
      assertions: 0,
      score: 0,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.randomAnswer = this.randomAnswer.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.dispatchRequestQuestions = this.dispatchRequestQuestions.bind(this);
    this.initialLocalStorage = this.initialLocalStorage.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.dispatchRequestQuestions();
    this.timer();
    this.initialLocalStorage();
  }

  initialLocalStorage() {
    const { name, gravatarEmail } = this.props;
    const { assertions, score } = this.state;
    const obj = { player: { name, gravatarEmail, assertions, score } };
    localStorage.setItem('state', JSON.stringify(obj));
  }

  async dispatchRequestQuestions() {
    const { startGame } = this.props;
    await startGame();
  }

  handleColorChange({ target: { name: answerName } } = { target: { answerName: '' } }) {
    const { cronoInterval } = this.state;
    const getBtnsOptions = document.querySelectorAll('.button-answers');
    getBtnsOptions.forEach((button) => {
      if (button.name === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
    clearInterval(cronoInterval);
    this.setState(() => ({
      answersButtonsDisables: true,
      nextButtonAppear: 'flex',
    }), () => {
      if (answerName === 'correct') {
        const { name, gravatarEmail } = this.props;
        let { assertions, score } = this.state;
        const { counter } = this.state;
        assertions += 1;
        score += (counter * assertions);
        const obj = { player: {
          name, gravatarEmail, assertions, score,
        } };
        localStorage.setItem('state', JSON.stringify(obj));
        this.setState(() => ({ assertions, score }));
      }
    });
  }

  timer() {
    document.querySelectorAll('.button-answers')
      .forEach((element) => {
        element.style.border = '1px solid black';
      });
    const INTERVAL = 1000;
    const TIMEOUT = 30000;
    const cronoTimeout = setTimeout(this.handleColorChange, TIMEOUT);
    const cronoInterval = setInterval(() => {
      this.setState(({ counter }) => ({ counter: counter - 1 }));
    }, INTERVAL);
    this.setState(() => ({ cronoTimeout, cronoInterval, nextButtonAppear: 'none' }));
  }

  randomAnswer() {
    const { numberOfQuestion, randomNumber } = this.state;
    const { questions } = this.props;
    const randomizer = [...questions[numberOfQuestion].incorrect_answers];
    randomizer.splice(randomNumber,
      0, questions[numberOfQuestion].correct_answer);
    return randomizer;
  }

  submitAnswer() {
    const { numberOfQuestion: question } = this.state;
    const noMagicNumber = 4;
    if (question === noMagicNumber) {
      const { history } = this.props;
      history.push('/feedbackpage');
    } else {
      this.setState(
        ({ numberOfQuestion }) => ({
          numberOfQuestion: numberOfQuestion + 1,
          counter: 30,
          answersButtonsDisables: false,
          randomNumber: Math.floor(Math.random() * noMagicNumber),
        }), this.timer,
      );
    }
  }

  questionAndAnswers() {
    const { questions } = this.props;
    const { numberOfQuestion, answersButtonsDisables, cronoTimeout } = this.state;
    return (
      <>
        <h3 data-testid="question-text">{ questions[numberOfQuestion].question }</h3>
        <h4 data-testid="question-category">{ questions[numberOfQuestion].type }</h4>
        { this.randomAnswer().map((answer, index) => {
          let testidButton;
          let nameButton;
          if (answer === questions[numberOfQuestion].correct_answer) {
            testidButton = 'correct-answer';
            nameButton = 'correct';
          } else {
            testidButton = `wrong-answer-${index}`;
            nameButton = 'wrong';
          }
          return (
            <button
              className="button-answers"
              data-testid={ testidButton }
              disabled={ answersButtonsDisables }
              key={ index }
              name={ nameButton }
              onClick={ (event) => {
                clearTimeout(cronoTimeout);
                this.handleColorChange(event);
              } }
              type="button"
            >
              { answer }
            </button>
          );
        }) }
      </>
    );
  }

  render() {
    const { isLoading, questions } = this.props;
    const { counter, nextButtonAppear } = this.state;
    const loading = (<span>Loading...</span>);
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
        <span>{ counter }</span>
        { (isLoading || !questions) ? loading : this.questionAndAnswers() }
        <button
          data-testid="btn-next"
          onClick={ this.submitAnswer }
          style={ { display: nextButtonAppear } }
          type="button"
        >
          Next Question
        </button>
      </div>
    );
  }
}

GamePage.propTypes = {
  questions: PropTypes.object,
}.isRequired;

const mapStateToProps = (stateStore) => ({
  questions: stateStore.questions.questions.results,
  isLoading: stateStore.questions.isLoading,
  token: stateStore.questions.token.token,
  name: stateStore.user.nickname,
  gravatarEmail: stateStore.user.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch(showMilhaoAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
