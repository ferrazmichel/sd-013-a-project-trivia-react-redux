import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import silvioSantos from '../images/silviosantos.gif';

class TelaDeJogo extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: false,
      colorBorders: false,
      time: 30,
    };

    this.counter = this.counter.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  checkCounter() {
    const { time, intervalId } = this.state;
    if (time <= 1) {
      clearInterval(intervalId);
      this.setState({ buttonDisable: true, colorBorders: true });
    }
  }

  counter() {
    const ONE_SECOND = 1000;
    const count = () => this
      .setState(({ time }) => ({ time: time - 1 }), this.checkCounter());
    const intervalId = setInterval(count, ONE_SECOND);
    this.setState({ intervalId });
  }

  shuffleAnswers() {
    const { questions: { results } } = this.props;
    const {
      type,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = results[0];
    const randomIndex = () => {
      if (type === 'boolean') {
        const randomNumber = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        return randomNumber;
      }
      const randomNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0);
      return randomNumber;
    };
    const answers = [...incorrectAnswers];
    answers.splice(randomIndex(), 0, correctAnswer);
    return answers;
  }

  createButtons() {
    const answers = this.shuffleAnswers();
    const { buttonDisable, colorBorders } = this.state;
    const { questions: { results } } = this.props;
    const { correct_answer: correctAnswer } = results[0];
    return (
      answers.map((answer, index) => {
        if (answer === correctAnswer) {
          return (
            <button
              data-testid="correct-answer"
              className="correct-answer"
              disabled={ buttonDisable }
              type="button"
              key={ answer }
              style={ colorBorders ? { border: '3px solid rgb(6, 240, 15)' } : null }
              onClick={ () => this.setState({ colorBorders: true }) }
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            data-testid={ `wrong-answer-${index}` }
            className="wrond-answer"
            disabled={ buttonDisable }
            type="button"
            key={ answer }
            style={ colorBorders ? { border: '3px solid rgb(255, 0, 0)' } : null }
            onClick={ () => this.setState({ colorBorders: true }) }
          >
            { answer }
          </button>
        );
      })
    );
  }

  renderContent() {
    const { time } = this.state;
    const { questions: { results } } = this.props;
    return (
      <>
        <Header />
        <section>
          <p data-testid="question-category">{ results[0].category }</p>
          <p data-testid="question-text">{ results[0].question }</p>
          <div>
            { this.createButtons() }
          </div>
          <div>
            {`Tempo: ${time}`}
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
