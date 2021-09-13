import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { sucessQuestions } from '../redux/actions';
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
      // disableButtonNext: true,
      // questions: [],
    };
    this.fetchGravater = this.fetchGravater.bind(this);
    // this.gameInfo = this.gameInfo.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.timerDisable = this.timerDisable.bind(this);
    this.countdown = this.countdown.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const { fetchApi } = this.props;
    this.fetchGravater();
    // fetchApi();
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

  // fecthLocalStorage() {
  // async fetchApiQuestions() {
  //   // let token = localStorage.getItem('token');
  //   // if (!localStorage[token]) {
  //   //   token = await getTokenApi();
  //   // }
  async fetchQuestion() {
    const { questionSucess } = this.props;
    const tokenGet = localStorage.getItem(('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenGet}`);
    const questionsApi = await fetchQuestions.json();
    const questionJson = await questionsApi.results;
    localStorage.setItem('questions', JSON.stringify(questionJson));
    // this.setState({ questions: questionJson });
    questionSucess(questionJson);
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
      this.setState({ countdown: countdown - 1 });
    }, TIME_RELOAD);
  }

  timerDisable() {
    // const { countdown } = this.state;
    const TIMER = 3000;
    // const counter = 30;
    // if (countdown === counter) {
    this.timeout = setTimeout(() => {
      this.setState({ disable: true });
    }, TIMER);
    // }
  }

  handleClick() {
    const { indexQuestions } = this.state;
    const INDEX_LIMIT = 4;
    const { rigthBoarder, wrongBoarder } = this.state;

    if (indexQuestions < INDEX_LIMIT) {
      this.setState({
        indexQuestions: indexQuestions + 1,
        disable: false,
        disableButtonNext: true,
        countdown: 30,
        rigthBoarder: '',
        wrongBoarder: '',
      }, () => {
        // this.randomAnswer();
        this.countdown();
      });
      // asudhs({right, wrong})
      clearTimeout(this.timeout);
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

    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  render() {
    const { userPlayer, questionsAPI } = this.props;
    const { disable,
      countdown,
      indexQuestions, disableButtonNext, rigthBoarder, wrongBoarder } = this.state;

    return (
      <main>
        <header>
          { this.fetchGravater() }
          <p data-testid="header-player-name">{userPlayer}</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        <h3>{ countdown }</h3>
        { disable && clearInterval(this.interval) }
        {questionsAPI.length > 0 ? (
          <Question
            changeColor={ this.changeColor }
            right={ rigthBoarder }
            wrong={ wrongBoarder }
            disable={ disable }
            question={ questionsAPI[indexQuestions] }
          />)
          : <p> Loading...</p>}
        {(rigthBoarder === 'green-border' || wrongBoarder === 'red-border') ? (
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>) : null}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsAPI: state.trivia.results,
  userEmail: state.user.email,
  userPlayer: state.user.player,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchApi: () => dispatch(fetchApiQuestions()),
  questionSucess: (state) => dispatch(sucessQuestions(state)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
