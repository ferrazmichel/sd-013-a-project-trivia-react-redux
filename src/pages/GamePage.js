import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfQuestion: 0,
      allAnswers: [],
      isLoading: false,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
    this.randomAnswer = this.randomAnswer.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  randomAnswer() {
    const { allAnswers, numberOfQuestion } = this.state;
    const { questions } = this.props;
    const index = 4;
    allAnswers.splice(Math.floor(Math.random() * index),
      0, questions[numberOfQuestion].correct_answer);
    this.setState(() => ({ allAnswers, isLoading: false }));
  }

  submitAnswer() {
    const { questions } = this.props;
    this.setState(
      ({ numberOfQuestion }) => ({
        isLoading: true,
        numberOfQuestion: numberOfQuestion + 1,
        allAnswers: questions[numberOfQuestion + 1].incorrect_answers,
      }),
      this.randomAnswer,
    );
  }

  handleColorChange() {
    const getBtnsOptions = document.querySelectorAll('.button-answers');
    getBtnsOptions.forEach((button) => {
      if (button.name === 'correct') {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
  }

  answers() {
    const { questions } = this.props;
    const { numberOfQuestion, isLoading } = this.state;
    let { allAnswers } = this.state;
    if (isLoading) return <span>Loading...</span>;
    if (!allAnswers.length) {
      const index = 4;
      questions[numberOfQuestion].incorrect_answers
        .splice(Math.floor(Math.random() * index),
          0, questions[numberOfQuestion].correct_answer);
      allAnswers = questions[numberOfQuestion].incorrect_answers;
    }
    return allAnswers.map((answer, index) => {
      if (answer === questions[numberOfQuestion].correct_answer) {
        return (
          <button
            data-testid="correct-answer"
            className="button-answers"
            name="correct"
            type="button"
            key={ index }
            onClick={ this.handleColorChange }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          data-testid={ `wrong-answer-${index}` }
          className="button-answers"
          name="wrong"
          type="button"
          key={ index }
          onClick={ this.handleColorChange }
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { questions } = this.props;
    const { numberOfQuestion } = this.state;
    return (
      <div>
        <Header />
        <h1>Game Page</h1>
        <span>temporizador</span>
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
