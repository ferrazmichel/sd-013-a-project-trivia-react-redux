import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions, saveLogin } from '../redux/actions';
import silvioSantos from '../images/silviosantos.gif';
import themeSong from '../sound_fx/theme-song.mp3';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisable: true,
      name: '',
      email: '',
    };

    this.checkLogin = this.checkLogin.bind(this);
    this.goToConfig = this.goToConfig.bind(this);
    this.goToGamePage = this.goToGamePage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);

    this.startTheme = new Audio(themeSong);
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

  goToGamePage() {
    const { history } = this.props;
    if (localStorage.getItem('token')) history.push('/tela-de-jogo');
  }

  async saveToLocalStorage() {
    const { name, email } = this.state;
    const player = { player: { name, gravatarEmail: email, score: 0, assertions: 0 } };
    localStorage.setItem('state', JSON.stringify(player));

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', JSON.stringify(result.token));
  }

  renderForm() {
    const { btnDisable, name, email } = this.state;
    const { sendLogin, getQuestions } = this.props;

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
        <button
          disabled={ btnDisable }
          data-testid="btn-play"
          type="button"
          onClick={ async () => {
            await this.saveToLocalStorage();
            sendLogin(name, email);
            await getQuestions(JSON.parse(localStorage.getItem('token')));
            this.startTheme.play();
            this.goToGamePage();
          } }
        >
          Jogar
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.props;
    return (loading ? <img
      src={ silvioSantos }
      alt="silvio santos"
    /> : this.renderForm());
  }
}

const mapStateToProps = ({ questions }) => ({
  loading: questions.loading,
});

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (name, email) => dispatch(saveLogin(name, email)),
  getQuestions: (userToken) => dispatch(fetchQuestions(userToken)),
});

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
