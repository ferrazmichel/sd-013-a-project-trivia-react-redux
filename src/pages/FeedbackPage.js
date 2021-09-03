import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackPage extends Component {
  render() {
    const { feedback } = this.props;
    const number = 3;
    return (
      <div>
        {(feedback < number) ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
      </div>
    );
  }
}

FeedbackPage.propTypes = {
  feedback: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  feedback: state.questions.results,
});

export default connect(mapStateToProps)(FeedbackPage);
