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
          <p data-testid="header-score">0</p>
        </header>
        <FeedBackMessenger />
        <FeedbackScore />
      </section>
    );
  }
}

export default Feedback;
