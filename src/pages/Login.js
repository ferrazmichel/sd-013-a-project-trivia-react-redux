import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { sendPlayerInfo, sendUserInfo } from '../actions';
import { TokenApi } from '../services';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      authEmail: true,
      authName: true,
      name: '',
      gravatarEmail: '',
      shouldRedirect: false,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  async formSubmit(event) {
    event.preventDefault();
    const { gravatarEmail, name } = this.state;
    const { submitUser, submitPlayer } = this.props;
    submitUser(({ gravatarEmail, name }));
    submitPlayer(({ gravatarEmail, name, score: 0, assertions: 0 }));
    const response = await TokenApi();
    this.setState({ shouldRedirect: response });
  }

  validateEmail({ target }) {
    const { value } = target;
    const regex = /\S+@\S+\.\S+/; // Gesse Turma 13A
    if (regex.test(value)) {
      return this.setState({
        authEmail: false,
        gravatarEmail: value,
      });
    }
    return this.setState({
      authEmail: true,
      gravatarEmail: value,
    });
  }

  validateName({ target }) {
    const { value } = target;
    const MIN_LENGTH_NAME = 1;
    if (value.length >= MIN_LENGTH_NAME) {
      return this.setState({
        authName: false,
        name: value,
      });
    }
    return this.setState({
      authName: true,
      name: value });
  }

  render() {
    const { authEmail, authName, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/play" />;
    }
    return (
      <>
        <form className="forms" onSubmit={ this.formSubmit }>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
              placeholder="Name"
              onChange={ this.validateName }
            />
          </label>
          <label htmlFor="login">
            <input
              id="login"
              type="text"
              data-testid="input-gravatar-email"
              placeholder="Email"
              onChange={ this.validateEmail }
            />
          </label>
          <button
            disabled={ authEmail || authName }
            type="submit"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button type="button" data-testid="btn-settings">
          <Link to="/config">Configurações</Link>
        </button>
      </>
    );
  }
}

Login.propTypes = {
  submitUser: PropTypes.func,
  submitPlayer: PropTypes.func,
}.isRequired;

const mapDispachToProps = (dispatch) => ({
  submitUser: (payload) => dispatch(sendUserInfo(payload)),
  submitPlayer: (payload) => dispatch(sendPlayerInfo(payload)),
});
export default connect(null, mapDispachToProps)(Login);
