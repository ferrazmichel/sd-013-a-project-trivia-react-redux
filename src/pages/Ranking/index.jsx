import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { main, playerInfo, rankingPlayers, section } from './Ranking.module.css';

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

      <main data-testid="ranking-title" className={ main }>
        <section className={ rankingPlayers }>
          {players.map((player, index) => (
            <article className={ playerInfo } key={ player }>
              <div>
                <span>{`${index + 1}º LUGAR`}</span>
                <img src={ player.gravatar } alt={ `Foto de pessoa ${player.name}` } />
              </div>
              <div>
                Jogador
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
              </div>
              <div>
                Pontuação
                <span data-testid={ `player-score-${index}` }>
                  {player.score}
                </span>
              </div>
              <div>
                Acertos
                <span>
                  {player.assertions}
                </span>
              </div>
            </article>))}
        </section>
        <section className={ section }>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Recomeçar jogo
            </button>
          </Link>
        </section>
      </main>
    );
  }
}

export default connect(null, null)(Ranking);
