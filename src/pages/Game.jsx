import React, { Component } from 'react';
import { func, bool, string, number, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Question } from '../components/index';
import { actionTimeoutTrue } from '../redux/actions/index';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import randomize from '../functions/randomize';

class Game extends Component {
  constructor(props) {
    super(props);

    // State inicial vai ser as chaves abaixo:
    this.state = {
      timer: 30, // Tempo de 30 segundos
      position: 0,
      question: { incorrect_answers: [] },
      score: 0,
      randomIndex: [],
      assertions: 0,
    };

    // As funções abaixo serão habilitadas para serem usadas em todo o componente/page
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.checkQuestion = this.checkQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.completeRandomIndex = this.completeRandomIndex.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token, amount, id, difficulty, type } = this.props;

    this.startTimer(0, true);
    getQuiz({ token, amount, id, difficulty, type });
    this.completeRandomIndex();
  }

  // Chama a função para criar um array randomico
  completeRandomIndex() {
    const length = 4;
    const qty = 3;
    const randomIndex = randomize(length, qty);

    // Guarda a informação do randomico no Index
    this.setState({ randomIndex });
  }

  stopTimer() {
    const { timeoutTrue } = this.props;
    clearInterval(this.interval);
    timeoutTrue();
  }

  timer() {
    const { position } = this.state;
    const { loading, questions } = this.props;
    if (!loading) {
      this.setState((prev) => {
        if (prev.timer === 0) {
          this.stopTimer();
          return;
        }
        return ({
          timer: prev.timer - 1,
          question: questions[position],
        });
      });
    }
  }

  checkQuestion() {
    this.setState((prevState) => {
      const hard = 3;
      const { question, timer, score, assertions } = prevState;
      const { difficulty } = question;
      const level = difficulty === 'hard' ? hard : 2;
      const pointsSum = 10;
      const points = timer * (difficulty === 'hard' ? 1 : level) + score + pointsSum;
      const state = JSON.parse(localStorage.getItem('state')) || {};
      const local = JSON.stringify(
        { player: { ...state.player, score: points, assertions: assertions + 1 } },
      );
      localStorage.setItem(
        'state',
        local,
      );
      return ({
        score: points,
        assertions: assertions + 1,
      });
    });
  }

  checkPlayer(ranking, name, score, picture) {
    const checkPlayer = ranking
      .some(({ name: n }) => n === name);
    return !checkPlayer
      ? [...ranking, { name, score, picture }]
      : ranking.map((rank) => {
        if (rank.name !== name) { return rank; }
        rank.score = rank.score > score ? rank.score : score;
        return rank;
      });
  }

  nextQuestion() {
    const { questions, picture, name } = this.props;
    this.setState(({ position }) => ({ position: position + 1 }), () => {
      const { position } = this.state;
      const gameOver = position === questions.length;
      if (gameOver) {
        const { player: { score } } = JSON.parse(localStorage.getItem('state'));
        const ranking = JSON.parse(localStorage.getItem('ranking'));
        const updatedRanking = this.checkPlayer(ranking, name, score, picture);
        localStorage.setItem('ranking', JSON.stringify(updatedRanking));
      }
      this.setState({ question: questions[position] });
    });
    this.completeRandomIndex();
  }

  // Função de criar um contador
  startTimer(sec = 0, start) {
    const maxTime = 30;
    this.setState({ timer: maxTime + sec });
    const oneSec = 1000;
    if (start) {
      this.interval = setInterval(this.timer, oneSec);
      this.timer();
    }
  }

  render() {
    const { timer, question, randomIndex } = this.state;
    const { questions } = this.props;

    return (
      <>
        <p>{timer}</p>
        {/* Chama o componente de questão passando algumas props */}
        <Question
          stopTimer={ this.stopTimer }
          startTimer={ this.startTimer }
          questions={ questions }
          checkQuestion={ this.checkQuestion }
          nextQuestion={ this.nextQuestion }
          question={ question }
          randomIndex={ randomIndex }
        />
      </>
    );
  }
}

// A função do mapDispatchToProps é despachar action para a store, com a finalidade de alterar o state da aplicação
// A função dispatch() serve para despachar uma action para o reducer
// Recebe como parametro uma dispatch, e retorna um objeto com chave e valor
const mapDispatchToProps = (dispatch) => ({
  timeoutTrue: () => dispatch(actionTimeoutTrue()),
  getQuiz: (data) => dispatch(fetchQuiz(data)), // Função do /redux/fetchs/fetchQuiz.js
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  amount: state.user.amount,
  id: state.user.id,
  difficulty: state.user.difficulty,
  type: state.user.type,
  questions: state.quiz.questions,
  loading: state.quiz.loading,
  timeout: state.quiz.timeout,
  picture: state.user.picture,
  name: state.user.playerName,
});

// Faço a validação se os dados que recebi são válidos
Game.propTypes = {
  timeoutTrue: func,
  loading: bool,
  getQuiz: func,
  token: string,
  name: string,
  picture: string,
  type: string,
  difficulty: string,
  amount: number,
  id: number,
  questions: arrayOf(shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
}.isRequired;

// O connect é responsável por fazer a conexão do meu componente Login com o mapStateToProps e o mapDispatchToProps.
export default connect(mapStateToProps, mapDispatchToProps)(Game);
