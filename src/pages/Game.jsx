import React, { Component } from 'react';
import './Game.css';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Sound from 'react-sound';

import { assertsAction, fetchQuestions, saveScore,
  sendMissQt, sendRightQt } from '../redux/actions';
import { GameComponent, Header } from '../components';

import quepena from '../files/sounds/errada.mp3';
import certaresposta from '../files/sounds/certa-resposta.mp3';

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
    const { getQuestions, token, category, nQuestions, diff } = this.props;
    const options = {
      category,
      nQuestions,
      diff,
    };
    getQuestions(token, options);
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
    const { gameQuestions, history, sendMissQT, missSoundFx,
      rightSoundFx, sendRightQT } = this.props;
    const two = 2000;

    if (missSoundFx) sendMissQT();
    if (rightSoundFx) sendRightQT();

    setTimeout(this.setState((prevState) => ({ index: prevState.index + 1 })), two);
    if (index < gameQuestions.length - 1) {
      document.querySelectorAll('.answer').forEach((answer) => {
        answer.className = 'answer btn rounded-pill btn-start btn-lg btn-block';
        answer.disabled = false;
      });
    } else {
      this.createRanking();
      history.push('/feedback');
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
    const { sendMissQT, sendRightQT, rightSoundFx, missSoundFx } = this.props;
    const { correct_answer: correct, difficulty } = atualQt;
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.disabled = true;
      const cName = answer.value === correct
        ? 'answer correct-answer rounded-pill btn btn-start btn-lg btn-block'
        : 'answer incorrect-answer rounded-pill btn btn-start btn-lg btn-block';
      answer.className = cName;
    });
    if (value === correct) {
      const { rightQuestion } = this.props;
      rightQuestion();
      this.calculateScore(difficulty, seconds);
      sendRightQT();
      if (missSoundFx) sendMissQT();
    } else {
      sendMissQT();
      if (rightSoundFx) sendRightQT();
    }
  }

  render() {
    const { gameQuestions, missSoundFx, rightSoundFx } = this.props;
    const { index } = this.state;
    if (gameQuestions.length < 1) return <h1>loading...</h1>;

    return (
      <section className="feedback-page">
        { missSoundFx && <Sound
          url={ quepena }
          playStatus={ Sound.status.PLAYING }
          onLoading={ this.handleSongLoading }
          onPlaying={ this.handleSongPlaying }
          onFinishedPlaying={ this.handleSongFinishedPlaying }
        />}
        { rightSoundFx && <Sound
          url={ certaresposta }
          playStatus={ Sound.status.PLAYING }
          onLoading={ this.handleSongLoading }
          onPlaying={ this.handleSongPlaying }
          onFinishedPlaying={ this.handleSongFinishedPlaying }
        />}
        <Header />
        <div className="row col-md-5 shadow mx-auto p-5 btn-primary mt-3">
          <GameComponent
            atualQuestion={ gameQuestions[index] }
            optionSelect={ this.optionSelect }
            buttonNext={ this.changeIndex }
          />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload, options) => dispatch(fetchQuestions(payload, options)),
  rightQuestion: () => dispatch(assertsAction()),
  saveToStore: (payload) => dispatch(saveScore(payload)),
  sendMissQT: () => dispatch(sendMissQt()),
  sendRightQT: () => dispatch(sendRightQt()),

});
const mapStateToProps = (state) => ({
  token: state.users.token.token,
  gameQuestions: state.game.questions,
  rightSoundFx: state.game.rightSoundFx,
  missSoundFx: state.game.missSoundFx,
  category: state.optionsReducer.category,
  nQuestions: state.optionsReducer.nQuestions,
  diff: state.optionsReducer.diff,
});

Game.propTypes = {
  diff: PropTypes.string.isRequired,
  nQuestions: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  sendMissQT: PropTypes.func.isRequired,
  sendRightQT: PropTypes.func.isRequired,
  rightSoundFx: PropTypes.bool.isRequired,
  missSoundFx: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveToStore: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  rightQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
