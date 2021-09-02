import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { fetchToken } from '../redux/actions';
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

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  playSubmit() {
    const { valueToken, history } = this.props;
    localStorage.setItem('userToken', JSON.stringify(valueToken.token));
    history.push('/gameScreen');
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
          <button disabled={ !enable } type="button" data-testid="btn-play" onClick={ this.playSubmit }>
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  valueToken: state.users.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
