import React from 'react';
import PropTypes from 'prop-types';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
      options: [],
    };
    this.cronometer = this.cronometer.bind(this);
    this.resetCronometer = this.resetCronometer.bind(this);
    this.shuffleOptions = this.shuffleOptions.bind(this);
  }

  componentDidMount() {
    this.cronometer();
    this.shuffleOptions();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const ZERO_SECOND = 0;
    if (seconds === ZERO_SECOND) {
      this.resetCronometer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  cronometer() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      console.log('Intervalo rodando!');
    }, ONE_SECOND);
  }

  resetCronometer() {
    this.setState({
      seconds: null,
    });
    const btns = document.getElementsByName('options');
    btns.forEach((btn) => {
      btn.disabled = true;
    });
    clearInterval(this.cronometerInterval);
  }

  shuffleOptions() {
    const { onSelect, question } = this.props;
    const { correct_answer: correctOption,
      incorrect_answers: incorrectOptions } = question;

    const optionsArray = [...incorrectOptions, correctOption];
    for (let i = optionsArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }
    const allOptions = optionsArray.map((opt) => (
      <button
        key={ opt }
        type="button"
        className={ opt === correctOption ? 'dev-correct' : null }
        data-testid={ opt === correctOption ? 'correct-answer'
          : `wrong-answer-${incorrectOptions.indexOf(opt)}` }
        name="options"
        value={ opt }
        onClick={ () => onSelect(correctOption) }
      >
        { opt }
      </button>
    ));
    this.setState({ options: allOptions });
  }

  render() {
    const { question } = this.props;
    const { seconds, options } = this.state;
    return (
      <div>
        <div>
          {seconds}
          <h3 data-testid="question-category">{ question.category }</h3>
          <h4 data-testid="question-text">{ question.question }</h4>
        </div>
        <div>
          {options}
        </div>
      </div>
    );
  }
}

export default GameBoard;

GameBoard.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
