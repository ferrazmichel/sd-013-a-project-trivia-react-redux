import React, { Component } from 'react';
import './Game.css';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'html-entities';
import { fetchQuestions } from '../redux/actions';
import { AnswersButton, Cronometer, Header } from '../components';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timer: true,
      seconds: 0,
      points: 0,
    };
    this.changeIndex = this.changeIndex.bind(this);
    this.optionSelect = this.optionSelect.bind(this);
    this.changeSeconds = this.changeSeconds.bind(this);
    this.clickSelected = this.clickSelected.bind(this);
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
      answer.disabled = false;
    });
    this.setState({ timer: true });
  }

  optionSelect() {
    const { gameQuestions } = this.props;
    const { index } = this.state;
    const { correct_answer: correctAnswer } = gameQuestions[index];
    document.querySelectorAll('.answer').forEach((answer) => {
      const cName = answer.innerText === correctAnswer
        ? 'answer correct-answer' : 'answer incorrect-answer';
      answer.className = (cName);
      answer.disabled = true;
    });
    this.setState({ timer: false });
  }

  clickSelected(event) {
    const { value } = event.target;
    const { points } = this.state;
    console.log(value);
    if (value === 'correct') {
      this.setState({ points: points + 1 });
    }
    this.optionSelect();
  }

  // buttonsAnswers() {
  //   const { gameQuestions } = this.props;
  //   if (gameQuestions.length === 0) return '';
  //   const { index } = this.state;
  //   const { correct_answer: correct,
  //     incorrect_answers: incorrect } = gameQuestions[index];
  //   // source https://stackoverflow.com/a/46545530
  //   const answers = [...incorrect, correct]
  //     .map((value) => ({ value, sort: Math.random() }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map(({ value }) => value);
  //   const buttons = answers.map((answer, key) => (
  //     <button
  //       onClick={ this.clickSelected }
  //       type="button"
  //       key={ key }
  //       className="answer"
  //       data-testid={ answer === correct ? 'correct-answer'
  //         : `wrong-answer-${incorrect.findIndex((inc) => inc === answer)}` }
  //       value={ answer === correct ? 'correct' : 'incorrect' }
  //     >
  //       { decode(answer) }
  //     </button>
  //   ));
  //   this.setState({ questions: buttons });
  // }

  changeSeconds(seconds) {
    this.setState({ seconds });
  }

  render() {
    const { gameQuestions } = this.props;
    const { index, timer } = this.state;
    if (gameQuestions.length === 0) return <p>loading...</p>;
    const { question, category, correct_answer: correct,
      incorrect_answers: incorrect } = gameQuestions[index];

    return (
      <div>
        <header><Header /></header>
        <section>
          <div data-testid="question-category">
            { category }
          </div>
          {
            timer
              && <Cronometer
                optionSelect={ this.optionSelect }
                changeSeconds={ this.changeSeconds }
              />
          }
          <div data-testid="question-text">
            { decode(question) }
          </div>
          <AnswersButton
            correct={ correct }
            incorrect={ incorrect }
            onClick={ this.clickSelected }
          />
          {
            // this.buttonsAnswers([...incorrect, correct]).map((answer, key) => (
            //   <button
            //     onClick={ this.clickSelected }
            //     type="button"
            //     key={ key }
            //     className="answer"
            //     data-testid={ answer === correct ? 'correct-answer'
            //       : `wrong-answer-${incorrect.findIndex((inc) => inc === answer)}` }
            //     value={ answer === correct ? 'correct' : 'incorrect' }
            //   >
            //     { decode(answer) }
            //   </button>))
          }
          <button type="button" onClick={ this.changeIndex }>NEXT</button>
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
