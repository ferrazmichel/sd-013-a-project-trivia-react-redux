import React from 'react';

const answers = {
  lowScore: {
    score: 2,
    answer: 'Podia ser melhor...',
  },
  highScore: {
    score: 3,
    answer: 'Mandou bem!',
  },
};

const { lowScore, highScore } = answers;

function renderAnswer(score = 0) {
  if (score <= lowScore.score) {
    return (
      <p data-testid="feedback-text">{lowScore.answer}</p>
    );
  }
  return (
    <p data-testid="feedback-text">
      { highScore.answer }
    </p>
  );
}

export default renderAnswer;
