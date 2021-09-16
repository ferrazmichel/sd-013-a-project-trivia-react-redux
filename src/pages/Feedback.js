import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const qtdAssetions = 3;

class Feedback extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { score, assertions } = this.props;
    const message = qtdAssetions > assertions ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <div>
        <Header />
        <h3
          data-testid="feedback-text"
        >
          { message }
        </h3>
        <span
          data-testid="feedback-total-score"
        >
          {score}
        </span>
        <span
          data-testid="feedback-total-question"
        >
          {assertions}
        </span>
        <Link
          to="/"
        >
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
