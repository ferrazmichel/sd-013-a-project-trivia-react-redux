import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login, score } from '../actions';
import ButtonConfig from '../components/ButtonConfig';

import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      play: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playButton = this.playButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { dispatchLogin, dispatchGame, history } = this.props;
    const playerInfo = { assertions: 0, score: 0 };
    dispatchLogin(this.state);
    dispatchGame(playerInfo);
    history.push('/Game');
  }

  render() {
    const { play, nome, email } = this.state;
    if (play) { return <Link to="/game" />; }
    return (
      <div className="login-wrapper">
        <h1 className="login-title">Jogo de Trivia</h1>
        <form className="login-container" onSubmit={ this.handleSubmit }>
          <div className="login-form-control">
            <label htmlFor="input-player-name">
              { 'Usuário do Jogador: ' }
            </label>
            <input
              name="nome"
              value={ nome }
              id="input-player-name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </div>
          <div className="login-form-control">
            <label htmlFor="input-gravatar-email">
              { 'Email do Gravatar: ' }
            </label>
            <input
              name="email"
              value={ email }
              id="input-gravatar-email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </div>
          <button
            className="ui-button"
            type="submit"
            data-testid="btn-play"
            disabled={ !nome.length || !email.length }
            onClick={ this.playButton }
            rounded
          >
            JOGAR!
          </button>
          <ButtonConfig />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(login(state)),
  dispatchGame: (state) => dispatch(score(state)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  dispatchGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
