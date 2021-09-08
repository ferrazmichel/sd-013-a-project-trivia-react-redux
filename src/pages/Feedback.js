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
    const { score } = this.props;
    const MIN_SCORE = 3;
    return score < MIN_SCORE ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.feedbackMsg() }</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player: { score } }) => ({
  score,
});

export default connect(mapStateToProps)(Feedback);
