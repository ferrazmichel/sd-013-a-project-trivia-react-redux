import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchURL, loadFromLocalStaorage } from '../services';

const correctAnswer = 'correct-answer';
const MAX_QUESTIONS = 5;
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
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleStyle = this.handleButtonStyle.bind(this);
  }

  componentDidMount() {
    // console.log('MONTOU');
    this.handleQuestions();
  }

  handleAnswers(results) {
    // console.log(results);
    const answers = [...results.incorrect_answers, results.correct_answer];
    const HALF = 0.5;
    answers.sort(() => Math.random() - HALF);
    // https://javascript.info/array-methods#shuffle-an-array
    return (answers.map((answer, index) => (
      <button
        key={ answer }
        type="button"
        className="answer-style"
        name={ answer === results.correct_answer ? correctAnswer
          : `wrong-answer-${index}` }
        data-testid={ answer === results.correct_answer ? correctAnswer
          : `wrong-answer-${index}` }
        onClick={ this.handleButtonStyle }
      >
        {answer}
      </button>))
    );
  }

  handleButtonStyle() {
    const whichButton = document.querySelectorAll('.answer-style');
    whichButton.forEach((button) => {
      if (button.name === correctAnswer) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      } else { button.style.border = '3px solid rgb(255, 0, 0)'; }
    });
  }

  async handleQuestions() {
    const token = loadFromLocalStaorage('token');
    const questionURL = `https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&token=${token}`;
    const requestQuestions = await fetchURL(questionURL);
    this.setState({ questions: requestQuestions });
  }

  nextQuestion() {
    this.setState((prevState) => {
      if (prevState.questionIndex < MAX_QUESTIONS - 1) {
        return { ...prevState, questionIndex: prevState.questionIndex + 1 };
      }
    });
  }

  render() {
    const { questions, questionIndex } = this.state;
    if (!questions) {
      return <div>Loading...</div>;
    }
    const { results } = questions;
    return (
      <div className="play-main">
        <Header />
        <div className="body-div">
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
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Play;
