import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankingPlayers: [],
    };
    this.returnRanking = this.returnRanking.bind(this);
  }

  componentDidMount() {
    this.returnRanking();
  }

  handleClick(e) {
    const { history } = this.props;
    e.preventDefault();
    history.push('/');
  }

  returnRanking() {
    const { name, score, assertion,
      gravatar } = JSON.parse(localStorage.getItem('state')).player;
    const newPlayer = { name, score, assertion, gravatar };
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const newRaking = [...ranking, newPlayer];
      newRaking.sort((a, b) => b.score - a.score);
      localStorage.ranking = JSON.stringify(newRaking);
      this.setState({
        rankingPlayers: newRaking,
      });
    } else {
      const newRanking = [newPlayer];
      localStorage.ranking = JSON.stringify(newRanking);
      this.setState({
        rankingPlayers: newRanking,
      });
    }
  }

  render() {
    const { rankingPlayers } = this.state;
    // nome, gravtar, pontuaçao;
    return (
      <div data-testid="ranking-title">
        {rankingPlayers.map((player, index) => (
          <div key={ player }>
            <img src={ player.gravatar } alt={ `Foto da ${player.name}` } />
            <p data-testid={ `player-name-${index}` }>
              {player.name}
            </p>
            <span data-testid={ `player-score${index}` }>
              {player.score}
            </span>
            <span>
              Total de acertos:
              {player.assertions}
            </span>
          </div>
        ))}
        <button type="submit" data-testid="btn-go-home" onClick={ this.handleClick }>
          Jogar novamente
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;
export default Ranking;
