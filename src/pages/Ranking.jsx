import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankingPlayers: [],
    };
    this.returnRanking = this.returnRanking.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.returnRanking();
  }

  handleClick() {
    const { history } = this.props;
    // e.preventDefault();
    history.push('/');
  }
  // Essa requisito foi feito consultando o projeto do grupo 9 da turma 13-A link: https://github.com/tryber/sd-013-a-project-trivia-react-redux/blob/main-group-9/src/pages/Ranking.jsx

  returnRanking() {
    const json = JSON.parse(localStorage.state).player;
    const { name, score, assertion,
      gravatar } = JSON.parse(localStorage.state).player;
    console.log(json);
    const newPlayer = { name, score, assertion, gravatar };
    if (localStorage.ranking) {
      const ranking = JSON.parse(localStorage.ranking);
      const newRanking = [...ranking, newPlayer];
      newRanking.sort((a, b) => a.score - b.score);
      localStorage.ranking = JSON.stringify(newRanking);
      this.setState({
        rankingPlayers: newRanking,
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
      <header className="headerRanking">
        <h1>Ranking</h1>
        <div className="rankingHeaderDiv" data-testid="ranking-title">
          {rankingPlayers.map((player, index) => (
            <div className="divInnerRanking" key={ player }>
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
          <button
            className="btn-Ranking"
            type="submit"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
          >
            Jogar novamente
          </button>
        </div>
      </header>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect(null, null)(Ranking);
