import React from 'react';
import renderAnswer from './componentsFunctions/FeedbackAnswerfuncs';

class FeedbackAnswers extends React.Component {
  constructor() {
    super();

    this.assertionsFeedback = this.assertionsFeedback.bind(this);
  }

  assertionsFeedback(assertions) {
    return (
      <p data-testid="feedback-total-question">{assertions}</p>
    );
  }

  render() {
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;

    return (
      <div>
        {renderAnswer(assertions)}
        {this.assertionsFeedback(assertions)}
      </div>);
  }
}

export default FeedbackAnswers;
