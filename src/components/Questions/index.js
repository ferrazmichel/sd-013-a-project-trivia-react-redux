import React from 'react';
import './style.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsArray: [],
      answered: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({
      answered: true,
    });
  }

  isAnswered(className) {
    const { answered } = this.state;
    return answered ? className : '';
  }

  render() {
    const { questionsArray } = this.state;
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
                onClick={ this.handleClick }
                className={ this.isAnswered('correct') }
              >
                {questionsArray[0].correct_answer}
              </button>
            </li>
            {questionsArray[0].incorrect_answers.map((incorrect, i) => (
              <li key={ i }>
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.handleClick }
                  className={ this.isAnswered('incorrect') }
                >
                  {incorrect}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Questions;
