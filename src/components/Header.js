import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      score: '',
    };

    this.mountHeader = this.mountHeader.bind(this);
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state !== null) {
      this.mountHeader(state);
    }
    console.log(state);
  }

  mountHeader(state) {
    const { player } = state;
    this.setState({
      name: player.name,
      email: player.gravatarEmail,
      score: player.score,
    });
  }

  render() {
    const { email, name, score } = this.state;
    const hash = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ SRC } alt="imagem do avatar" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">
            Score:
            { score }
          </h3>
        </header>
      </div>
    );
  }
}

export default Header;
