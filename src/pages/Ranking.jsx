import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const rank = JSON.parse(localStorage.getItem('ranking'));
    console.log(rank);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ul>
          <li>
            <img src="" alt="PlayerAvatar" />
          </li>
        </ul>
        <Link
          to="/"
          className="ui-button btn-play btn-ranking"
          data-testid="btn-go-home"
        >
          Volte ao Inicío!
        </Link>
      </div>
    );
  }
}

export default Ranking;
