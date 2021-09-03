import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail, requestApi } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nameUser: '',
      token: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.receiveToken = this.receiveToken.bind(this);
    this.saveNameEmail = this.saveNameEmail.bind(this);
  }

  onSubmitForm() {
    const { history, emailKey } = this.props;
    // Disparamos a nossa action através da função importada
    // de actions.js, que apelidamos de EmailKey
    const { email } = this.state;
    emailKey(email);
    this.receiveToken();
    this.saveNameEmail();
    history.push('/trivia');
  }

  saveNameEmail() {
    const { email, nameUser } = this.state;
    const state = {
      player: {
        name: nameUser,
        assertions: '',
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  async receiveToken() {
    const { token } = this.state;
    const { trivia } = this.props;
    const Api = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await Api.json();
    localStorage.setItem('token', JSON.stringify(json.token));
    this.setState({ token: json.token });
    trivia(token);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, nameUser } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            data-testid="input-player-name"
            name="nameUser"
            placeholder="name"
            value={ nameUser }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </div>
        <button
          type="button"
          disabled={ !(Boolean(email) && Boolean(nameUser)) }
          onClick={ this.onSubmitForm }
          data-testid="btn-play"
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
        >
          <Link to="/configs">Configurações</Link>
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  emailKey: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  trivia: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailKey: (email) => dispatch(saveEmail(email)),
  trivia: (token) => dispatch(requestApi(token)),
});

export default connect(null, mapDispatchToProps)(Login);
