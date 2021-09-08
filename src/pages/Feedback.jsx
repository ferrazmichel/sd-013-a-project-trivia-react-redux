import React, { Component } from 'react';
import { Header } from '../components';
import FeedBackMessenger from '../components/FeedbackMessenger';
import FeedbackScore from '../components/FeedbackScore';

class Feedback extends Component {
  render() {
    return (
      <section>
        <header>
          <Header />
        </header>
        <FeedBackMessenger />
        <FeedbackScore />
      </section>
    );
  }
}

export default Feedback;
