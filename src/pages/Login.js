/**
 * Representa a página inicial do app.
 * Apenas um formulário de login é renderizado.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoggedIn } from '../actions';
import ButtonConfig from '../components/buttonConfig';

const TRIVIA_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const RE_EMAIL = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  async getToken() {
    try {
      const response = await fetch(TRIVIA_TOKEN_URL);
      const data = await response.json();
      // Conforme https://opentdb.com/api_config.php
      if (data.response_code === 0) { // Se a requisição foi realizada com sucesso.
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Valida o nome do jogador e o salva no state do component Login.
  handleNameChange(value) {
    this.setState({ name: value });
  }

  // Processa o envio do formulário de login.
  handleSubmission(e) {
    e.preventDefault(); // Evita que a tela seja recarregada.

    const { name, email } = this.state;
    const { logPlayerIn, history } = this.props;

    // Se o nome e o email forem válidos
    if (name && email) {
      // Se ainda não existe um `token`, faz a requisição.
      if (!localStorage.getItem('token')) this.getToken();

      // Dispara a action que salva os dados do `player` na store do redux.
      // { name, gravatarEmail } é o `payload` da action.
      logPlayerIn({ name, gravatarEmail: email });
      console.log(history);
      history.push('/match'); // Redireciona o usuário para a página do jogo.

      // Reseta o state do component Login, já que este foi utilizado
      // apenas para validação dos dados informados pelo usuário.
      this.setState({ name: '', email: '' });
    }
  }

  // Valida o email e o salva no state do component Login.
  handleEmailChange(userInput) {
    const value = (RE_EMAIL.test(userInput))
      ? userInput
      : '';

    this.setState({ email: value });
  }

  render() {
    const { name, email } = this.state;

    // Se o nome e o email informados forem válidos, habilita o botão `Jogar`.
    let disableButton = true;
    if (name && email) disableButton = false;

    return (
      <div>
        <ButtonConfig />
        <form onSubmit={ this.handleSubmission }>
          <label htmlFor="gravatarEmail">
            Email do Gravatar
            <input
              id="gravatarEmail"
              type="text"
              name="gravatarEmail"
              onChange={ (e) => this.handleEmailChange(e.target.value) }
              data-testid="input-gravatar-email"
            />
          </label>

          <label htmlFor="playerName">
            Nome do Jogador
            <input
              id="playerName"
              type="text"
              name="playerName"
              onChange={ (e) => this.handleNameChange(e.target.value) }
              data-testid="input-player-name"
            />
          </label>

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ disableButton } // Habilita o botão somente se os dados forem válidos.
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logPlayerIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logPlayerIn: (email) => dispatch(userLoggedIn(email)),
});

export default connect(null, mapDispatchToProps)(Login);
