import React, { Component } from 'react';
import { decode } from 'html-entities';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const ONE_SECOND = 1000;

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersArray: [],
      visible: false,
      seconds: 5,
    };

    this.buttonsAnswers = this.buttonsAnswers.bind(this);
    this.timer = this.timer.bind(this);
    this.clearSeconds = this.clearSeconds.bind(this);
    this.buttonVisibility = this.buttonVisibility.bind(this);
    this.UrgeWithPleasureComponent = this.UrgeWithPleasureComponent.bind(this);
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
    clearInterval(this.interval);
  }

  UrgeWithPleasureComponent() {
    const { seconds } = this.state;
    return (
      <CountdownCircleTimer
        isPlaying
        duration={ 30 }
        colors={ [
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ] }
      >
        { seconds }
      </CountdownCircleTimer>
    );
  }

  timer() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
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
          clearInterval(this.interval);
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
      <div className="container">
        <div className="row row-cols-auto">
          <h1>
            {seconds}
          </h1>
          { this.UrgeWithPleasureComponent() }
          <h2>
            { `Category: ${category}` }
          </h2>
          <h4>
            { decode(question) }
          </h4>
        </div>
        <div>
          { answersArray }
          <button
            type="button"
            onClick={ () => {
              buttonNext();
              this.buttonVisibility();

              this.setState(() => ({ seconds: 30 }));
              this.timer();
            } }
            hidden={ !visible }
            data-testid="btn-next"
          >
            NEXT
          </button>
        </div>
      </div>
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
