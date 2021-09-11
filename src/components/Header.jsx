import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const {
      emailRedux,
      nomeRedux,
      /* scoreRedux,
      assertionsRedux, */
      questionsRedux,
      /* iRedux, */
      i,
      assertions,
      score,
    } = this.props;
    const imgGravatar = md5(emailRedux).toString();
    const numpergunta = i + 1;
    const obj = {
      player: {
        name: nomeRedux,
        assertions,
        score,
        gravatarEmail: emailRedux,
      },
    };
    localStorage.setItem('state', JSON.stringify(obj));
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{nomeRedux}</p>
        <h3>
          Pergunta número
          { numpergunta }
        </h3>
        <p data-testid="header-score">
          Score:
          { score }
        </p>
        <p>
          Número de acertos:
          { assertions }
        </p>
        <p>
          Nível:
          { questionsRedux[i].difficulty }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  nomeRedux: state.reducerLogin.nome,
  /* scoreRedux: state.reducerPlacar.score,
  assertionsRedux: state.reducerPlacar.assertions, */
  /* iRedux: state.reducerPlacar.i, */
  questionsRedux: state.reducerQuestions.questions,
});

Header.propTypes = {
  emailRedux: PropTypes.string,
  nomeRedux: PropTypes.string,
  /* scoreRedux: PropTypes.number, */
}.isRequired;

export default connect(mapStateToProps)(Header);
