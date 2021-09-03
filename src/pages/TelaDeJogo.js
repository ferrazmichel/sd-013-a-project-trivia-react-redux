import React, { Component } from 'react';
import Header from '../components/Header';

class TelaDeJogo extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      questions: {
        results: [{
          category: '',
          correct_answer: '',
          incorrect_answers: [''],
        }],
      },
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    const questions = await response.json();
    this.setState({ questions, loading: false });
  }

  shuffleAnswers() {
    const { questions: { results } } = this.state;
    const { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer } = results[0];
    const randomIndex = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    const answers = [...incorrectAnswers];
    answers.splice(randomIndex, 0, correctAnswer);
    return answers;
  }

  createButtons() {
    const answers = this.shuffleAnswers();
    const { questions: { results } } = this.state;
    const { correct_answer: correctAnswer } = results[0];
    return (
      // answers.map((answer) => <button type="button" key={ answer }>{ answer }</button>)
      answers.map((answer, index) => {
        if (answer === correctAnswer) {
          return (
            <button
              data-testid="correct-answer"
              type="button"
              key={ answer }
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ answer }
          >
            { answer }
          </button>
        );
      })
    );
  }

  renderContent() {
    const { questions: { results } } = this.state;
    return (
      <>
        <Header />
        <section>
          <p data-testid="question-category">{ results[0].category }</p>
          <p data-testid="question-text">{ results[0].question }</p>
          <div>
            { results[0].correct_answer && this.createButtons() }
          </div>
        </section>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? <p>Loading...</p> : this.renderContent() }
      </div>
    );
  }
}

export default TelaDeJogo;
