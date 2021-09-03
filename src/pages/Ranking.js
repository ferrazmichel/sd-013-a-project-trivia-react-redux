import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div className="ranking-main">
        RANKING &#127942;
        <button type="button" data-testid="btn-go-home">
          <Link to="/">Deslogar ⏼</Link>
        </button>
      </div>
    );
  }
}

export default Ranking;
