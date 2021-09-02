import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisable: true,
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    // this.checkLogin = this.checkLogin.bind(this);
    this.goToConfig = this.goToConfig.bind(this);
  }

  handleChange({ target }) {
    const { id, value } = target;

    this.setState({ [id]: value }, () => {
      this.checkLogin();
    });
  }

  checkLogin() {
    const { name, email } = this.state;
    const emailValidation = /\S+@\S+\.\S+/;
    if (emailValidation.test(email) && name) this.setState({ btnDisable: false });
    else this.setState({ btnDisable: true });
  }

  goToConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  async saveToLocalStorage() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', JSON.stringify(result.token));
  }

  render() {
    const { btnDisable } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.goToConfig }
        >
          Configurações
        </button>
        <Link to="/tela-de-jogo">
          <button
            disabled={ btnDisable }
            data-testid="btn-play"
            type="button"
            onClick={ this.saveToLocalStorage }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
