import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rigthBoarder: '',
      wrongBoarder: '',
      disable: false,
    };
    this.changeColor = this.changeColor.bind(this);
    this.timerDisable = this.timerDisable.bind(this);
  }

  componentDidMount() {
    this.timerDisable();
  }

  changeColor() {
    this.setState({
      rigthBoarder: 'green-border',
      wrongBoarder: 'red-border',
    });
  }

  timerDisable() {
    const TIMER = 30000;

    setTimeout(() => {
      this.setState({ disable: true });
    }, TIMER);
  }

  render() {
    const { question } = this.props;
    const { disable, rigthBoarder, wrongBoarder } = this.state;
    return (
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
              className={ rigthBoarder }
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
                className={ wrongBoarder }
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
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string,
  }).isRequired,
};

export default Question;
