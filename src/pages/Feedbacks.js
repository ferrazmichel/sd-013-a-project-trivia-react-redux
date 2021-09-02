import React from 'react';

class Feedbacks extends React.Component {
  render() {
    return (
      <div>
        <header data-testid="header-score">
          <label htmlFor="header-player-name">
            Nome:
            <input
              data-testid="header-player-name"
              id=""
            />
          </label>
          <img data-testid="header-profile-picture" alt="imagem do avatar" />
          <h3>Placar:</h3>
        </header>
      </div>
    );
  }
}

export default Feedbacks;
