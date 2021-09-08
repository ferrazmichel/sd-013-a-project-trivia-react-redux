import React, { Component } from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';
// import Cronometer from './Cronometer';

const interval = 1000;

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      visible: false,
      seconds: 30,
    };

    this.buttonsAnswers = this.buttonsAnswers.bind(this);
    this.timer = this.timer.bind(this);
    this.buttonVisibility = this.buttonVisibility.bind(this);
  }

  componentDidMount() {
    this.buttonsAnswers();
    this.timer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.clearSeconds();
    }
    if (prevProps !== this.props) {
      this.buttonsAnswers();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer());
  }

  timer() {
    // const { updateSec, resetSec } = this.props;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, interval);
  }

  clearSeconds() {
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.disabled = true;
    });
    this.buttonVisibility();
    clearInterval(this.interval);
  }

  buttonsAnswers() {
    const { atualQuestion, optionSelect } = this.props;
    const { correct_answer: correct,
      incorrect_answers: incorrect } = atualQuestion;

    // source https://stackoverflow.com/a/46545530
    const answers = [...incorrect, correct]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const buttonsAnswers = answers.map((answer, key) => (
      <button
        onClick={ ({ target }) => {
          const { seconds } = this.state;
          this.buttonVisibility();
          optionSelect(atualQuestion, seconds, target.value);
        } }
        type="button"
        key={ key }
        className="answer"
        data-testid={ answer === correct ? 'correct-answer'
          : `wrong-answer-${incorrect.findIndex((inc) => inc === answer)}` }
        value={ answer === correct ? correct : incorrect }
      >
        { decode(answer) }
      </button>
    ));
    this.setState({ answersArray: buttonsAnswers });
  }

  buttonVisibility() {
    this.setState((previousState) => ({
      visible: !previousState.visible,
    }));
  }

  render() {
    const { atualQuestion, buttonNext } = this.props;
    const { category, question } = atualQuestion;
    const { answersArray, visible, seconds } = this.state;

    return (
      <>
        <div>
          <h2 data-testid="question-category">
            { `Category: ${category}` }
          </h2>
          <h4 data-testid="question-text">
            { decode(question) }
          </h4>
          { seconds }
          {/* <Cronometer visibility={ this.buttonVisibility } /> */}
        </div>
        <div>
          { answersArray }
          <button
            type="button"
            onClick={ () => {
              buttonNext();
              this.buttonVisibility();

              this.setState(() => ({ seconds: 30 }));
            } }
            hidden={ !visible }
            data-testid="btn-next"
          >
            NEXT
          </button>
        </div>
      </>
    );
  }
}

GameComponent.propTypes = {
  buttonNext: PropTypes.func.isRequired,
  optionSelect: PropTypes.func.isRequired,
  atualQuestion: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    diffculty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default GameComponent;
