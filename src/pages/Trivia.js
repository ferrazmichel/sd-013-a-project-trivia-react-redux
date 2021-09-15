import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { sucessQuestions, updateScore } from '../redux/actions';
import Question from './Question';
import '../App.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rigthBoarder: '',
      wrongBoarder: '',
      disable: false,
      countdown: 30,
      indexQuestions: 0,
    };
    this.fetchGravater = this.fetchGravater.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.timerDisable = this.timerDisable.bind(this);
    this.countdown = this.countdown.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.scoreFunction = this.scoreFunction.bind(this);
  }

  componentDidMount() {
    this.fetchQuestion();
    this.countdown();
    this.timerDisable();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // const {questions } = this.props;
  //   // const { countdown } = this.state;
  //   // const magicNumber = 30;
  //   if (prevState.countdown !== 0) {
  //     this.countdown();
  //     this.timerDisable();
  //   }
  // }

  async fetchQuestion() {
    const { questionSucess, userEmail, userPlayer } = this.props;
    const lsData = JSON.stringify({ player:
      { name: userPlayer, assertions: 0, score: 0, gravatarEmail: userEmail } });
    localStorage.state = lsData;
    const tokenGet = localStorage.getItem(('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenGet}`);
    const questionsApi = await fetchQuestions.json();
    const questionJson = await questionsApi.results;
    // localStorage.setItem('questions', JSON.stringify(questionJson));
    // this.setState({ questions: questionJson });
    questionSucess(questionJson);
    // console.log('qualquercoisa');
  }

  fetchGravater() {
    const { userEmail } = this.props;
    const LowCaseEmail = userEmail.toLowerCase().trim();
    const hashEmail = md5(LowCaseEmail).toString();
    return (<img
      data-testid="header-profile-picture"
      alt={ hashEmail }
      src={ `https://www.gravatar.com/avatar/${hashEmail}` }
    />);
  }

  countdown() {
    const TIME_RELOAD = 1000;
    // const count10 = 10;
    this.interval = setInterval(() => {
      const { countdown } = this.state;
      if (countdown > 0) {
        this.setState({ countdown: countdown - 1 });
      }
    }, TIME_RELOAD);
  }

  timerDisable() {
    const { countdown } = this.state;
    const TIMER = 30000;
    // const counter = 30;
    // if (countdown === counter) {
    this.timeout = setTimeout(() => {
      this.setState({ disable: true });
    }, TIMER);
    // }
    if (countdown === 0) {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
    }
  }

  handleClick() {
    const { indexQuestions } = this.state;
    const INDEX_LIMIT = 4;
    const { history } = this.props;
    // const { rigthBoarder, wrongBoarder } = this.state;

    if (indexQuestions < INDEX_LIMIT) {
      this.setState({
        indexQuestions: indexQuestions + 1,
        disable: false,
        countdown: 30,
        rigthBoarder: '',
        wrongBoarder: '',
      }, () => {
        this.countdown();
      });
      // asudhs({right, wrong})
      clearTimeout(this.timeout);
      clearInterval(this.interval);
    } else {
      history.push('/feedback');
    }
  }

  // ajuda do gabriel gaspar
  scoreFunction(event) {
    const { target } = event;
    const { updtScore, questionsAPI } = this.props;
    const { countdown, indexQuestions } = this.state;
    // const { correct_answer: correctOpt, difficulty } = questionsAPI;

    if (target.id === 'correct-answer') {
      const basePoints = 10;
      const lsData = JSON.parse(localStorage.state);
      const diff = ['batata', 'easy', 'medium', 'hard'];
      const diffMultiplier = diff.indexOf(questionsAPI[indexQuestions].difficulty);
      lsData.player.assertions += 1;
      lsData.player.score += (basePoints + (countdown * (diffMultiplier)));
      updtScore({ score: lsData.player.score, assertions: lsData.player.assertions });
      localStorage.state = JSON.stringify(lsData);

      console.log(lsData.player.score);
      console.log(lsData.player.assertions);
    }
  }

  // Decidir trocar o nome mais especifico para essa função que faz tudo.
  changeColor() {
    const { rigthBoarder, wrongBoarder } = this.state;

    const green = rigthBoarder === '' ? 'green-border' : '';
    const red = wrongBoarder === '' ? 'red-border' : '';

    this.setState({
      rigthBoarder: green,
      wrongBoarder: red,
      disable: true,
    });

    // this.handleSelect(target);
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  render() {
    const { userPlayer, questionsAPI, placar, acertos } = this.props;
    const { disable,
      countdown,
      indexQuestions, rigthBoarder, wrongBoarder } = this.state;
    // const placar = JSON.parse(localStorage.state);
    return (
      <main>
        <header>
          { this.fetchGravater() }
          <p data-testid="header-player-name">{userPlayer}</p>
          <p data-testid="header-score">{ placar }</p>
          <p data-testid="header-assertions">{ acertos }</p>
        </header>
        <h3>{ countdown }</h3>
        { disable && clearInterval(this.interval) && clearTimeout(this.timeout) }
        {questionsAPI.length > 0 ? (
          <Question
            changeColor={ this.changeColor }
            scoreFunction={ this.scoreFunction }
            right={ rigthBoarder }
            wrong={ wrongBoarder }
            disable={ disable }
            question={ questionsAPI[indexQuestions] }
          />)
          : <p> Loading...</p>}
        {(rigthBoarder === 'green-border' || wrongBoarder === 'red-border'
          || countdown === 0) ? (
            <button type="button" data-testid="btn-next" onClick={ this.handleClick }>
              Next
            </button>) : null}
      </main>
    );
  }
}

Trivia.propTypes = {
  acertos: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  placar: PropTypes.number,
  questionSucess: PropTypes.func,
  questionsAPI: PropTypes.shape({
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    length: PropTypes.number,
  }),
  updtScore: PropTypes.func,
  userEmail: PropTypes.shape({
    toLowerCase: PropTypes.func,
  }),
  userPlayer: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  questionsAPI: state.trivia.results,
  userEmail: state.user.email,
  userPlayer: state.user.player,
  placar: state.trivia.score,
  acertos: state.trivia.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchApi: () => dispatch(fetchApiQuestions()),
  questionSucess: (state) => dispatch(sucessQuestions(state)),
  updtScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
