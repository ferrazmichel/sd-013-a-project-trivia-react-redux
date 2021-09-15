import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HeaderFeedback.css';

class HeaderFeedback extends React.Component {
  render() {
    const { emailRedux, scoreRedux, nomeRedux } = this.props;
    const imgGravatar = md5(emailRedux).toString();

    return (
      <header className="countainer-feedback">
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p
          data-testid="header-player-name"
        >
          {`Jogador: ${nomeRedux}`}
        </p>
        <p data-testid="header-score">{scoreRedux}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  scoreRedux: state.reducerPlacar.score,
  nomeRedux: state.reducerLogin.nome,
});

HeaderFeedback.propTypes = {
  emailRedux: PropTypes.string.isRequired,
  nomeRedux: PropTypes.string.isRequired,
  scoreRedux: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(HeaderFeedback);
