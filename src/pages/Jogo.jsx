import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Jogo extends React.Component {
  render() {
    const { questions } = this.props;
    console.log(questions[0]);
    return (
      <div>
        <Header />
        { questions.map((item, index) => (
          <ol key={ index }>
            <li data-testid="question-text">{ item.question }</li>
            <li data-testid="question-category ">
              <b>Categoria:</b>
              { item.category}
            </li>
            <li data-testid="correct-answer">{ item.correct_answer }</li>
          </ol>))}
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
