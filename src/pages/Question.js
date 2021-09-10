import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../App.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rigthBoarder: false,
      wrongBoarder: false,
      // countdown: 30,
      // disableButtonNext: true,
    };
    this.changeColor = this.changeColor.bind(this);
    // this.timerDisable = this.timerDisable.bind(this);
    // this.countdown = this.countdown.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // this.countdown();
    // this.timerDisable();
  }

  changeColor() {
    const { rigthBoarder, wrongBoarder } = this.state;

    const green = rigthBoarder === '' ? 'green-border' : '';
    const red = wrongBoarder === '' ? 'red-border' : '';

    this.setState({
      rigthBoarder: green,
      wrongBoarder: red,
    });
  }

  render() {
    const { question, disable, rigth, wrong } = this.props;
    const { rigthBoarder, wrongBoarder } = this.state;
    return (
      <main>
        <div>
          <p data-testid="question-category">
            Category:
            <span>{question.category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{question.question}</span>
          </p>
          <ul>
            <li>
              <button
                disabled={ disable }
                className={ rigthBoarder ? 'green-border' : '' }
                data-testid="correct-answer"
                onClick={ this.changeColor }
                type="button"
              >
                {question.correct_answer}
              </button>
            </li>
            {question.incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button
                  disabled={ disable }
                  className={ wrongBoarder ? 'red-border' : '' }
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.changeColor }
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

export default Question;
