import React from 'react';
import { connect } from 'react-redux';
import { getLocalStorage } from '../services/localStoreService';

class RankingList extends React.Component {
  constructor() {
    super();
    this.batata = this.batata.bind(this);
  }

  batata() {
    const list = getLocalStorage('ranking');
    console.log(list);
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Tela de Ranking</h1>
        { this.batata() }
      </div>
    );
  }
}

export default connect()(RankingList);
