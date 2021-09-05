import React from 'react';
import Countdown from 'react-countdown';
import './style.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      answered: false,
      id: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.changeState = this.changeState.bind(this);
    this.isAnswered = this.isAnswered.bind(this);
    this.next = this.next.bind(this);
    this.renderButton = this.renderButton.bind(this);
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

  next() {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      answered: false,
    });
  }

  renderButton() {
    return (
      <button
        type="button"
        onClick={ this.next }
        data-testid="btn-next"
      >
        Pŕoxima
      </button>
    );
  }

  render() {
    const { questionsArray, id, answered } = this.state;
    const number = 30000;
    if (questionsArray.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          <p>
            Category:
            <span data-testid="question-category">{questionsArray[id].category}</span>
          </p>
          <p>
            Question:
            <span data-testid="question-text">{questionsArray[id].question}</span>
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
                {questionsArray[id].correct_answer}
              </button>
            </li>
            {questionsArray[id].incorrect_answers.map((incorrect, i) => (
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
        {answered && this.renderButton()}
      </div>
    );
  }
}

export default Questions;
