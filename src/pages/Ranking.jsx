import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <Link to="/">
        <button type="button" data-testid="btn-go-home">Go Home</button>
      </Link>
    );
  }
}

export default Ranking;
