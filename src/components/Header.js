import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: '',
      src: '',
    };

    this.mountHeader = this.mountHeader.bind(this);
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state !== null) {
      this.mountHeader(state);
    }
  }

  mountHeader(state) {
    const { player } = state;
    this.setState({
      name: player.name,
      score: player.score,
      src: player.gravatarUrl,
    });
  }

  render() {
    const { name, score, src } = this.state;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ src } alt="imagem do avatar" />
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
