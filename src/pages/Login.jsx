import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDados } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName: '',
      playerEmail: '',
      validateLogin: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { playerName, playerEmail } = this.state;
      const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
      const boolValidateEmail = regexEmail.test(playerEmail);
      const nameRegex = /[A-Za-z-0-9]/;
      const boolValidateName = nameRegex.test(playerName);
      const boolValidateLogin = !(boolValidateEmail && boolValidateName);
      this.setState({
        validateLogin: boolValidateLogin,
      });
    });
  }

  handleCLick() {
    const { history, fetchDadosTrivia } = this.props;
    fetchDadosTrivia();
    history.push('/game');
  }

  render() {
    const { playerName, playerEmail, validateLogin } = this.state;
    return (
      <div>
        <label htmlFor="inputPlayerName">
          Nome:
          <input
            type="text"
            name="playerName"
            id="inputPlayerName"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            value={ playerName }
          />
        </label>
        <label htmlFor="inputGravatarEmail">
          Email:
          <input
            type="text"
            name="playerEmail"
            id="inputGravatarEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ playerEmail }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ validateLogin }
          onClick={ () => this.handleCLick() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDadosTrivia: () => dispatch(fetchDados()),
});

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
