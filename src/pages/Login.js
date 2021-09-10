/**
 * Representa a página inicial do app.
 * Apenas um formulário de login é renderizado.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoggedIn, getQuestionsFromResponse } from '../actions';
import ButtonConfig from '../components/buttonConfig';
import { fetchQuestions } from '../fetchers';

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

  async getQuestions() {
    const { saveQuestions } = this.props;

    const questions = await fetchQuestions(); // questions
    saveQuestions(questions); // Salva as questões na store do redux.
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
      this.getQuestions(); // Executa o fetch do token e das questões

      // Dispara a action que salva os dados do `player` na store do redux.
      // { name, gravatarEmail } é o `payload` da action.
      logPlayerIn({ name, gravatarEmail: email });

      const localState = {
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        },
      };
      localStorage.setItem('state', JSON.stringify(localState));

      // Reseta o state do component Login, já que este foi utilizado
      // apenas para validação dos dados informados pelo usuário.
      this.setState({ name: '', email: '' });

      history.push('/game'); // Redireciona o usuário para a página do jogo.
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
  saveQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logPlayerIn: (email) => dispatch(userLoggedIn(email)),
  saveQuestions: (data) => dispatch(getQuestionsFromResponse(data)),
});

export default connect(null, mapDispatchToProps)(Login);
