import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
    this.emailUser = this.emailUser.bind(this);
  }

  componentDidUpdate() {
    this.getScore();
  }

  getScore() {
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    this.setState({ total: score });
  }

  emailUser() {
    const { emailPlayer } = this.props;
    return md5(emailPlayer).toString();
  }

  render() {
    const { namePlayer } = this.props;
    const { total } = this.state;
    return (
      <header data-testid="header-player-name">
        <img
          data-testid="header-profile-picture"
          alt="imageUser"
          src={ `https://www.gravatar.com/avatar/ ${this.emailUser()}` }
        />
        <span>{namePlayer}</span>
        <span data-testid="header-score">{total}</span>
      </header>
    );
  }
}

Header.propTypes = {
  emailPlayer: PropTypes.string.isRequired,
  namePlayer: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  namePlayer: state.userReducer.name,
  emailPlayer: state.userReducer.email,
});

export default connect(mapStateToProps)(Header);
