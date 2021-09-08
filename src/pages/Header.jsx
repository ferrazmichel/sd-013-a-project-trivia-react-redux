import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { emailRedux, nomeRedux } = this.props;
    console.log(emailRedux);
    const imgGravatar = md5(emailRedux).toString();

    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{nomeRedux}</p>
        <p data-testid="header-score"> 0 </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  nomeRedux: state.reducerLogin.nome,
});

export default connect(mapStateToProps)(Header);
