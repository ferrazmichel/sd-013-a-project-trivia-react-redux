import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pages-css/Ranking.css';

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
  }

  showRanking(sortedRanking) {
    this.setState({
      ranking: sortedRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-div">
        <div className="ranking-title">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/" data-testid="btn-go-home">
            <button className="btn-go-home" type="button">Tela inicial</button>
          </Link>
        </div>
        <ol className="ol-ranking">
          { ranking.map((player, index) => (
            <li className="li-ranking" key={ player.gravatarUrl }>
              <p>{ `${index + 1}` }</p>
              <img className="img-gravatar" src={ player.picture } alt="Gravatar" />
              <p data-testid={ `player-name-${index}` }>
                { player.name }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { player.score }
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Ranking;
