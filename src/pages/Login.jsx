import React, { Component } from 'react';
import Input from '../components/Input';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    const six = 6;
    const validateEmail = () => {
      const isValid = email.match(/^([\w.%+-]+)@([\w-]+.)+([\w]{2,})$/i);
      if (!isValid || email.lenght === 0) {
        return false;
      }
      return true;
    };

    const enable = validateEmail() && (name.length >= six);
    return (
      <section>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <Input
            label="Nome"
            type="text"
            onChange={ this.handleChange }
            value={ name }
            name="name"
            dataTestid="input-player-name"
            id="user-name"
          />
          <Input
            label="Email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            dataTestid="input-gravatar-email"
            id="user-email"
          />
          <button disabled={ !enable } type="submit" data-testid="btn-play">
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
