import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBackMessenger extends Component {
  render() {
    const { rightQuestions } = this.props;
    const threeRightAnswer = 3;
    return (
      rightQuestions >= threeRightAnswer
        ? <h2 className="text-center">Mandou bem!</h2>
        : <h2 className="text-center">Podia ser melhor...</h2>
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
