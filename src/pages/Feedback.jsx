import React, { Component } from 'react';
import Header from '../components/Header';
import FeedbackAnswers from '../components/FeedbackAswers';
import Reset from '../components/Reset';
import Home from '../components/Home';

function getitem() {
  const getItem = localStorage.getItem('score');
  const parseItem = JSON.parse(getItem);
  return parseItem;
}

class Feedback extends Component {
  componentDidMount() {
    getitem();
  }

  render() {
    const score = getitem();
    return (
      <div>
        <Header
          score={ score }
          testID="feedback-total-score"
        />
        <FeedbackAnswers score={ score } />
        <Home />
        <Reset />
      </div>
    );
  }
}

export default Feedback;
