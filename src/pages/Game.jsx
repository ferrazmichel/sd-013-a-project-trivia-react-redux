import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Game1 from '../components/game1';
import Header from '../components/Header';
import './style/Game.css';
import { actionGetGameWithThunk } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { getGame } = this.props;
    getGame().then((data) => {
      const gameToStore = JSON.stringify(data.payload.results);
      localStorage.setItem('game', gameToStore);
    });
  }

  render() {
    return (
      <>
        <Header />
        <Game1 />
      </>
    );
  }
}

Game.propTypes = {
  getGame: PropTypes.objectOf(ProTypes.shape()).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getGame: () => dispatch(actionGetGameWithThunk()),
});

export default connect(null, mapDispatchToProps)(Game);
