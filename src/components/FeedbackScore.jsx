import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackScore extends Component {
  constructor() {
    super();

    this.numberAsserts = this.numberAsserts.bind(this);
  }

  numberAsserts() {
    const { rightQuestions } = this.props;
    if (rightQuestions === 0) {
      return (
        <div data-testid="feedback-total-question">
          Não acertou nenhuma pergunta
        </div>
      );
    }
    return (
      <div data-testid="feedback-total-question">
        {rightQuestions === 1 ? `Acertou ${rightQuestions} pergunta`
          : `Acertou ${rightQuestions} perguntas`}
      </div>);
  }

  render() {
    const finalScore = 0;
    return (
      <section>
        <div data-testid="feedback-total-score">
          Placar final:
          { finalScore }
        </div>
        <div>
          {this.numberAsserts()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
});

export default connect(mapStateToProps)(FeedbackScore);
