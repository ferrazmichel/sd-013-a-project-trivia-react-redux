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
        { this.batata() }
      </div>
    );
  }
}

export default connect()(RankingList);
