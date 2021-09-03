import React from 'react';
import { connect } from 'react-redux';
import ButtonConfig from '../components/ButtonConfig';

import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { nome, email } = this.state;
    return (
      <div
        className="login-wrapper"
        onSubmit={ (e) => this.handleSubmit(e) }
      >
        <h1 className="login-title">Jogo de Trivia</h1>
        <form className="login-container">
          <div className="login-form-control">
            <label htmlFor="input-player-name">
              Nome do Jogador:
              <input
                name="nome"
                value={ nome }
                id="input-player-name"
                type="text"
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="login-form-control">
            <label htmlFor="input-gravatar-email">
              Email do Gravatar:
              <input
                name="email"
                value={ email }
                id="input-gravatar-email"
                type="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !nome.length || !email.length }
          >
            JOGAR!
          </button>
          <ButtonConfig />
        </form>
      </div>
    );
  }
}
// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Login);
