import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userName, score, gravatar } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ gravatar }
          alt="Icone do avatar"
        />
        <h2 data-testid="header-player-name">
          {`Jogador: ${userName}`}
        </h2>
        <p data-testid="header-score">
          {`Pontuação: ${score}`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userName: state.userReducer.name,
    score: state.gameReducer.score,
    gravatar: state.gameReducer.gravatar,
  }
);

export default connect(mapStateToProps)(Header);
