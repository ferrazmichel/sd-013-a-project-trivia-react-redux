import React from 'react';

class FeedbackBoard extends React.Component {
  handleResponse() {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    const assert = getStorage.player.assertions;
    const couldBetter = 3;
    const testid = 'feedback-text';

    if (assert < couldBetter) return <h1 data-testid={ testid }>Podia ser melhor...</h1>;
    if (assert >= couldBetter) return <h1 data-testid={ testid }>Mandou bem!</h1>;
  }

  render() {
    const getStorage = JSON.parse(localStorage.getItem('state'));
    const value = getStorage.player.score;
    const assert = getStorage.player.assertions;
    return (
      <div>
        <div>
          {this.handleResponse()}
        </div>
        <div>
          <label htmlFor="value">
            Pontuação:
            <span id="value" data-testid="feedback-total-score">
              {' '}
              { value }
            </span>
          </label>
        </div>
        <div>
          <label htmlFor="assert">
            Você acertou:
            {' '}
            <span id="assert" data-testid="feedback-total-question">
              { assert }
              {' '}
            </span>
            Questões
          </label>
        </div>
      </div>
    );
  }
}

export default FeedbackBoard;
