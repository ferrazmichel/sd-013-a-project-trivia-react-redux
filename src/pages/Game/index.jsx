import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getQuestions, updateScore } from '../../redux/actions';
import { GameBoard } from '../../components';
import './Game.css';
import style from './Game.module.css';
import { handleScore, handleSelectButtons, resetQuestions } from './helpers';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      qIndex: 0,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { getQs, token } = this.props;
    getQs(token);
  }

  handleNext() {
    const { qIndex } = this.state;
    const { questions } = this.props;
    return (qIndex < questions.length - 1)
      ? this.setState((state) => ({ qIndex: state.qIndex + 1 }),
        resetQuestions('options', '.btn-next'))
      : this.setState({ redirect: true }, () => {
        // is playing game reducer to false
      });
  }

  handleSelect(question, target, seconds) {
    const { updtScore } = this.props;
    const { correct_answer: correctOpt, difficulty } = question;
    handleSelectButtons(correctOpt, 'options', '.btn-next');

    if (target.value === correctOpt) {
      const score = handleScore(difficulty, seconds);
      updtScore(score);
    }
  }

  render() {
    const { redirect, qIndex } = this.state;
    const { questions } = this.props;
    if (questions.length < 1) return <h3>Loading...</h3>;
    if (redirect) return <Redirect to="/feedback" />;
    return (
      <main className={ style.main }>
        <Header />
        <GameBoard
          question={ questions[qIndex] }
          onSelect={ this.handleSelect }
          onNext={ this.handleNext }
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQs: (payload) => dispatch(getQuestions(payload)),
  updtScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  getQs: PropTypes.func.isRequired,
  updtScore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
