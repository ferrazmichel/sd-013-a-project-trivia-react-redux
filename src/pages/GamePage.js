import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfQuestion: 0,
      counter: 30,
      crono: 'Timer Function',
      buttonsDisables: false,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.randomAnswer = this.randomAnswer.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  handleColorChange() {
    const { crono } = this.state;
    const getBtnsOptions = document.querySelectorAll('.button-answers');
    getBtnsOptions.forEach((button) => {
      if (button.name === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
    clearInterval(crono);
    this.setState(() => ({ buttonsDisables: true }));
  }

  timer() {
    document.querySelectorAll('.button-answers')
      .forEach((element) => {
        element.style.border = 'currentColor';
      });
    const INTERVAL = 1000;
    const TIMEOUT = 30000;
    setTimeout(this.handleColorChange, TIMEOUT);
    const crono = setInterval(() => {
      this.setState(({ counter }) => ({ counter: counter - 1 }));
    }, INTERVAL);
    this.setState(() => ({ crono }));
  }

  randomAnswer() {
    const { numberOfQuestion } = this.state;
    const { questions } = this.props;
    const index = 4;
    const randomizer = [...questions[numberOfQuestion].incorrect_answers];
    randomizer.splice(Math.floor(Math.random() * index),
      0, questions[numberOfQuestion].correct_answer);
    return randomizer;
  }

  submitAnswer() {
    this.setState(
      ({ numberOfQuestion }) => ({
        numberOfQuestion: numberOfQuestion + 1,
        counter: 30,
        buttonsDisables: false,
      }), this.timer,
    );
  }

  answers() {
    const { questions } = this.props;
    const { numberOfQuestion, buttonsDisables } = this.state;
    return this.randomAnswer().map((answer, index) => {
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
          disabled={ buttonsDisables }
          key={ index }
          name={ nameButton }
          onClick={ this.handleColorChange }
          type="button"
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { questions } = this.props;
    const { numberOfQuestion, counter } = this.state;
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
        <span>{ counter }</span>
        <h3 data-testid="question-text">{ questions[numberOfQuestion].question }</h3>
        <h4 data-testid="question-category">{ questions[numberOfQuestion].type }</h4>
        { this.answers() }
        <button type="button" onClick={ this.submitAnswer }>Next Question</button>
      </div>
    );
  }
}

GamePage.propTypes = {
  questions: PropTypes.object,
}.isRequired;

const mapStateToProps = (stateStore) => ({
  questions: stateStore.questions.questions.results,
});

export default connect(mapStateToProps)(GamePage);
