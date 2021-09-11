import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { emailRedux, nomeRedux, scoreRedux } = this.props;
    const imgGravatar = md5(emailRedux).toString();
    const player = localStorage.getItem('player');
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{nomeRedux}</p>
        <p data-testid="header-score">{ scoreRedux }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  nomeRedux: state.reducerLogin.nome,
  scoreRedux: state.reducerPlacar.score,
});

Header.propTypes = {
  emailRedux: PropTypes.string,
  nomeRedux: PropTypes.string,
  scoreRedux: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
