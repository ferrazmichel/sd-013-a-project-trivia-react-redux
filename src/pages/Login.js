import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setLogin, { fetchAPI } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { loginSet, fetchQuest } = this.props;
    await fetchQuest();
    const { login, email } = this.state;
    loginSet(login, email);
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { login, email } = this.state;
    const validadeButton = login && email; // retorna true caso os campos estejam preenchidos
    return (
      <main>
        <div
          className="login"
        >
          <label htmlFor="login">
            <input
              data-testid="input-player-name"
              id="login"
              name="login"
              value={ login }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div
          className="email"
        >
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div
          className="btn"
        >
          <button
            disabled={ !validadeButton } // retorna false caso ambos os campos estejam preenchidos
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.fetchToken.token,
});

const mapDispatchToState = (dispatch) => ({
  loginSet: (login, email) => dispatch(setLogin(login, email)),
  fetchQuest: () => dispatch(fetchAPI()),
});

Login.propTypes = {
  fetchQuest: PropTypes.func.isRequired,
  loginSet: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(Login);
