import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      buttonDisable: true,
    };
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { verifyInputs } = this;
    this.setState({ [name]: value },
      verifyInputs);
  }

  handleClick() {
    const { email, buttonDisable } = this.state;
    const { history, dispatchInputLogin } = this.props;
    dispatchInputLogin(email);
    if (buttonDisable === false) history.push('/carteira');
  }

  verifyInputs() {
    const verifyEmail = /.+@.+\.[A-Za-z]+$/;
    const verifyNickname = 5;
    const { email, nickname } = this.state;
    if (verifyEmail.test(email) && nickname.length > verifyNickname) {
      this.setState({ buttonDisable: false });
    } else { this.setState({ buttonDisable: true }); }
  }

  render() {
    const { handleChange, handleClick, state: { buttonDisable } } = this;
    return (
      <div className="login-container">
        <form className="login-form">
          <h2 className="login-heading">Login Page</h2>
          <input
            className="login-nickname"
            type="text"
            name="nickname"
            onChange={ handleChange }
            placeholder="Nickname"
            data-testid="input-player-name"
          />
          <input
            className="login-email"
            type="text"
            name="email"
            onChange={ handleChange }
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
          <button
            data-testid="btn-play"
            className="login-btn"
            type="submit"
            onClick={ handleClick }
            disabled={ buttonDisable }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchInputLogin: PropTypes.func.isRequired,
};

export default LoginPage;
