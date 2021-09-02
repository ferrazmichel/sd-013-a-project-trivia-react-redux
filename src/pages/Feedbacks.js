import React, { Component } from 'react';

class Feedbacks extends Component {
  render() {
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src=" " alt="imagem do avatar" />
          <h2 data-testid="header-player-name">Nome:</h2>
          <h3 data-testid="header-score">Valor Atual:</h3>
        </header>
      </div>
    );
  }
}

export default Feedbacks;
