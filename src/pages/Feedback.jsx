import React, { Component } from 'react';
import { Header, FeedbackMessenger, FeedbackScore } from '../components';

class Feedback extends Component {
  render() {
    return (
      <section className="feedback-page">
        <Header />
        <div className="row col-md-5 shadow mx-auto p-5 btn-primary mt-3">
          <FeedbackMessenger />
          <hr className="mb-4" />
          <FeedbackScore />
        </div>
        <div>
          <hr />
        </div>
      </section>
    );
  }
}

export default Feedback;
