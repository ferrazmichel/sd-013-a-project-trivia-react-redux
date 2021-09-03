import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services/Api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: true,
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
    this.enableButton();
  }

  enableButton() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async fetchToken() {
    const result = await getToken();
    localStorage.setItem('token', result.token);
  }

  handleOnClick() {
    this.fetchToken();
  }

  render() {
    const { email, name, disabledButton } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
            onClick={ this.handleOnClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
