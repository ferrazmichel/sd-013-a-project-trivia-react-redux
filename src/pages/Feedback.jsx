import React, { Component } from 'react';
import { Header, FeedbackMessenger, FeedbackScore } from '../components';

class Feedback extends Component {
  render() {
    return (
      <section className="container-fluid">

        <Header />
        <div className="row col-md-5 shadow mx-auto p-5 bg-white mt-3">
          <FeedbackMessenger />
          <hr className="mb-4" />
          <FeedbackScore />
        </div>
      </section>
    );
  }
}

export default Feedback;
