import React, { Component } from 'react';
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
  }

  async componentDidMount() {
    const { questions, token } = this.props;
    questions(token.token);
  }

  changeIndex() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
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

    return randomAnswers([...incorrectAnswers, correctAnswer]).map((answer, key) => {
      if (answer === correctAnswer) {
        return (
          <button
            type="button"
            key={ key }
            data-testid="correct-answer"
          >
            {answer}
          </button>);
      }
      return (
        <button
          type="button"
          key={ key }
          data-testid={ `wrong-answer-${this.wrongAnswers(answer)}` }
        >
          {decode(answer)}
        </button>);
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
    const { question, category } = gameQuestions[index];
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
          { this.buttonsAnswers() }
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
