import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      playersGame: [],
    };
  }

  componentDidMount() {
    this.mockarPlayer();
  }

  mockarPlayer() {
    const playerGame = JSON.parse(localStorage.state).player;
    const token = (localStorage.getItem('token'));
    const { name, score } = playerGame;
    // const newPerson = { name, score };
    // Fiz o mockPlayer para poder pegar o token e chamar a imagem
    // aproveitei e juntei todas as informações.
    const mockPlayer = {
      name,
      score,
      image: `https://www.gravatar.com/avatar/${token}`,
    };
    this.setState({ playersGame: mockPlayer });

    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const newRanking = [...ranking, mockPlayer];
      this.setState({ playersGame: newRanking });
      localStorage.ranking = JSON.stringify(newRanking);
    } else {
      const ranking = [mockPlayer];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      this.setState({ playersGame: ranking });
    }
  }

  render() {
    const { playersGame } = this.state;
    return (
      <div>
        <section className="ranking-players">
          <h1 data-testid="ranking-title"> Muito bem!!</h1>
          { playersGame.map((player, index) => (
            <div key={ player.name }>
              <img
                src={ player.image }
                alt={ `Imagem da pessoa jogadora ${player.name}` }
              />
              <span data-testid={ `player-name-${index}` }>
                {player.name}
              </span>
              <span data-testid={ `player-score-${index}` }>
                {player.score}
              </span>
            </div>
          ))}

        </section>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
