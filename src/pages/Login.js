import React from 'react';
import { Redirect } from 'react-router-dom';
import ButtonPlayGame from '../components/ButtonPlayGame';
import InputLogin from '../components/InputLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: '',
      inputEmail: '',
      btnDisabledStatus: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
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
    const { inputName, inputEmail } = this.state;

    if (inputName !== '' && inputEmail !== '') {
      this.setState({
        btnDisabledStatus: false,
      });
    }
  }

  render() {
    const { btnDisabledStatus, inputName, inputEmail, redirect } = this.state;

    return (
      <div>
        <form action="">
          <InputLogin
            labelValue="Nome"
            dataTestId="input-player-name"
            onChange={ this.handleChange }
            value={ inputName }
          />
          <InputLogin
            labelValue="E-mail"
            dataTestId="input-gravatar-email"
            onChange={ this.handleChange }
            value={ inputEmail }
          />
          <ButtonPlayGame
            isDisabled={ btnDisabledStatus }
          />
        </form>
        { redirect && <Redirect to="/game" /> }
      </div>
    );
  }
}

export default Login;
