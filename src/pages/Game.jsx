import React, { Component } from 'react';
import './Game.css';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { assertsAction, fetchQuestions, saveScore } from '../redux/actions';
import { GameComponent, Header } from '../components';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.changeIndex = this.changeIndex.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
    this.createRanking = this.createRanking.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  }

  createRanking() {
    const { name, score, gravatarEmail, assertions } = JSON
      .parse(localStorage.getItem('state')).player;
    const newPlayer = { name, score, gravatarEmail, assertions };
    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const rankingUppdate = [...ranking, newPlayer];
      localStorage.ranking = JSON.stringify(rankingUppdate);
      rankingUppdate.sort((a, b) => b.score - a.score);
      localStorage.ranking = JSON.stringify(rankingUppdate);
    } else {
      const ranking = [newPlayer];
      localStorage.ranking = JSON.stringify(ranking);
    }
  }

  changeIndex() {
    const { index } = this.state;
    const { gameQuestions, history } = this.props;
    const two = 2000;
    setTimeout(this.setState((prevState) => ({ index: prevState.index + 1 })), two);
    if (index < gameQuestions.length - 1) {
      document.querySelectorAll('.answer').forEach((answer) => {
        answer.className = 'answer';
        answer.disabled = false;
      });
    } else {
      this.createRanking();
      history.push('/feedBack');
    }
  }

  calculateScore(difficulty, time) {
    const { saveToStore } = this.props;
    const TEN = 10;
    const level = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const score = TEN + (level[difficulty] * time);
    const storageDate = JSON.parse(localStorage.getItem('state'));
    storageDate.player.score += score;
    storageDate.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(storageDate));
    saveToStore(storageDate.player.score);
  }

  optionSelect(atualQt, seconds, value) {
    const { correct_answer: correct, difficulty } = atualQt;
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.disabled = true;
      const cName = answer.value === correct ? 'answer correct-answer'
        : 'answer incorrect-answer';
      answer.className = cName;
    });
    if (value === correct) {
      const { rightQuestion } = this.props;
      rightQuestion();
      this.calculateScore(difficulty, seconds);
    }
  }

  render() {
    const { gameQuestions } = this.props;
    const { index } = this.state;
    if (gameQuestions.length < 1) return <h1>loading...</h1>;

    return (
      <section>
        <Header />
        <GameComponent
          atualQuestion={ gameQuestions[index] }
          optionSelect={ this.optionSelect }
          buttonNext={ this.changeIndex }
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(fetchQuestions(payload)),
  rightQuestion: () => dispatch(assertsAction()),
  saveToStore: (payload) => dispatch(saveScore(payload)),

});
const mapStateToProps = (state) => ({
  token: state.users.token.token,
  gameQuestions: state.game.questions,
  // score: state.game.score,
});

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveToStore: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  rightQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
