import React from 'react';
import Countdown from 'react-countdown';
import './style.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      answered: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
    this.isAnswered = this.isAnswered.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    const { results } = json;
    this.setState({ questionsArray: results });
  }

  changeState() {
    this.setState({
      answered: true,
    });
  }

  isAnswered(className) {
    const { answered } = this.state;
    return answered ? className : '';
  }

  isCompleted() {
    const { answered } = this.state;
    return answered;
  }

  render() {
    const { questionsArray } = this.state;
    const number = 30000;
    if (questionsArray.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <p>
            Category:
            <span data-testid="question-category">{questionsArray[0].category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{questionsArray[0].question}</span>
          </p>
          <ul>
            <li>
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.changeState }
                className={ this.isAnswered('correct') }
                disabled={ this.isCompleted() }
              >
                {questionsArray[0].correct_answer}
              </button>
            </li>
            {questionsArray[0].incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.changeState }
                  className={ this.isAnswered('incorrect') }
                  disabled={ this.isCompleted() }
                >
                  {incorrect}
                </button>
              </li>
            ))}
          </ul>
          <Countdown date={ Date.now() + number } onComplete={ this.changeState } />
        </div>
      </div>
    );
  }
}

export default Questions;
