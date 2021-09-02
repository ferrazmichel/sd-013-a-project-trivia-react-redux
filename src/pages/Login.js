import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { login, email } = this.state;
    const validadeButton = login && email; // retorna true caso os campos estejam preenchidos
    return (
      <main>
        <div
          className="login"
        >
          <label htmlFor="login">
            <input
              data-testid="input-player-name"
              id="login"
              name="login"
              value={ login }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div
          className="email"
        >
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div
          className="btn"
        >
          <button
            disabled={ !validadeButton } // retorna false caso ambos os campos estejam preenchidos
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </div>
      </main>
    );
  }
}

export default Login;
