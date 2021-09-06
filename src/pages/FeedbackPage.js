import React, { Component } from 'react';
import Header from '../components/Header';

import PropTypes from 'prop-types';

class FeedbackPage extends Component {
  render() {
    const { feedback } = this.props;
    return (
      <div>
        <Header />
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

export default FeedbackPage;