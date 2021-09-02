import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Input from '../components/Input';
import { addUser } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(event) {
    event.preventDefault();

    const { name, email } = this.state;
    const { handleSubmit } = this.props;

    const data = {
      name,
      email,
    };
    handleSubmit(data);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    const six = 6;
    const validateEmail = () => {
      const isValid = email.match(/^([\w.%+-]+)@([\w-]+.)+([\w]{2,})$/i);
      if (!isValid || email.lenght === 0) {
        return false;
      }
      return true;
    };

    const enable = validateEmail() && (name.length >= six);
    return (
      <section>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form onSubmit={ this.onSubmitForm }>
          <Input
            label="Nome"
            type="text"
            onChange={ this.handleChange }
            value={ name }
            name="name"
            dataTestid="input-player-name"
            id="user-name"
          />
          <Input
            label="Email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            dataTestid="input-gravatar-email"
            id="user-email"
          />
          <button disabled={ !enable } type="submit" data-testid="btn-play">
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (data) => dispatch(addUser(data)),
});

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
