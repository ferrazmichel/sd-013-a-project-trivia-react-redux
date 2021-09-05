// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { pressQuestionBtn } from '../redux/actions/pressBtn';

// Children
import HeaderGame from '../components/HeaderGame';
import NextBtn from '../components/NextBtn';

// Styles
import '../styles/Gamepage.css';

class Gamepage extends React.Component {
  constructor() {
    super();

    this.answerRandom = this.answerRandom.bind(this);
    this.enableNextBtn = this.enableNextBtn.bind(this);
    this.sendScoreToLocalStorage = this.sendScoreToLocalStorage.bind(this);
  }

  enableNextBtn() {
    const { enableNextBtnDispatch } = this.props;
    enableNextBtnDispatch();
  }

  sendScoreToLocalStorage({ target }) {
    console.log(target.classList);
    if (target.classList[0] === ('correct-highlight')) {
      // Obtendo dados
      const timer = 1;
      // = this.state utilizar o timer do state;
      const { games, questionNumber } = this.props;
      const { difficulty } = games[questionNumber];
      // Utilizando variaveis de controle
      const obj = { hard: 3, medium: 2, easy: 1 };
      let valor;
      switch (difficulty) {
      case 'hard':
        valor = obj.hard;
        break;
      case 'medium':
        valor = obj.medium;
        break;
      case 'easy':
        valor = obj.easy;
        break;
      default:
      }
      // Obtendo dados do localStorage
      const state = JSON.parse(localStorage.getItem('state'));
      const defaultReward = 10;
      state.player.score += defaultReward + valor * timer;
      // devolvendo os dados para o localStorage
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  handleAnswerClick(event) {
    // Adiciona estilo para a alternativa correta
    const correta = document.querySelector('#correct-answer');
    correta.classList.add('correct-highlight');

    // Adiciona estilo para as alternativas incorretas
    const incorretas = document.querySelectorAll('.incorrect-answer');
    incorretas.forEach((el) => el.classList.add('incorrect-highlight'));

    // Habilitar nova pergunta
    this.enableNextBtn();

    // Enviar score para o state do LocalStorage
    this.sendScoreToLocalStorage(event);
  }

  answerRandom() {
    const answers = [];
    const { games, questionNumber } = this.props;
    const incorretas = games[questionNumber].incorrect_answers;
    const correta = [games[questionNumber].correct_answer];

    answers.push(...incorretas
      .map((answer, index) => (
        <button
          type="button"
          className="incorrect-answer"
          data-testid={ `wrong-answer-${index}` }
          key={ `wrong-answer-${index}` }
          onClick={ (evt) => this.handleAnswerClick(evt) }
        >
          {answer}

        </button>)));
    answers.push(...correta
      .map((answer) => (
        <button
          type="button"
          id="correct-answer"
          data-testid="correct-answer"
          key="correct-answer"
          onClick={ (evt) => this.handleAnswerClick(evt) }
        >
          {answer}

        </button>)));
    return answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  render() {
    const { games, questionNumber } = this.props;
    const { category, question } = games[questionNumber];

    return (
      <section className="Gamepage">
        <HeaderGame />
        Sou uma Página de game
        <div>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
          {this.answerRandom()}
        </div>
        <NextBtn />
      </section>
    );
  }
}

Gamepage.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
  enableNextBtnDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.game.games,
  questionNumber: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  enableNextBtnDispatch: () => dispatch(pressQuestionBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);
