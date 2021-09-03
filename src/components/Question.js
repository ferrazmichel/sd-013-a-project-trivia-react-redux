/**
 * Componente utilizado apenas para renderizar uma `question`.
 */

import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  render() {
    const { question } = this.props;

    return (
      <div>
        <h1 data-testid="question-text">{question.question}</h1>
        <p data-testid="question-category">{question.category}</p>
        <p>Alternativas</p>
      </div>
    );
  }
}

export default Question;
