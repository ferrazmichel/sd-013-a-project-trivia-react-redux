import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchURL, loadFromLocalStaorage } from '../services';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      questionIndex: 0,
      playerAnswers: [],
    };
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
  }

  handleAnswers(results) {
    console.log(results);
    const answers = [...results.incorrect_answers, results.correct_answer];
    const HALF = 0.5;
    answers.sort(() => Math.random() - HALF);
    // https://javascript.info/array-methods#shuffle-an-array
    return (answers.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        data-testid={ answer === results.correct_answer ? 'correct-answer'
          : `wrong-answer-${index}` }
      >
        {answer}
      </button>))
    );
  }

  async handleQuestions() {
    const token = loadFromLocalStaorage('token');
    const questionURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const requestQuestions = await fetchURL(questionURL);
    this.setState({ questions: requestQuestions });
  }

  render() {
    const { questions, questionIndex } = this.state;
    if (!questions) {
      return <div>Loading...</div>;
    }
    const { results } = questions;
    console.log('L50', questions);
    return (
      <div className="play-main">
        <Header />
        <div className="play-question">
          <section className="play-question-board">
            <h2 data-testid="question-category">
              { results[questionIndex].category }
            </h2>
            <p data-testid="question-text">
              { results[questionIndex].question }
            </p>
          </section>
          <div className="play-question-answers">
            <div className="playquestion-answers-options">
              { this.handleAnswers(results[questionIndex]) }
            </div>
            <button type="button" onClick=()>Próxima</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Play;
