import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Pergunta extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      correctAnswer: '',
      countdown: 30,
    };
    this.correct = this.correct.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.correct();
    this.timer();
  }

  timer() {
    const secsToWait = 5000;
    const oneSecond = 1000;
    setTimeout(setInterval(() => {
      this.setState((prevState) => ({
        countdown:
          prevState.countdown > 0 ? prevState.countdown - 1 : prevState.countdown }));
    }, oneSecond), secsToWait);
  }

  correct() {
    const { perguntas } = this.props;
    const { contador } = this.state;
    this.setState({
      correctAnswer: perguntas[contador].correct_answer,
    });
  }

  shuffleArr(inputArr) {
    const number = 0.5;
    inputArr.sort(() => Math.random() - number);
    console.log('shuffleAr', inputArr);
    return inputArr;
  }

  shuffleAnswers() {
    const { perguntas } = this.props;
    const { contador, correctAnswer } = this.state;
    const arrAlternativas = [...perguntas[contador].incorrect_answers,
      perguntas[contador].correct_answer,
    ];
    const result = this.shuffleArr(arrAlternativas);
    console.log('result', result);
    return result.map((alternativa, index) => (
      <button
        type="button"
        key={ alternativa }
        data-testid={
          alternativa === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
        }
      >
        { alternativa }
      </button>
    ));
  }

  render() {
    const { contador, countdown } = this.state;
    const { perguntas } = this.props;
    return (
      <div>
        <span data-testid="question-category">{ perguntas[contador].category }</span>
        <p data-testid="question-text">{ perguntas[contador].question }</p>
        <div>{this.shuffleAnswers()}</div>
        <span>{ countdown }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.apiTrivia.resultFrases,
});

Pergunta.propTypes = {
  perguntas: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Pergunta);
