import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: '',
      inputEmail: '',
      btnDisabledStatus: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  }

  verifyInputs() {
    const { inputName, inputEmail } = this.state;

    if (inputName !== '' && inputEmail !== '') {
      this.setState({
        btnDisabledStatus: false,
      });
    }
  }

  render() {
    const { btnDisabledStatus, inputName, inputEmail } = this.state;

    return (
      <div>
        <form action="">
          <label htmlFor="input-player-name">
            Nome
            <input
              type="text"
              data-testid="input-player-name"
              id="input-player-name"
              onChange={ this.handleChange }
              value={ inputName }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail
            <input
              type="text"
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              onChange={ this.handleChange }
              value={ inputEmail }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabledStatus }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
