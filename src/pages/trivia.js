import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Trivia extends React.Component {
  render() {
    return (
      <div>
        <p>Página Trivia</p>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Trivia;
