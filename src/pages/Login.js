import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePlayer } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      nameValidation: false,
      emailValidation: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput({ target }) {
    this.setState((prevState) => ({
      [target.name]: target.value,
      nameValidation: target.name === 'name' ? true : prevState.nameValidation,
      emailValidation: target.name === 'email' ? true : prevState.emailValidation,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { handleSavePlayer, history } = this.props;
    const { name, email } = this.state;
    handleSavePlayer({ name, email });
    history.push('/trivia');
  }

  render() {
    const { name, email, nameValidation, emailValidation } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            name="name"
            value={ name }
            id="input-name"
            onChange={ this.handleInput }
            data-testid="input-player-name"
            required
          />
        </label>

        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            id="input-email"
            onChange={ this.handleInput }
            data-testid="input-gravatar-email"
            required
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !nameValidation || !emailValidation }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  handleSavePlayer: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDistatchToProps = (dispatch) => ({
  handleSavePlayer: (player) => dispatch(savePlayer(player)),
});

export default connect(null, mapDistatchToProps)(Login);
