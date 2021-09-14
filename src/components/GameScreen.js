import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setTimer, PointSet, resetStore } from '../actions';
import './GameScreen.css';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    const state = localStorage.getItem('state');
    this.state = {
      indexQuestion: 0,
      isCorrect: '',
      isIncorrect: '',
      player: JSON.parse(state),
    };
    this.renderGame = this.renderGame.bind(this);
    this.handleBotao = this.handleBotao.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.nextAnswers = this.nextAnswers.bind(this);
    this.setState = this.setState.bind(this);
    this.mudarState = this.mudarState.bind(this);
    this.handleClickQuestion = this.handleClickQuestion.bind(this);
    this.renderButtonWithLink = this.renderButtonWithLink.bind(this);
    this.renderButtonWithoutLink = this.renderButtonWithoutLink.bind(this);
    this.savePlayerRanking = this.savePlayerRanking.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    const state = localStorage.getItem('state');
    const { point } = this.props;
    const newPlayer = {
      ...JSON.parse(state),
      player: {
        ...JSON.parse(state).player,
        score: point,
      },
    };
    localStorage.setItem('state', JSON.stringify(newPlayer));
  }

  setScore(param) {
    const { timer, pergunta, setPoint } = this.props;
    const { indexQuestion } = this.state;
    const POINTS_CORRECT_ANSWER = 10;
    const answerDifficulty = pergunta[indexQuestion].difficulty;
    const arryDifficulty = { easy: 1, medium: 2, hard: 3 };
    setPoint(param === 'correct'
      ? POINTS_CORRECT_ANSWER + (timer * arryDifficulty[answerDifficulty])
      : 0);
    this.mudarState();
  }

  setTimer() {
    const ONE_SECOND = 1000;
    const TIMER = setInterval(() => {
      const { loading, reduxTimer, question, timer } = this.props;
      if (timer <= 0 || question === true) {
        clearInterval(TIMER);
        reduxTimer(timer, question);
        Array.from(document.getElementsByClassName('botao'))
          .forEach((item) => { item.disabled = true; });
      } else if (loading === false) {
        const newTimer = parseFloat(timer) - 1;
        reduxTimer(newTimer, question);
      }
    }, ONE_SECOND);
  }

  mudarState() {
    const { point } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      player: parseFloat(prevState.player.point) + point,
    }));
  }

  handleBotao(item, index) {
    const { isIncorrect } = this.state;
    return (
      <button
        data-testid={ `wrong-answer-${index}` }
        className={ `${isIncorrect} botao` }
        type="button"
        value="incorrect"
        key={ index }
        onClick={ this.handleClick }
      >
        {item}
      </button>);
  }

  handleClick({ target: { value } }) {
    const state = localStorage.getItem('state');
    const { reduxTimer, timer } = this.props;
    if (value === 'correct') {
      this.setState({ isCorrect: value, isIncorrect: 'incorrect' });
      this.setScore('correct');
      const newPlayer = {
        ...JSON.parse(state),
        player: {
          ...JSON.parse(state).player,
          assertions: JSON.parse(state).player.assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newPlayer));
    } else if (value === 'incorrect') {
      this.setState({ isCorrect: 'correct', isIncorrect: value });
      this.setScore('incorrect');
    }
    reduxTimer(timer, true);
  }

  handleClickQuestion() {
    const { reduxTimer } = this.props;
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      isCorrect: '',
      isIncorrect: '',
    }));
    Array.from(document.getElementsByClassName('botao'))
      .forEach((item) => { item.disabled = false; });
    const REFRESH_TIMER = 30;
    reduxTimer(REFRESH_TIMER, false);
    this.setTimer();
  }

  nextAnswers() {
    const { indexQuestion } = this.state;
    const LIMITER_QUESTION = 4;
    return (
      indexQuestion === LIMITER_QUESTION
        ? this.renderButtonWithLink() : this.renderButtonWithoutLink()
    );
  }

  savePlayerRanking() {
    const { reset } = this.props;
    const state = localStorage.getItem('state');
    const newPlayerRank = {
      name: JSON.parse(state).player.name,
      score: JSON.parse(state).player.score,
      picture: `https://www.gravatar.com/avatar/${localStorage.getItem('hash')}`,
    };
    const newRankig = {
      ...JSON.parse(state),
      ranking: [
        ...JSON.parse(state).ranking,
        newPlayerRank,
      ],
    };
    localStorage.setItem('state', JSON.stringify(newRankig));
    reset();
  }

  renderButtonWithLink() {
    return (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
          className="feedback"
          onClick={ this.savePlayerRanking }
        >
          Feedback
        </button>
      </Link>
    );
  }

  renderButtonWithoutLink() {
    return (
      <button
        type="button"
        className="next-question"
        onClick={ this.handleClickQuestion }
        data-testid="btn-next"
      >
        Proxima Pergunta
      </button>
    );
  }

  renderGame() {
    const { pergunta, question } = this.props;
    const { indexQuestion, isCorrect } = this.state;
    return (
      <div className="game-content">
        <h1
          data-testid="question-category"
          className="question"
        >
          {`Category: ${pergunta[indexQuestion].category}`}
        </h1>
        <h1
          className="question"
          data-testid="question-text"
        >
          {pergunta[indexQuestion].question}
        </h1>
        <img className="bat" src="https://thumbs.gfycat.com/ActiveCheerfulBarnacle-max-1mb.gif" alt="curious bat" />
        <div className="game-content buttons">
          <button
            type="button"
            className={ `${isCorrect} botao` }
            data-testid="correct-answer"
            value="correct"
            onClick={ this.handleClick }
          >
            {pergunta[indexQuestion].correct_answer}
          </button>
          {pergunta[indexQuestion].incorrect_answers.map(
            (item, index) => this.handleBotao(item, index),
          )}
          {question === true ? this.nextAnswers() : null}
        </div>
      </div>
    );
  }

  render() {
    const { answer: { isLoading } } = this.props;
    return (
      isLoading === true
        ? <div className="loading">Loading...</div>
        : this.renderGame()
      isLoading === true ? <h1>Loading</h1> : this.renderGame()
    );
  }
}

GameScreen.propTypes = {
  answer: PropTypes.shape({
    isLoading: PropTypes.bool,
    answer: PropTypes.shape({}) }),
  reduxTimer: PropTypes.func,
  timer: PropTypes.number,
  question: PropTypes.bool,
  loading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  loading: state.game.isLoading,
  answer: state.game,
  timer: state.game.timer,
  question: state.game.question,
  pergunta: state.game.answer,
  point: state.game.point,
});

const mapDispatchToProps = (dispatch) => ({
  reduxTimer: (timer, answer) => dispatch(setTimer(timer, answer)),
  setPoint: (point) => dispatch(PointSet(point)),
  reset: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
