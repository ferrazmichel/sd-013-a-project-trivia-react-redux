import React from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      playerName: '',
      validation: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  onValidation() {
    const min = 3;
    const { email, playerName } = this.state;
    const validation = !(/\w+@\w+.com/.test(email)
    && playerName.length > min
    && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  handleSettings(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.onValidation());
  }

  render() {
    const { email, playerName, validation } = this.state;
    return (
      <form>
        <Input
          labelText="jogador"
          testid="input-player-name"
          name="playerName"
          type="text"
          value={ playerName }
          onChange={ this.handleChange }
        />
        <Input
          labelText="email"
          testid="input-gravatar-email"
          name="email"
          type="text"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ validation }
        >
          Jogar
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf(Object),
}.isRequired;

export default Login;
