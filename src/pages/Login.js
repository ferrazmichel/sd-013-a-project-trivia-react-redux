import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      nameValidation: false,
      emailValidation: false,
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    this.setState((prevState) => ({
      [target.name]: target.value,
      nameValidation: target.name === 'name' ? true : prevState.nameValidation,
      emailValidation: target.name === 'email' ? true : prevState.emailValidation,
    }));
  }

  render() {
    const { name, email, nameValidation, emailValidation } = this.state;

    return (
      <form>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            name="name"
            value={ name }
            id="input-name"
            onChange={ this.handleInput }
            data-testid="input-player-name"
            required
          />
        </label>

        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            id="input-email"
            onChange={ this.handleInput }
            data-testid="input-gravatar-email"
            required
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !nameValidation || !emailValidation }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
