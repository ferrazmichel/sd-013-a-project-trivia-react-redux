import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends React.Component {
  render() {
    const { emailRedux, scoreRedux } = this.props;
    const imgGravatar = md5(emailRedux).toString();

    const playerPersonalInfo = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p
          data-testid="header-player-name"
        >
          {`Jogador: ${playerPersonalInfo.player.name}`}
        </p>
        {/* <p data-testid="header-score">{`Score: ${playerPersonalInfo.player.score}`}</p> */}
        <p data-testid="header-score">{scoreRedux}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  scoreRedux: state.reducerPlacar.score,
});

HeaderFeedback.propTypes = {
  emailRedux: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(HeaderFeedback);
