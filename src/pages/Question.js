import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rigthBoarder: false,
      // wrongBoarder: false,
      // countdown: 30,
      // disableButtonNext: true,
    };
    // this.changeColor = this.changeColor.bind(this);
    // this.timerDisable = this.timerDisable.bind(this);
    // this.countdown = this.countdown.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.decodeHtml = this.decodeHtml.bind(this);
  }

  // componentDidMount() {
  //   // this.countdown();
  //   // this.timerDisable();
  // }

  // changeColor() {
  //   const { rigthBoarder, wrongBoarder } = this.state;

  //   const green = rigthBoarder === '' ? 'green-border' : '';
  //   const red = wrongBoarder === '' ? 'red-border' : '';

  //   this.setState({
  //     rigthBoarder: green,
  //     wrongBoarder: red,
  //   });

  //   clearInterval(this.timeout);
  // }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  render() {
    const { question, disable, right, wrong, changeColor, scoreFunction } = this.props;
    // const { rigthBoarder, wrongBoarder } = this.state;
    return (
      <main>
        <div>
          <p data-testid="question-category">
            Category:
            <span>{question.category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{this.decodeHtml(question.question)}</span>
          </p>
          <ul>
            <li>
              <button
                disabled={ disable }
                className={ right }
                data-testid="correct-answer"
                id="correct-answer"
                onClick={ (event) => { changeColor(); scoreFunction(event); } }
                type="button"
              >
                {question.correct_answer}
              </button>
            </li>
            {question.incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button
                  disabled={ disable }
                  className={ wrong }
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ (event) => { changeColor(); scoreFunction(event); } }
                  type="button"
                >
                  {incorrect}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

Question.propTypes = {
  changeColor: PropTypes.func,
  disable: PropTypes.bool,
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.shape({
      map: PropTypes.func,
    }),
    question: PropTypes.string,
  }),
  right: PropTypes.string,
  scoreFunction: PropTypes.func,
  wrong: PropTypes.string,
}.isRequired;

export default Question;
