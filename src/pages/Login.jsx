import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Input from '../components/Input';
import { fetchToken, addUser } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      enable: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.playSubmit = this.playSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  async playSubmit(e) {
    e.preventDefault();
    const { getToken, history, handleSubmit } = this.props;
    await getToken();
    const { valueToken } = this.props; // I had to call props here, because the async function
    history.push('/gameScreen');
    localStorage.setItem('token', JSON.stringify(valueToken.token));
    const { name, email } = this.state;

    const data = {
      name,
      email,
    };
    handleSubmit(data);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => (
      this.setState((prevState) => (
        { enable: prevState.name !== '' && this.validateEmail() }))
    ));
  }

  validateEmail() {
    const { email } = this.state;
    const isValid = /^([\w.%+-]+)@([\w-]+.)+([\w]{2,})$/i.test(email);
    if (!isValid || email === '') {
      return false;
    }
    return true;
  }

  render() {
    const { name, email, enable } = this.state;
    const { history } = this.props;

    return (
      <section>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form action="submit">
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
          <button
            disabled={ !enable }
            type="submit"
            data-testid="btn-play"
            onClick={ this.playSubmit }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/configScreen') }
          >
            Configurações
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  handleSubmit: (data) => dispatch(addUser(data)),
});

const mapStateToProps = (state) => ({
  valueToken: state.users.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  valueToken: PropTypes.shape({
    response_code: PropTypes.number,
    response_message: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
