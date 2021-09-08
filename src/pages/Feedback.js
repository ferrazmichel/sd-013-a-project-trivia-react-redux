import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../components';

// import PropTypes from 'prop-types';

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.feedbackMsg = this.feedbackMsg.bind(this);
  }

  feedbackMsg() {
    const { assertions } = this.props;
    const MIN_ASSERT = 3;
    return assertions < MIN_ASSERT ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMsg()}</p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">
            {score}
          </span>
          {' '}
          pontos
        </p>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-questions">
            {assertions}
          </span>
          {' '}
          questões
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

export default connect(mapStateToProps)(Feedback);
