import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Countdown from './Countdown';

class Pergunta extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      correctAnswer: '',
      // countdown: 5,
    };
    this.correct = this.correct.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);
    // this.timer = this.timer.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.onClicAknswer = this.onClicAknswer.bind(this);
    this.creatButton = this.creatButton.bind(this);
    // this.disableButtons = this.disableButtons.bind(this);
  }

  componentDidMount() {
    this.correct();
  }

  onClicAknswer() {
    this.handleColor();
    this.creatButton();
  }

  // disableButtons() {
  //   const { boolTimeout } = this.props;
  //   const answersBtns = document.querySelectorAll('.wrong');
  //   console.log(answersBtns);
  //   answersBtns.forEach((btn) => { btn.disabled = boolTimeout; });
  // }

  creatButton() {
    const botao = document.createElement('button');
    botao.innerHTML = 'Próxima';
    botao.setAttribute('data-testid', 'btn-next');
    const div = document.querySelector('.pergunta');
    div.appendChild(botao);
  }

  handleColor() {
    const bordaCerta = '3px solid rgb(6, 240, 15)';
    const bordaErrada = '3px solid rgb(255, 0, 0)';
    const buttonCorrect = document.querySelector('.correct');
    const buttonWrong = document.querySelectorAll('.wrong');
    buttonCorrect.style.border = bordaCerta;
    buttonCorrect.disabled = true;
    buttonWrong.forEach((btnWrong) => {
      btnWrong.style.border = bordaErrada;
      btnWrong.disabled = true;
    });
    /* if (target.className === buttonCorrect) {
      target.style.border = bordaCerta;
    } target.style.border = bordaErrada; */
  }

  shuffleArr(inputArr) {
    const number = 0.5;
    inputArr.sort(() => Math.random() - number);
    console.log('shuffleAr', inputArr);
    return inputArr;
  }

  correct() {
    const { perguntas } = this.props;
    const { contador } = this.state;
    this.setState({
      correctAnswer: perguntas[contador].correct_answer,
    });
  }

  shuffleAnswers() {
    const { perguntas, boolTimeout } = this.props;
    const { contador, correctAnswer } = this.state;
    const arrAlternativas = [...perguntas[contador].incorrect_answers,
      perguntas[contador].correct_answer,
    ];
    const result = this.shuffleArr(arrAlternativas);
    console.log('result', result);
    return result.map((alternativa, index) => (
      <button
        type="submit"
        key={ alternativa }
        className={ alternativa === correctAnswer ? 'correct' : 'wrong' }
        data-testid={
          alternativa === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
        }
        onClick={ this.onClicAknswer }
        disabled={ boolTimeout }
      >
        { alternativa }
      </button>
    ));
  }

  render() {
    const { contador } = this.state; // countdown
    const { perguntas, boolTimeout } = this.props;
    console.log('boolTimeout', boolTimeout);
    if (boolTimeout === true) this.onClicAknswer(); // Antes this.disabledButtons
    return (
      <div>
        <span data-testid="question-category">{ perguntas[contador].category }</span>
        <p data-testid="question-text">{ perguntas[contador].question }</p>
        <div className="pergunta">{this.shuffleAnswers()}</div>
        {/* <span>{ countdown }</span> */}
        <Countdown handleTimeout={ this.onClicAknswer } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.apiTrivia.resultFrases,
  boolTimeout: state.player.boolTimeout,
});

Pergunta.propTypes = {
  perguntas: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Pergunta);
