import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatarImage = this.getGravatarImage.bind(this);
  }

  getGravatarImage() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ this.getGravatarImage() }
            alt=""
          />
          <p data-testid="header-player-name">{ `Jogador: ${name}` }</p>
          <p data-testid="header-score">{ score }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  email: player.gravatarEmail,
  name: player.name,
  score: player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
