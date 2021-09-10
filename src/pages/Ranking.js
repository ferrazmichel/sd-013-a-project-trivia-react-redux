import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };

    this.showRanking = this.showRanking.bind(this);
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // Ordena o ranking pela pontuação;
    const sortedRanking = ranking.sort((a, b) => (
      b.score - a.score
    ));
    this.showRanking(sortedRanking);
    // const { player } = JSON.parse(localStorage.getItem('state'));
    // player.assertions = 0;
    // player.score = 0; // calcula e salva no localStorage chave player.score
    // localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
  }

  showRanking(sortedRanking) {
    this.setState({
      ranking: sortedRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => (
            <li key={ player.gravatarUrl }>
              <p>{ `${index + 1}` }</p>
              <img src={ player.picture } alt="Gravatar" />
              <p data-testid={ `player-name-${index}` }>
                { player.name }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { player.score }
              </p>
              { player.record && <p>{ player.record }</p>}
            </li>
          ))}
        </ol>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Tela inicial</button>
        </Link>
      </>
    );
  }
}

export default Ranking;
