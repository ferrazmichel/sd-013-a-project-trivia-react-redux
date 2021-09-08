import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBackMessenger extends Component {
  render() {
    const { rightQuestions } = this.props;
    const threeRightAnswer = 3;
    return (
      rightQuestions >= threeRightAnswer
        ? <div data-testid="feedback-text">Mandou bem!</div>
        : <div data-testid="feedback-text">Podia ser melhor...</div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
});

FeedBackMessenger.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackMessenger); // add connect
