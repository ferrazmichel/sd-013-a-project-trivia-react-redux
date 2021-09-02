import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser, fetchTrivia } from '../redux/actions';
import { Link } from 'react-router-dom';

//

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    const { token, history } = this.props;
    localStorage.setItem('token', JSON.stringify({ token }));
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  }

  enableButton() {
    const { email, name } = this.state;
    if (validateEmail(email) && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, name } = this.state;
    const { setUser, fetchToken } = this.props;
    setUser(email, name);
    fetchToken();
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email do Gravatar:
            <input
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              type="email"
            />
          </label>
          <label htmlFor="name">
            Nome do Jogador
            <input
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              type="text"
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            JOGAR!
          </button>
          <Link to="/settings">
            <button
              type="submit"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (email, name) => dispatch(saveUser(email, name)),
  fetchToken: () => dispatch(fetchTrivia()),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
