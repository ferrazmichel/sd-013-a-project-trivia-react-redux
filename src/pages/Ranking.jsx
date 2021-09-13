import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    this.renderPlayerList();
  }

  renderPlayerList() {
    const { name, score, assertions, gravatar } = JSON.parse(localStorage.state).player;
    const newEntry = { name, score, assertions, gravatar };

    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const newRanking = [...ranking, newEntry];
      newRanking.sort((a, b) => b.score - a.score);
      localStorage.ranking = JSON.stringify(newRanking);
      this.setState({ players: newRanking });
    } else {
      const newRanking = [newEntry];
      localStorage.ranking = JSON.stringify(newRanking);
      this.setState({ players: newRanking });
    }
  }

  render() {
    const { players } = this.state;
    return (

      <div data-testid="ranking-title">
        {players.map((player, index) => (
          <div key={ player }>
            <img src={ player.gravatar } alt={ `Foto de pessoa ${player.name}` } />
            <span data-testid={ `player-name-${index}` }>
              {player.name}
            </span>
            <span data-testid={ `player-score-${index}` }>
              {player.score}
            </span>
            <span>
              Acertos:
              {player.assertions}
            </span>
          </div>))}
        <p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Recomeçar jogo
            </button>
          </Link>
        </p>
      </div>
    );
  }
}

export default connect(null, null)(Ranking);
