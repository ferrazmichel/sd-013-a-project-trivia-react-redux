import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAvatar from '../utils/utils';

class Jogo extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const { name, email } = this.props;
    const gravatar = fetchAvatar(email);
    return (
      <header>
        <div>
          <img
            src={ gravatar }
            alt={ `${name} Avatar` }
            data-testid="header-profile-picture"
          />
        </div>
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }

  render() {
    return (
      <div>
        { this.renderHeader() }
      </div>
    );
  }
}

Jogo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps, null)(Jogo);
