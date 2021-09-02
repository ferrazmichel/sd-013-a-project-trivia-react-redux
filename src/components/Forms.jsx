import React from 'react';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validEmail(email, nome) {
    const valid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!valid || nome.length === 0) {
      return true;
    }
    return false;
  }

  render() {
    const { nome, email } = this.state;
    return (
      <form action="">
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="nome"
            value={ nome }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.validEmail(email, nome) }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Forms;
