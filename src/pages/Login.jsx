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
    };
    this.handleChange = this.handleChange.bind(this);
    this.playSubmit = this.playSubmit.bind(this);
  }

  // componentDidMount() {
  // }

  async playSubmit() {
    const { getToken } = this.props;
    await getToken();
    const { valueToken, history } = this.props;
    history.push('/gameScreen');
    localStorage.setItem('token', JSON.stringify(valueToken.token));
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
        <form>
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
            type="button"
            data-testid="btn-play"
            onClick={ this.playSubmit }
          >
            Jogar
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
