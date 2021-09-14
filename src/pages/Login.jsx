import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDados, loginSubmit } from '../redux/actions';
// import Loading from '../components/loading';
import './pages.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
      validateLogin: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
    this.handleCLickConfig = this.handleCLickConfig.bind(this);
    // this.loadingBool = this.loadingBool.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { playerName, playerEmail } = this.state;
      const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
      const boolValidateEmail = regexEmail.test(playerEmail);
      const nameRegex = /[A-Za-z-0-9]/;
      const boolValidateName = nameRegex.test(playerName);
      const boolValidateLogin = !(boolValidateEmail && boolValidateName);
      this.setState({
        validateLogin: boolValidateLogin,
      });
    });
  }

  /* loadingBool() {
    const { history, loadingPerguntas } = this.props;
    if (!loadingPerguntas) {
      return Loading;
    }
    history.push('/game');
  } */

  handleCLick() {
    const { history, fetchDadosTrivia, loginSubmitTrivia } = this.props;
    const segs = 5000;
    const { playerEmail, playerName } = this.state;
    loginSubmitTrivia({ playerEmail, playerName });
    fetchDadosTrivia();
    setTimeout(() => history.push('/game'), segs);
  }

  handleCLickConfig() {
    const { history } = this.props;
    history.push('/config');
    // console.log(this.props);
    // console.log(history);
  }

  render() {
    const { playerName, playerEmail, validateLogin } = this.state;
    // const { loadingPerguntas } = this.props;
    const loginPage = (
      <div className="login-form">
        <h1>Trivia</h1>
        <label htmlFor="inputPlayerName">
          Nome:
          <input
            type="text"
            name="playerName"
            id="inputPlayerName"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ playerName }
          />
        </label>
        <label htmlFor="inputGravatarEmail">
          Email:
          <input
            type="text"
            name="playerEmail"
            id="inputGravatarEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ playerEmail }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ validateLogin }
          onClick={ () => this.handleCLick() }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.handleCLickConfig() }
        >
          Configurações
        </button>
      </div>
    );

    return (loginPage);
  }
}

const mapStateToProps = (state) => ({
  loading: state.apiTrivia.loadingPerguntas,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDadosTrivia: () => dispatch(fetchDados()),
  loginSubmitTrivia: (usuario) => dispatch(loginSubmit(usuario)),
});

Login.propTypes = {
  history: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
