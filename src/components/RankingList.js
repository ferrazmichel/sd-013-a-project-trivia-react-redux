import React from 'react';
import { connect } from 'react-redux';

class RankingList extends React.Component {
  constructor() {
    super();
    this.createList = this.createList.bind(this);
  }

  createList() {
    const ls = JSON.parse(localStorage.getItem('ranking'));
    // ls.forEach((obj) => )
    // ls.sort((obj1, obj2) => obj2.score - obj1.score);
    return ls.map((obj, index) => (
      <div key={ obj.score } score={ obj.score }>
        <img
          key={ obj.picture }
          src={ obj.picture }
          alt="imagem do player"
        />
        <div
          data-testid={ `player-name-${index}` }
          key={ obj.name }
        >
          { obj.name }
        </div>
        <div
          data-testid={ `player-score-${index}` }
          key={ obj.score }
        >
          { obj.score }
        </div>
      </div>
    )).sort((obj1, obj2) => obj2.key - obj1.key);
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">data-testid</h1>
        { this.createList() }
      </div>
    );
  }
}

export default connect()(RankingList);
