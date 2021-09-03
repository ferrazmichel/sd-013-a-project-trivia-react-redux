import React from 'react';
import { connect } from 'react-redux';
import ButtonPlayGame from '../components/ButtonPlayGame';
import InputLogin from '../components/InputLogin';
import { getUserData } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: '',
      inputEmail: '',
      btnDisabledStatus: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
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
    const { btnDisabledStatus, inputName, inputEmail } = this.state;

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
      </div>
    );
  }
}

export default Login;
