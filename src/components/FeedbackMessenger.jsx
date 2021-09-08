import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedBackMessenger extends Component {
  render() { // get the number of right questions by props in state
    const { rightQuestions } = this.props;
    const threeRightAnswer = 3;
    return (
      rightQuestions >= threeRightAnswer ? <div data-testid="feedback-text">Mandou bem!</div>
        : <div data-testid="feedback-text">Podia ser melhor...</div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
});

export default connect(mapStateToProps)(FeedBackMessenger); // add connect
