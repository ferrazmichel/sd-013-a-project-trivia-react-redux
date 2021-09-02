import React from 'react';
import Input from '../components/Input';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      playerName: '',
      validation: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
  }

  onValidation() {
    const min = 3;
    const { email, playerName } = this.state;
    const validation = !(/\w+@\w+.com/.test(email)
    && playerName.length > min
    && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.onValidation());
  }

  render() {
    const { email, playerName, validation } = this.state;
    return (
      <form>
        <Input
          labelText="jogador"
          testid="input-player-name"
          name="playerName"
          type="text"
          value={ playerName }
          onChange={ this.handleChange }
        />
        <Input
          labelText="email"
          testid="input-gravatar-email"
          name="email"
          type="text"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ validation }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
