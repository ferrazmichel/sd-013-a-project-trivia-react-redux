import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const {
      emailRedux,
      nomeRedux,
      scoreRedux,
      assertionsRedux,
      questions,
      i,
    } = this.props;
    const imgGravatar = md5(emailRedux).toString();
    const numpergunta = i + 1;

    const obj = {
      player: {
        name: nomeRedux,
        assertions: assertionsRedux,
        score: scoreRedux,
        gravatarEmail: emailRedux,
      },
    };
    localStorage.setItem('state', JSON.stringify(obj));
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${imgGravatar}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Jogador: ${nomeRedux}`}</p>
        <p>{`Pergunta número: ${numpergunta}`}</p>
        <p data-testid="header-score">{`Score: ${scoreRedux}`}</p>
        <p>{`Número de acertos: ${assertionsRedux}`}</p>
        <p>{`Nível: ${questions[i].difficulty}`}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailRedux: state.reducerLogin.email,
  nomeRedux: state.reducerLogin.nome,
  scoreRedux: state.reducerPlacar.score,
  assertionsRedux: state.reducerPlacar.assertions,
  questions: state.reducerQuestions.questions,
});

Header.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  emailRedux: PropTypes.string.isRequired,
  nomeRedux: PropTypes.string.isRequired,
  scoreRedux: PropTypes.number.isRequired,
  assertionsRedux: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
