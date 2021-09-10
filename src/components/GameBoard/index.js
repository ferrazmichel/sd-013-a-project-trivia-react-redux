import React from 'react';
import PropTypes from 'prop-types';
import style from './GameBoard.module.css';

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

  componentDidUpdate(prevProps) {
    const { seconds } = this.state;
    const ZERO_SECOND = 0;
    if (seconds === ZERO_SECOND) {
      this.resetCronometer();
    }
    if (prevProps !== this.props) {
      this.cronometer();
      this.shuffleOptions();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  cronometer() {
    const ONE_SECOND = 1000;

    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  resetCronometer() {
    this.setState({
      seconds: 'ACABOU O TEMPO!',
    });
    const btns = document.getElementsByName('options');
    btns.forEach((btn) => {
      btn.disabled = true;
    });
    document.querySelector('.btn-next').classList.remove('invisible');
    clearInterval(this.intervalID);
  }

  decode(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  shuffleOptions() {
    const { onSelect, question } = this.props;
    const {
      correct_answer: correctOption,
      incorrect_answers: incorrectOptions,
    } = question;

    this.setState({ seconds: 30 });

    const optionsArray = [...incorrectOptions, correctOption];
    for (let i = optionsArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
    }
    const allOptions = optionsArray.map((opt) => (
      <button
        key={ opt }
        type="button"
        // className={ opt === correctOption ? 'dev-correct' : null }
        data-testid={
          opt === correctOption
            ? 'correct-answer'
            : `wrong-answer-${incorrectOptions.indexOf(opt)}`
        }
        name="options"
        value={ opt }
        onClick={ ({ target }) => {
          const { seconds } = this.state;
          clearInterval(this.intervalID);
          onSelect(question, target, seconds);
        } }
      >
        {this.decode(opt)}
      </button>
    ));
    this.setState({ options: allOptions });
  }

  render() {
    const { question, onNext } = this.props;
    const { seconds, options } = this.state;
    return (
      <section className={ style.section }>
        <article className={ style.time }>{seconds}</article>
        <article className={ style.question }>
          <h3 data-testid="question-category">{question.category}</h3>
          <h4 data-testid="question-text">{this.decode(question.question)}</h4>
        </article>
        <article className={ style.options }>{options}</article>
        <article className={ style.next }>
          <button
            type="button"
            data-testid="btn-next"
            className="btn-next invisible"
            onClick={ onNext }
          >
            Próxima
          </button>
        </article>
      </section>
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
  onNext: PropTypes.func.isRequired,
};
