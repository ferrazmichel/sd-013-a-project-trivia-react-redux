import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setLogin, { fetchAPI, fetchQuestions } from '../actions';
import Buttons from '../components/Buttons';

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
    const { loginSet, fetchToken, history, fetchQuest } = this.props;
    await fetchToken();
    const { login, email } = this.state;
    loginSet(login, email);
    const { token } = this.props;
    await fetchQuest(token);
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
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
          <Buttons validadeButton={ validadeButton } handleClick={ this.handleClick } />
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
  fetchToken: () => dispatch(fetchAPI()),
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  fetchQuest: PropTypes.func.isRequired,
  loginSet: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.objectOf({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(Login);
