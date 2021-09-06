import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Página FeedBack</p>
        <Header />
      </div>
    );
  }
}

export default FeedBack;
