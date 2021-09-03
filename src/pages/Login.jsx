import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonConfig from '../components/ButtonConfig';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      play: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playButton = this.playButton.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  playButton() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => {
        res.json()
          .then((json) => {
            localStorage.setItem('token', json.token);
            this.setState({ play: true });
          });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { nome, email } = this.state;
    const { play } = this.state;
    if (play) {
      return <Link to="/game" />;
    }
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="input-player-name">
          Nome:
          <input
            name="nome"
            value={ nome }
            id="input-player-name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            name="email"
            value={ email }
            id="input-gravatar-email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !nome.length || !email.length }
          onClick={ this.playButton }
        >
          Jogar
        </button>
        <ButtonConfig />
      </form>);
  }
}

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Login);
