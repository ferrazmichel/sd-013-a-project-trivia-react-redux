import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { infoPlayer, questionsShowMilhao, showMilhaoAPI } from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      buttonDisable: true,
    };
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { verifyInputs } = this;
    this.setState({ [name]: value },
      verifyInputs);
  }

  async handleClick(e) {
    e.preventDefault();
    const { email } = this.state;
    const { StartToken, questionsGame, player } = this.props;
    await StartToken();
    const { token } = this.props;
    localStorage.setItem('token', token);
    await questionsGame(token);
    player(email);
  }

  verifyInputs() {
    const verifyEmail = /.+@.+\.[A-Za-z]+$/;
    const verifyNickname = 5;
    const { email, nickname } = this.state;
    if (verifyEmail.test(email) && nickname.length > verifyNickname) {
      this.setState({ buttonDisable: false });
    } else { this.setState({ buttonDisable: true }); }
  }

  render() {
    const { handleChange, handleClick,
      state: { buttonDisable }, props: { stateEmail } } = this;
    if (stateEmail) return <Redirect to="/gamepage" />;
    return (
      <div className="login-container">
        <form className="login-form">
          <h2 className="login-heading">Login Page</h2>
          <input
            className="login-nickname"
            type="text"
            name="nickname"
            onChange={ handleChange }
            placeholder="Nickname"
            data-testid="input-player-name"
          />
          <input
            className="login-email"
            type="text"
            name="email"
            onChange={ handleChange }
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
          <button
            data-testid="btn-play"
            className="login-btn"
            type="submit"
            onClick={ handleClick }
            disabled={ buttonDisable }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  StartToken: PropTypes.func,
  dispatchInputLogin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  player: (payload) => dispatch(infoPlayer(payload)),
  StartToken: () => dispatch(showMilhaoAPI()),
  questionsGame: (token) => dispatch(questionsShowMilhao(token)),
});

const mapStateToProps = (state) => ({
  token: state.questions.token,
  stateEmail: state.user.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
