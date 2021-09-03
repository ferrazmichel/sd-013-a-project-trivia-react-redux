import React, { Component } from 'react';

class Settings extends Component {
  render() {
    return (
      <header>
        <h1 data-testid="settings-title">
          <strong>
            <span role="img" aria-label="gear-emoji">⚙️</span>
            Configurações do Jogo
          </strong>
        </h1>
      </header>
    );
  }
}

export default Settings;
