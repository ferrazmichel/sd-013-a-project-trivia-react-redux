import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import fetchTriviaAPI from '../services/triviaAPI';
import InputLogin from '../components/InputLogin';
import Button from '../components/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabledStatus: true,
      email: '',
      name: '',
      redirectToGamePage: false,
      redirectToSettings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.playBtnOn = this.playBtnOn.bind(this);
    this.savePlayerData = this.savePlayerData.bind(this);
  }

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state !== null) {
      this.playBtnOn(false, state);
    }
  }

  savePlayerData() {
    const { email, name } = this.state;
    const hash = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${hash}`;
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
        gravatarUrl: SRC,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  playBtnOn(on, state) {
    const { player } = state;
    this.setState({
      name: player.name,
      email: player.gravatarEmail,
      btnDisabledStatus: on,
    });
  }

  handleClickSettings() {
    this.setState({
      redirectToSettings: true,
    });
  }

  async handleClickPlay() {
    this.savePlayerData();
    fetchTriviaAPI();

    this.setState({
      redirectToGamePage: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  }

  verifyInputs() {
    const { name, email } = this.state;
    const emailVerification = /\S+@\S+\.\S+/;
    const isValidEmail = emailVerification.test(email);

    if (name !== '' && email !== '' && isValidEmail) {
      this.setState({
        btnDisabledStatus: false,
      });
    } else {
      this.setState({
        btnDisabledStatus: true,
      });
    }
  }

  render() {
    const { btnDisabledStatus, email, name,
      redirectToGamePage, redirectToSettings } = this.state;

    return (
      <div>
        <form action="">
          <InputLogin
            labelValue="Nome"
            dataTestId="input-player-name"
            onChange={ this.handleChange }
            name="name"
            value={ name }
          />
          <InputLogin
            labelValue="E-mail"
            dataTestId="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
          <Button
            dataTestId="btn-play"
            name="Jogar"
            classe="btn-play"
            disabled={ btnDisabledStatus }
            onClick={ this.handleClickPlay }
          />
          <Button
            dataTestId="btn-settings"
            name="Configurações"
            classe="btn-config"
            onClick={ this.handleClickSettings }
          />
        </form>
        { redirectToGamePage && <Redirect to="/gamepage" /> }
        { redirectToSettings && <Redirect to="/settings" /> }
      </div>
    );
  }
}

export default Login;
