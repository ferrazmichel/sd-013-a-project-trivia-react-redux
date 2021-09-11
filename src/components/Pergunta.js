import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeFinished } from '../redux/actions';
import Countdown from './Countdown';

class Pergunta extends React.Component {
  constructor() {
    super();
    this.state = {
      contador: 0,
      // correctAnswer: '',
      boolClickAnswer: false,
      assertions: 0,
      score: 0,
    };
    // this.correct = this.correct.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.onClicAknswer = this.onClicAknswer.bind(this);
    this.creatButton = this.creatButton.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.incrementContador = this.incrementContador.bind(this);
    this.pushToFeedbackPage = this.pushToFeedbackPage.bind(this);
  }

  componentDidMount() {
    const { nameUser, gravatar } = this.props;
    const { assertions, score } = this.state;
    const localData = JSON.stringify(
      { player: { name: nameUser, assertions, score, gravatarEmail: gravatar } },
    );
    localStorage.setItem('state', localData);
    // this.correct();
  }

  onClicAknswer({ target }) {
    const { assertions, score } = this.state;
    this.handleColor();
    let acertos = assertions;
    let pontuacao = score;
    if (target.className === 'correct') {
      pontuacao = this.calcScore();
      acertos += 1;
    }
    pontuacao += pontuacao;
    this.updateScore(acertos, pontuacao);
    this.creatButton();
  }

  updateScore(acertos, pontuacao) {
    this.setState({
      boolClickAnswer: true,
      assertions: acertos,
      score: pontuacao,
    }, () => {
      const { assertions, score } = this.state;
      console.log('clickAnswer - ', assertions, '-', score);
      const { nameUser, gravatar } = this.props;
      const localData = JSON.stringify(
        { player: { name: nameUser, assertions, score, gravatarEmail: gravatar } },
      );
      localStorage.setItem('state', localData);
    });
  }

  incrementContador() {
    this.setState((prevState) => ({
      contador: prevState.contador + 1,
    }));
  }

  pushToFeedbackPage() {
    const { history } = this.props;
    history.push('/feedback');
  }

  nextQuestion() {
    const { perguntas, timerFinished } = this.props;
    const { contador } = this.state;
    if (contador === perguntas.length - 1) {
      this.pushToFeedbackPage();
    } else {
      this.setState({
        boolClickAnswer: false,
      });
      this.incrementContador();
      this.resetButtons();
      timerFinished(false);
      const butonNext = document.querySelector('#btnNextId');
      butonNext.parentNode.removeChild(butonNext);
    }
  }

  resetButtons() {
    const buttonCorrect = document.querySelector('.correct');
    const buttonWrong = document.querySelectorAll('.wrong');
    buttonCorrect.disabled = false;
    buttonWrong.forEach((btnWrong) => {
      btnWrong.disabled = false;
    });
  }

  creatButton() {
    const botao = document.createElement('button');
    botao.innerHTML = 'Próxima';
    botao.setAttribute('data-testid', 'btn-next');
    botao.setAttribute('id', 'btnNextId');
    // botao.setAttribute('onclick', () => { this.nextQuestion(); });
    botao.onclick = () => { this.nextQuestion(); };
    const div = document.querySelector('.question');
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
    return inputArr.sort(() => Math.random() - number);
    // console.log('shuffleAr', inputArr);
    // return inputArr;
  }

  // correct() {
  //   const { perguntas } = this.props;
  //   const { contador } = this.state;
  //   this.setState({
  //     correctAnswer: perguntas[contador].correct_answer,
  //   });
  // }

  shuffleAnswers() {
    const { perguntas, boolTimeout } = this.props;
    const { contador } = this.state; // correctAnswer
    // const arrAlternativas = [...perguntas[contador].incorrect_answers,
    //   perguntas[contador].correct_answer,
    // ];
    // ====================================================
    // Trabalhando com objeto:
    const objAlternativas = {
      [perguntas[contador].correct_answer]: 'correct',
    };
    perguntas[contador].incorrect_answers.forEach((answer) => {
      objAlternativas[answer] = 'wrong';
    });
    // ====================================================
    // const result = this.shuffleArr(arrAlternativas); // Versão anterior (apenas os values do array)
    const result = this.shuffleArr(Object.entries(objAlternativas));
    return result.map((alternativa, index) => (
      <button
        type="submit"
        key={ alternativa[0] }
        className={ alternativa[1] === 'correct' ? 'correct' : 'wrong' }
        data-testid={
          alternativa[1] === 'correct' ? 'correct-answer' : `wrong-answer-${index}`
        }
        onClick={ this.onClicAknswer }
        disabled={ boolTimeout }
      >
        { alternativa[0] }
      </button>
    ));
  }

  calcScore() {
    const { contador } = this.state;
    const timeRunned = Number(document.querySelector('#timerId').innerHTML);
    console.log(timeRunned);
    const { perguntas } = this.props;
    const level = perguntas[contador].difficulty;
    let pontuacao = 0;
    const dez = 10;
    const dois = 2;
    const tres = 3;
    switch (level) {
    case 'easy':
      pontuacao = dez + timeRunned;
      break;
    case 'medium':
      pontuacao = dez + (timeRunned * dois);
      break;
    default:
      pontuacao = dez + (timeRunned * tres);
      break;
    }
    console.log(pontuacao);
    return pontuacao;
  }

  render() {
    const { contador, boolClickAnswer } = this.state; // countdown
    const { perguntas, boolTimeout } = this.props;
    console.log('boolClickAnswer', boolClickAnswer);
    return (
      <div className="question">
        <span data-testid="question-category">{ perguntas[contador].category }</span>
        <p data-testid="question-text">{ perguntas[contador].question }</p>
        <div className="pergunta">{ this.shuffleAnswers() }</div>
        {/* <span>{ countdown }</span> */}
        { boolClickAnswer === false && boolTimeout === false ? <Countdown
          boolClickAnswer={ boolClickAnswer }
          createButton={ this.creatButton }
          handleColor={ this.handleColor }
        /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.apiTrivia.resultFrases,
  boolTimeout: state.player.boolTimeout,
  gravatar: state.player.gravatar,
  nameUser: state.player.playerName,
});

const mapDispatchToProps = (dispatch) => ({
  timerFinished: (booleano) => dispatch(timeFinished(booleano)),
});

Pergunta.propTypes = {
  timerFinished: PropTypes.func,
  perguntas: PropTypes.array,
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Pergunta);
