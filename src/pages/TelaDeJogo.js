import React, { Component } from 'react';
import Header from '../components/Header';

class TelaDeJogo extends Component {
  constructor() {
    super();

    this.state = {
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
    this.shuffleAnswers();
  }

  async getQuestions() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    const questions = await response.json();
    this.setState({ questions });
  }

  shuffleAnswers() {
    const { questions: { results } } = this.state;
    const { incorrect_answers: incorrectAnswers, correct_answer: correctAnswer } = results[0];
    const randomIndex = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    const answers = [...incorrectAnswers];
    const spliceAnswers = answers.splice(randomIndex, 0, correctAnswer);
    console.log(spliceAnswers);
  }

  // createButtons() {
  //   const answers = this.shuffleAnswers();
  //   return (
  //     answers.map((answer) => <button type="button" key={ answer }>answer</button>)
  //   );
  // }

  render() {
    const { questions: { results } } = this.state;
    return (
      <>
        <Header />
        <section>
          <p data-testid="question-category">{ results[0].category }</p>
          <p data-testid="question-text">{ results[0].question }</p>
          {/* <div data-testid="">{ this.createButtons() }</div> */}
        </section>
      </>
    );
  }
}

export default TelaDeJogo;
