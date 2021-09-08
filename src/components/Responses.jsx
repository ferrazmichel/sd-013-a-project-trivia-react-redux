import React from 'react';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actionGetIndexQuestion } from '../actions';

class Responses extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.nextClick = this.nextClick.bind(this);

    this.state = {
      displayBtn: 'none',
      correctAnswerStyle: null,
      incorrectAnswerStyle: null,
      statusBtn: false,
      timer: 30000,
      redirect: false,
    };
  }

  handleClick() {
    this.setState({
      displayBtn: 'block',
      correctAnswerStyle: 'correct',
      incorrectAnswerStyle: 'incorrect',
      statusBtn: true,
      timer: 0,
    });
  }

  nextClick() {
    const { nextQuestion, index } = this.props;
    const number = 4;
    this.setState({
      displayBtn: 'none',
      correctAnswerStyle: null,
      incorrectAnswerStyle: null,
      statusBtn: false,
      timer: 30000,
    });
    if (index < number) nextQuestion();

    if (index === number) {
      this.setState({
        redirect: true,
      });
    }
  }

  htmldecode(value) {
    const correct = document.createElement('textarea');
    correct.innerHTML = value;
    return correct.value;
  }

  render() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const { displayBtn, correctAnswerStyle, incorrectAnswerStyle, statusBtn, timer,
      redirect,
    } = this.state;
    return (
      <div>
        <div className="game-answers">
          <button
            onClick={ this.handleClick }
            className={ correctAnswerStyle }
            type="button"
            data-testid="correct-answer"
            disabled={ statusBtn }
          >
            {this.htmldecode(correctAnswer)}
          </button>
          {incorrectAnswers.map((answer, index) => (
            <button
              onClick={ this.handleClick }
              className={ incorrectAnswerStyle }
              key={ index }
              type="button"
              data-testid={ `wrong-answer${index}` }
              disabled={ statusBtn }
            >
              {this.htmldecode(answer)}
            </button>
          ))}
        </div>
        <div className="game-next-question">
          <button
            onClick={ this.nextClick }
            style={ { display: displayBtn } }
            data-testid="btn-next"
            type="button"
          >
            Next
          </button>
        </div>
        <h4><Countdown date={ Date.now() + timer } onComplete={ this.handleClick } /></h4>
        { redirect && <Redirect to="/feedback" /> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(actionGetIndexQuestion()),
});

const mapStateToProps = (state) => ({
  index: state.trivia.indexQuestion,
});

Responses.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Responses);
