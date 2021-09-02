import React, { Component } from 'react';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

class Login extends Component {
  constructor() {
    super();

    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  }

  enableButton() {
    const { email, name } = this.state;
    if (validateEmail(email) && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              type="email"
            />
          </label>
          <label htmlFor="name">
            Nome do Jogador
            <input
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              type="text"
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isDisabled }
          >
            JOGAR!
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
