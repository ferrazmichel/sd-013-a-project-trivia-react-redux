import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Button from '../components/Button';
import mountQuestions from '../services/fetchGame';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionsIndex: 0,
      hidden: true,
      loading: true,
      timerValue: 30,
      disabledOptions: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.hideNextQuestionButton = this.hideNextQuestionButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showNextQuestionButton = this.showNextQuestionButton.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timer = this.timer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.isClicked = this.isClicked.bind(this);
    this.saveRanking = this.saveRanking.bind(this);
  }

  async componentDidMount() {
    const { configs } = this.props;
    const questions = await mountQuestions(configs);
    this.getQuestions(questions);
    console.log(questions);
  }

  getQuestions(questions) {
    this.setState({
      questions,
      loading: false,
    });
  }

  hideNextQuestionButton() {
    this.setState({
      hidden: true,
    });
  }

  isClicked() {
    this.setState({
      disabledOptions: true,
    });
  }

  nextQuestion() {
    const FOUR = 4;
    const { questionsIndex } = this.state;
    if (questionsIndex === FOUR) {
      this.saveRanking();
    }
    this.resetTimer();
    this.timer();
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
      disabledOptions: false,
      hidden: true,
    }));
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer() {
    this.setState({
      timerValue: 30,
    });
  }

  saveRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { gravatarUrl } = player;
    const finalScore = {
      picture: gravatarUrl,
      name: player.name,
      score: player.score,
    };
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([finalScore]));
    }
    if (ranking) {
      const thisUser = ranking.find((playerScore) => playerScore.picture === gravatarUrl);

      if (thisUser) {
        thisUser.score = player.score;
        localStorage.setItem('ranking', JSON.stringify(ranking));
      } else {
        ranking.push(finalScore);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
    }
  }

  stopTimer() {
    const { timerValue } = this.state;
    const ZERO = 0;
    if (timerValue === ZERO) {
      clearInterval(this.interval);
      this.setState({
        disabledOptions: true,
      });
      this.showNextQuestionButton();
    }
  }

  showNextQuestionButton() {
    this.setState({
      hidden: false,
    });
  }

  timer() {
    const ONE_SECOND = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timerValue: prevState.timerValue - 1,
      }));
      this.stopTimer();
    }, ONE_SECOND);
  }

  render() {
    const {
      hidden,
      questions,
      questionsIndex,
      loading,
      timerValue,
      disabledOptions } = this.state;

    const FIVE = 5;

    if (questionsIndex === FIVE) {
      return <Redirect to="/feedback" />;
    }

    return (
      <>
        <Header />
        {
          loading ? <p>Loading...</p> : <Question
            hide={ this.hideNextQuestionButton }
            question={ questions[questionsIndex] }
            show={ this.showNextQuestionButton }
            timerValue={ timerValue }
            pauseTimer={ this.pauseTimer }
            startTimer={ this.timer }
            resetTimer={ this.resetTimer }
            isClicked={ this.isClicked }
            disabledOptions={ disabledOptions }
          />
        }
        {
          !hidden && <Button
            className=""
            data-testid="btn-next"
            disabled={ hidden }
            name="Próxima"
            onClick={ this.nextQuestion }
          />
        }
      </>
    );
  }
}

const mapStateToProps = ({ gameSettings: { difficulty, category, type } }) => ({
  configs: {
    difficulty,
    category,
    type,
  },
});

GamePage.propTypes = {
  configs: PropTypes.shape({
    difficulty: PropTypes.string,
    cattegory: PropTypes.string,
    type: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(GamePage);
