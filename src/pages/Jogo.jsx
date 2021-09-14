import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { BUTTON_NEXT, INLINE_BLOCK } from './JogoConstante';
import './Jogo.css';
import { setPlacar } from '../Actions';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      i: 0,
      timer: 30,
      button: false,
      assertions: 0,
      score: 0,
      numAleatorio: 0,
    };
    this.checkCorrectAnswer = this.checkCorrectAnswer.bind(this);
    this.checkWrongAnswer = this.checkWrongAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.enableNextAndDisableOption = this.enableNextAndDisableOption.bind(this);
    this.numberOfCorrectQuestions = this.numberOfCorrectQuestions.bind(this);
    this.scoreByLevelDifficulty = this.scoreByLevelDifficulty.bind(this);
    this.auxNextQuestion = this.auxNextQuestion.bind(this);
    this.answerAlternatives = this.answerAlternatives.bind(this);
  }

  componentDidMount() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    buttonNext.style.display = 'none';
    const SECONDS = 1000;
    setInterval(this.setTimer, SECONDS);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      const { i, assertions, score } = this.state;
      const { dispatchsetPlacar } = this.props;
      dispatchsetPlacar({ i, assertions, score });
    }
  }

  setTimer() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    const { timer, button } = this.state;
    if (timer - 1 <= 0) {
      const correct = document.querySelector('.correct');
      correct.classList.add('certo');
      buttonNext.style.display = INLINE_BLOCK;
      this.setState({
        button: true,
      });
      clearInterval(this.interval);
    }
    if (!button) {
      this.setState({
        timer: timer - 1,
      });
    }
  }

  scoreByLevelDifficulty(nivel) {
    const NUMBH = 3;
    const NUMBM = 2;
    const NUMBE = 1;
    if (nivel === 'hard') return NUMBH;
    if (nivel === 'medium') return NUMBM;
    if (nivel === 'easy') return NUMBE;
  }

  numberOfCorrectQuestions() {
    const NUMB = 10;
    const { questions } = this.props;
    const { timer, i } = this.state;
    const nivel = questions[i].difficulty;
    const dificuldade = this.scoreByLevelDifficulty(nivel);
    this.setState((state) => ({
      assertions: state.assertions + 1,
      score: state.score + (NUMB + (timer * dificuldade)),
    }));
  }

  enableNextAndDisableOption() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    if (buttonNext) {
      buttonNext.style.display = INLINE_BLOCK;
    }
    this.setState({
      button: true,
    });
  }

  fbRedirect() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    const { i } = this.state;
    const { history } = this.props;
    const num3 = 3;
    const NUMBER_OF_QUESTIONS = 4;
    if (i === num3) {
      buttonNext.innerText = 'Ver Feedback';
    } else if (i === NUMBER_OF_QUESTIONS) {
      history.push('/feedback');
    }
    return true;
  }

  checkCorrectAnswer(e) {
    this.numberOfCorrectQuestions();
    this.enableNextAndDisableOption();
    e.target.classList.add('certo');
    const wrong = document.querySelectorAll('.wrong');
    wrong.forEach((item) => item.classList.add('errado'));
  }

  checkWrongAnswer(e) {
    this.enableNextAndDisableOption();
    e.target.classList.add('errado');
    const correct = document.querySelector('.correct');
    correct.classList.add('certo');
  }

  auxNextQuestion() {
    const buttonNext = document.querySelector(BUTTON_NEXT);
    buttonNext.style.display = 'none';
    const correctButton = document.querySelector('.certo');
    const wrong = document.querySelectorAll('.errado');
    correctButton.classList.remove('certo');
    wrong.forEach((item) => item.classList.remove('errado'));
  }

  nextQuestion() {
    this.auxNextQuestion();
    const { i } = this.state;
    const NUM = 4;
    this.setState({
      i: i + 1,
      timer: 30,
      button: false,
      numAleatorio: Math.floor(Math.random() * (NUM - 0)) + 0,
    });
    this.fbRedirect();
  }

  answerAlternatives() {
    const { questions } = this.props;
    const { i, button, numAleatorio } = this.state;
    const listaDeRespostas = questions[i].incorrect_answers.map((incorrect, index) => (
      <p key={ index }>
        <button
          disabled={ button }
          className="wrong"
          onClick={ this.checkWrongAnswer }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {incorrect}
        </button>
      </p>
    ));

    const alternativasCorretas = (
      <p key={ 3 }>
        <button
          disabled={ button }
          className="correct"
          onClick={ this.checkCorrectAnswer }
          type="button"
          data-testid="correct-answer"
        >
          {questions[i].correct_answer}
        </button>
      </p>);
    listaDeRespostas.push(alternativasCorretas);
    listaDeRespostas
      .splice(numAleatorio, 0, listaDeRespostas
        .splice(listaDeRespostas.length - 1, 1)[0]);
    return listaDeRespostas;
  }

  render() {
    const { questions } = this.props;
    const { i, timer } = this.state;
    return (
      <div>
        <Header i={ i } />
        <div>
          <h1 data-testid="question-text">{questions[i].question}</h1>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          { this.answerAlternatives() }
        </div>
        <p>
          Tempo restante:
          {' '}
          { timer }
          s
        </p>
        <button
          data-testid="btn-next"
          type="button"
          id="button-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchsetPlacar: (state) => dispatch(setPlacar(state)),
});

Jogo.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchsetPlacar: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);

/* Referências para a função que muda a posição da alternativa correta:
https://www.horadecodar.com.br/2020/03/30/javascript-mudar-a-posicao-de-um-elemento-no-array/
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
