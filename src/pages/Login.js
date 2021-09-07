import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserData } from '../redux/actions';
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
  }

  handleClickSettings() {
    this.setState({
      redirectToSettings: true,
    });
  }

  async handleClickPlay() {
    const { email, name } = this.state;
    const { getUser } = this.props;
    await getUser({ email, name });
    const response = await fetchTriviaAPI();
    const { token } = response;

    localStorage.setItem('token', token);

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
            disabled={ btnDisabledStatus }
            onClick={ this.handleClickPlay }
          />
          <Button
            dataTestId="btn-settings"
            name="Configurações"
            onClick={ this.handleClickSettings }
          />
        </form>
        { redirectToGamePage && <Redirect to="/gamepage" /> }
        { redirectToSettings && <Redirect to="/settings" /> }
      </div>
    );
  }
}

Login.propTypes = {
  getUser: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getUser: (userData) => dispatch(getUserData(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
