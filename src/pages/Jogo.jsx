import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
// import Pergunta from '../components/Pergunta';

class Jogo extends React.Component {
  constructor() {
    super();
    this.state = {
      i: 0,
    };
  }

  render() {
    const { questions } = this.props;
    const { i } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="question-text">{questions[i].question}</h1>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <button type="button" data-testid="correct-answer">
            {questions[i].correct_answer}
          </button>
          {questions[0].incorrect_answers.map((incorrect, index) => (
            <p key={ index }>
              <button type="button" data-testid={ `wrong-answer-${index}` }>
                {incorrect}
              </button>
            </p>
          ))}
        </div>
        <Link to="/feedback">
          <button type="button">feedback</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.reducerQuestions.questions,
});

Jogo.propTypes = {
  questions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Jogo);
