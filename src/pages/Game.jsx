import React, { Component } from 'react';
import './Game.css';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { assertsAction, fetchQuestions, resetSeconds } from '../redux/actions';
import { GameComponent, Header } from '../components';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.changeIndex = this.changeIndex.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
  }

  async componentDidMount() {
    const { getQuestions, token } = this.props;
    getQuestions(token);
  }

  changeIndex() {
    const { index } = this.state;
    const { gameQuestions, resetSec, history } = this.props;
    const two = 2000;
    setTimeout(this.setState((prevState) => ({ index: prevState.index + 1 })), two);
    if (index < gameQuestions.length - 1) {
      document.querySelectorAll('.answer').forEach((answer) => {
        answer.className = 'answer';
        answer.disabled = false;
      });
      resetSec();
    } else {
      history.push('/feedBack');
    }
  }

  optionSelect(atualQt, seconds, value) {
    const { correct_answer: correct } = atualQt;
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.disabled = true;
      const cName = answer.value === correct ? 'answer correct-answer'
        : 'answer incorrect-answer';
      answer.className = cName;
    });

    if (value === correct) {
      const { rightQuestion } = this.props;
      rightQuestion();
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
  resetSec: () => dispatch(resetSeconds()),
  rightQuestion: () => dispatch(assertsAction()),

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
  resetSec: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  rightQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
