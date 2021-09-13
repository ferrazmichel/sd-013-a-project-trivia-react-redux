import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.rankingTable = this.rankingTable.bind(this);
  }

  rankingTable() {
    const { ranking } = this.props;
    return ranking.map((player, index) => (
      <div key={ player.gravatarEmail } className="ranking-table-column">
        <img
          className="ranking-table-row"
          data-testid={ `player-gravatarEmail-${index}` }
          src={ `https://www.gravatar.com/avatar/
          ${md5(player.gravatarEmail.trim().toLowerCase()).toString()}` }
          alt="gravatarEmail icon"
        />
        <h2
          className="ranking-table-row"
          data-testid={ `player-name-${index}` }
        >
          {player.name}
        </h2>
        <h2
          className="ranking-table-row"
          data-testid={ `player-score-${index}` }
        >
          {player.score}
        </h2>
      </div>
    ));
  }

  render() {
    return (
      <div className="ranking-table" data-testid="ranking-title">
        RANKING &#127942;
        { this.rankingTable() }
        <button type="button" data-testid="btn-go-home">
          <Link to="/">Deslogar ⏼</Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ rank: { ranking } }) => ({
  ranking,
});
Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps)(Ranking);
