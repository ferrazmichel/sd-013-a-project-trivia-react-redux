import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGravatar from '../redux/fetchs/fetchGravatar';
import { actionSaveImgUrl } from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { email, playerName, saveImg } = this.props;
    const hash = md5(email).toString();
    const imgURL = `https://www.gravatar.com/avatar/${hash}`;
    saveImg(imgURL);
    return (
      <header>
        <img src={ imgURL } data-testid="header-profile-picture" alt="User Avatar" />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushFetch: (state) => dispatch(fetchGravatar(state)),
  saveImg: (url) => dispatch(actionSaveImgUrl(url)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  playerName: state.user.playerName,
});

Header.propTypes = {
  email: PropTypes.string,
  playerName: PropTypes.string,
  saveImg: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
