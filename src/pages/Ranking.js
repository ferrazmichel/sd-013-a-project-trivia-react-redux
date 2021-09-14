import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListPlayerRanking } from '../components';
import { resetStore } from '../actions';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    const { reset } = this.props;
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => reset() }
        >
          Jogar Novamente
        </button>
      </Link>
    );
  }

  render() {
    const state = localStorage.getItem('state');
    return (
      <div className="div-button">
        <div className="ranking-content">
          <div className="ranking-content-inside">
            <h1 data-testid="ranking-title">RANKING</h1>
            {JSON.parse(state).ranking
              .sort((a, b) => b.score - a.score)
              .map((item, index) => <ListPlayerRanking key={ index } data={ item } />)}
          </div>
        </div>
        { this.handlePlayAgain() }
      </div>
    );
  }
}

Ranking.propTypes = {
  reset: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetStore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
