import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import md5 from 'crypto-js/md5';
import { infoPlayer } from '../actions';
import './pagesCSS/loginpage.css';
import trivia from '../image/Trivia.jpg';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      buttonDisable: true,
      score: 0,
    };
    this.verifyInputs = this.verifyInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startLocalStorage = this.startLocalStorage.bind(this);
  }

  startLocalStorage() {
    const { score } = this.state;
    const obj = { player: { score } };
    return localStorage.setItem('state', JSON.stringify(obj));
  }

  handleChange({ target: { name, value } }) {
    const { verifyInputs } = this;
    this.setState({ [name]: value },
      verifyInputs);
  }

  handleClick(e) {
    e.preventDefault();
    const { email, nickname } = this.state;
    const { player } = this.props;
    const cryptoEmail = md5(email.trim()).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${cryptoEmail}`;
    player({ email, nickname, gravatarEmail });
    this.startLocalStorage();
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
    if (stateEmail) { return <Redirect to="/gamepage" />; }
    return (
      <div className="login-container-main">
        <div className="login-container-form">
          <img className="login-heading" src={ trivia } alt="logo" />
          <form className="login-form">
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
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => {
                const { history } = this.props;
                history.push('/settingspage');
              } }
            >
              Settings
            </button>
          </form>
        </div>
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
  player: (userInfos) => dispatch(infoPlayer(userInfos)),
});

const mapStateToProps = (state) => ({
  stateEmail: state.user.email,
  name: state.user.nickname,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
