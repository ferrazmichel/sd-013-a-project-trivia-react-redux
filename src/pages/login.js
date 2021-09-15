import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail, fetchApiToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nameUser: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.saveNameEmail = this.saveNameEmail.bind(this);
  }

  async onSubmitForm() {
    const { emailKey, apiToken, history, token } = this.props;
    // Disparamos a nossa action através da função importada
    // de actions.js, que apelidamos de EmailKey
    const { email } = this.state;
    emailKey(email);
    this.saveNameEmail();
    await apiToken();
    localStorage.setItem('token', token);
    history.push('/trivia');
  }

  saveNameEmail() {
    const { email, nameUser } = this.state;
    const state = {
      player: {
        name: nameUser,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleChange({ target: { name, value } }) {
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
  apiToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailKey: (email) => dispatch(saveEmail(email)),
  apiToken: () => dispatch(fetchApiToken()),
});

export default connect(null, mapDispatchToProps)(Login);
