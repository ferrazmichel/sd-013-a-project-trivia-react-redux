import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getQuestions, updateScore } from '../../redux/actions';
import GameBoard from '../../components/GameBoard';
import './Game.css';
import style from './Game.module.css';

const basePoints = 10;

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
    if (qIndex < questions.length - 1) {
      this.setState((state) => ({ qIndex: state.qIndex + 1 }));
      document.getElementsByName('options').forEach((opt) => {
        opt.disabled = false;
        opt.className = '';
      });
      document.querySelector('.btn-next').classList.add('invisible');
    } else {
      this.setState({ redirect: true });
    }
  }

  handleSelect(question, target, seconds) {
    const { updtScore } = this.props;
    const { correct_answer: correctOpt, difficulty } = question;
    document.getElementsByName('options').forEach((opt) => {
      opt.disabled = true;
      const className = opt.value === correctOpt ? 'game-correct' : 'game-incorrect';
      opt.classList.add(className);
    });
    document.querySelector('.btn-next').classList.remove('invisible');

    if (target.value === correctOpt) {
      const lsData = JSON.parse(localStorage.state);
      const diff = ['batata', 'easy', 'medium', 'hard'];
      const diffMultiplier = diff.indexOf(difficulty);
      lsData.player.assertions += 1;
      lsData.player.score += basePoints + (seconds * diffMultiplier);
      updtScore({ score: lsData.player.score, assertions: lsData.player.assertions });
      localStorage.state = JSON.stringify(lsData);
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
