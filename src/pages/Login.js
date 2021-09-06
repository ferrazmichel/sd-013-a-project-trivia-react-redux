import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserData } from '../redux/actions';
import ButtonPlayGame from '../components/ButtonPlayGame';
import fetchTriviaAPI from '../services/triviaAPI';
import InputLogin from '../components/InputLogin';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabledStatus: true,
      email: '',
      name: '',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  async handleClick() {
    const { state: { email, name } } = this;
    await userData(getUser({ email, name }));
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
    const { btnDisabledStatus, email, name, redirect } = this.state;

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

const mapDispatchToProps = (dispatch) => ({
  getUser: (userData) => dispatch(getUserData(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
