import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import silvioSantos from '../images/silviosantos.gif';

class TelaDeJogo extends Component {
  shuffleAnswers() {
    const { questions: { results } } = this.props;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = results[0];
    const randomIndex = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    const answers = [...incorrectAnswers];
    answers.splice(randomIndex, 0, correctAnswer);
    return answers;
  }
  // shuffleAnswers() {
  //   const { questions: { results } } = this.props;
  //   const {
  //     type,
  //     incorrect_answers: incorrectAnswers,
  //     correct_answer: correctAnswer } = results[0];
  //   const randomIndex = () => {
  //     if (type === 'boolean') {
  //       const randomNumber = Math.floor(Math.random() * (1 - 0 + 1) + 0);
  //       return randomNumber;
  //     }
  //     const randomNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  //     return randomNumber;
  //   };
  //   const answers = [...incorrectAnswers];
  //   answers.splice(randomIndex(), 0, correctAnswer);
  //   return answers;
  // }

  // shuffleAnswers() {
  //   const { questions: { results } } = this.props;
  //   const {
  //     type,
  //     incorrect_answers: incorrectAnswers,
  //     correct_answer: correctAnswer } = results[0];
  //   const randomIndex = () => {
  //     if (type === 'boolean') {
  //       const randomNumber = Math.floor(Math.random() * (1 - 0 + 1) + 0);
  //       return randomNumber;
  //     }
  //     const randomNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  //     return randomNumber;
  //   };
  //   const answers = [...incorrectAnswers];
  //   answers.splice(randomIndex(), 0, correctAnswer);
  //   return answers;
  // }

  createButtons() {
    const answers = this.shuffleAnswers();
    const { questions: { results } } = this.props;
    const { correct_answer: correctAnswer } = results[0];
    return (
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
    const { questions: { results } } = this.props;
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
    const { loading } = this.props;
    return (
      <div>
        {
          loading ? <img
            src={ silvioSantos }
            alt="silvio santos"
          /> : this.renderContent()
        }
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions: questions.questions,
  loading: questions.loading,
});

TelaDeJogo.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
}.isRequired;

export default connect(mapStateToProps)(TelaDeJogo);
