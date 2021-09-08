import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    return (
      <header>
        <img
          src={ gravatarEmail }
          data-testid="header-profile-picture"
          alt="avatar-user"
        />
        <p data-testid="header-player-name">
          { `${name}` }
          {' '}
        </p>

      </header>

    );
  }
}

const mapStateToProps = ({ users }) => ({
  name: users.name,
  gravatarEmail: users.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
