import React from 'react';
import { Redirect } from 'react-router-dom';
import ButtonPlayGame from '../components/ButtonPlayGame';
import InputLogin from '../components/InputLogin';
import fetchTriviaAPI from '../services/triviaAPI';
import { getUserData } from '../redux/actions';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      btnDisabledStatus: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const response = await fetchTriviaAPI();
    const { token } = response;

    localStorage.setItem('token', token);

    this.setState({
      redirect: true,
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
    const { btnDisabledStatus, name, email, redirect } = this.state;

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
          <ButtonPlayGame
            isDisabled={ btnDisabledStatus }
            onClick={ this.handleClick }
          />
        </form>
        { redirect && <Redirect to="/gamePage" /> }
      </div>
    );
  }
}

export default Login;
