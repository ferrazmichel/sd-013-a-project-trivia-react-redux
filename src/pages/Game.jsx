import React, { Component } from 'react';
import './Game.css';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'html-entities';
import { fetchQuestions } from '../redux/actions';
import { Header } from '../components';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.changeIndex = this.changeIndex.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
  }

  async componentDidMount() {
    const { questions, token } = this.props;
    questions(token.token);
  }

  changeIndex() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
    document.querySelectorAll('.answer').forEach((answer) => {
      answer.className = 'answer';
    });
  }

  buttonsAnswers() {
    const { index } = this.state;
    const { gameQuestions } = this.props;
    const { incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = gameQuestions[index];

    // source https://stackoverflow.com/a/46545530
    const randomAnswers = (allAnswers) => allAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return randomAnswers([...incorrectAnswers, correctAnswer]);
  }

  optionSelect() {
    const { gameQuestions } = this.props;
    const { index } = this.state;
    const { correct_answer: correctAnswer } = gameQuestions[index];
    document.querySelectorAll('.answer').forEach((answer) => {
      const cName = answer.innerText === correctAnswer
        ? 'answer correct-answer' : 'answer incorrect-answer';
      answer.className = (cName);
    });
  }

  wrongAnswers(answer) {
    const { index } = this.state;
    const { gameQuestions } = this.props;
    const { incorrect_answers: incorrectAnswers } = gameQuestions[index];
    return incorrectAnswers.findIndex((inc) => inc === answer);
  }

  render() {
    const { gameQuestions } = this.props;
    const { index } = this.state;
    if (gameQuestions.length === 0) return <p>loading...</p>;
    const { question, category, correct_answer: correctAnswer } = gameQuestions[index];
    return (
      <div>
        <header><Header /></header>
        <section>
          <div data-testid="question-category">
            { category }
          </div>
          <div data-testid="question-text">
            { decode(question) }
          </div>

          { this.buttonsAnswers().map((answer, key) => (
            <button
              onClick={ this.optionSelect }
              type="button"
              key={ key }
              className="answer"
              data-testid={ answer === correctAnswer ? 'correct-answer'
                : `wrong-answer-${this.wrongAnswers(answer)}` }
            >
              { decode(answer) }
            </button>))}
          <button type="button" onClick={ () => this.changeIndex() }>NEXT</button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (payload) => dispatch(fetchQuestions(payload)),
});
const mapStateToProps = (state) => ({
  token: state.users.token,
  gameQuestions: state.game.questions,
  // score: state.game.score,
});

Game.propTypes = {
  questions: PropTypes.func.isRequired,
  token: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  gameQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
