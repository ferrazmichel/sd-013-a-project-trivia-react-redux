import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDados, loginSubmit } from '../redux/actions';

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

  handleCLick() {
    const { history, fetchDadosTrivia, loginSubmitTrivia } = this.props;
    const { playerEmail, playerName } = this.state;
    loginSubmitTrivia({ playerEmail, playerName });
    fetchDadosTrivia();
    history.push('/game');
    // console.log(resultado);
  }

  handleCLickConfig() {
    const { history } = this.props;
    history.push('/config');
    // console.log(this.props);
    // console.log(history);
  }

  render() {
    const { playerName, playerEmail, validateLogin } = this.state;
    return (
      <div>
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDadosTrivia: () => dispatch(fetchDados()),
  loginSubmitTrivia: (usuario) => dispatch(loginSubmit(usuario)),
});

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
