import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    this.renderPlayerList();
  }

  renderPlayerList() {
    // implementacao com localStorage
    const { player } = JSON.parse(localStorage.getItem('state'));
    const playersArray = [];
    const playerFake = { name: 'Leonardo', email: 'lcds90@gmail.com', gravatar: 'https://www.gravatar.com/avatar/a9014bf18369dcdc8d21c32e92135e78', assertions: 0, score: 200 };
    playersArray.push(player, playerFake);
    playersArray.sort((a, b) => b.score - a.score);
    this.setState({ players: playersArray });
  }

  render() {
    const { players } = this.state;
    return (

      <div data-testid="ranking-title">
        {players.map((player, index) => (
          <div key={ player }>
            <img src={ player.gravatar } alt={ `Foto de pessoa ${player.name}` } />
            <span data-testid={ `player-name-${index}` }>
              {player.name}
            </span>
            <span data-testid={ `player-score-${index}` }>
              {player.score}
            </span>
            <span>
              Acertos:
              {player.assertions}
            </span>
          </div>))}
        <p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Recomeçar jogo
            </button>
          </Link>
        </p>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Ranking);

// Ranking.propTypes = {

// };
