import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class FeedbackScore extends Component {
  constructor() {
    super();
    this.numberAsserts = this.numberAsserts.bind(this);
  }

  numberAsserts() {
    const { rightQuestions } = this.props;
    if (rightQuestions === 0) {
      return (
        <div>
          <span>Acertos: </span>
          <span data-testid="feedback-total-question">
            { rightQuestions }
          </span>
          <p> Não acertou nenhuma pergunta </p>
        </div>
      );
    }
    return (
      <div>
        <span>Acertos: </span>
        <span data-testid="feedback-total-question">
          { rightQuestions }
        </span>
      </div>
    );
  }

  render() {
    const { finalScore } = this.props;
    return (
      <section>
        <div data-testid="feedback-total-score">
          { finalScore }
        </div>
        <div>
          {this.numberAsserts()}
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
  finalScore: game.score,
});

FeedbackScore.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackScore);
