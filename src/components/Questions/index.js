import React from 'react';

class Questions extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = JSON.parse(localStorage.getItem('token'));
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const json = await fetchQuestions.json();
    // const { results } = json;
    return json;
  }

  render() {
    console.log(this.getQuestions());
    return (
      <div>
        {
          this.getQuestions().map((question, index) => (
            <div key={ index }>
              <p>
                Category:
                <span data-testid="question-category">{question.category}</span>
              </p>
              <p>
                Question:
                <span data-testid="question-text">{question.question}</span>
              </p>
              <ul>
                <li key={ index }>
                  <button type="button" data-testid="correct-answer">
                    {question.correct_answer}
                  </button>
                </li>
                {question.incorrect_answers.map((incorrect, i) => (
                  <li key={ i }>
                    <button type="button" data-testid={ `wrong-answer-${i}` }>
                      {incorrect}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))

        }
      </div>
    );
  }
}

export default Questions;
