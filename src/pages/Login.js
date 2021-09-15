import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendUserInfo } from '../redux/actions';
import getTokenApi from '../redux/services/fetchToken';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButton: true,
      email: '',
      player: '',
      redirect: false,
    };
    this.activateButton = this.activateButton.bind(this);
    this.handleonChange = this.handleonChange.bind(this);
    this.handleonClick = this.handleonClick.bind(this);
  }

  componentDidMount() {
    getTokenApi();
  }

  handleonChange() {
    const valueEmail = document.getElementById('email');
    const valuePlayer = document.getElementById('player');
    this.setState({
      email: valueEmail.value,
      player: valuePlayer.value,
    }, () => this.activateButton());
  }

  handleonClick() {
    const { email, player } = this.state;
    const { userLogin } = this.props;
    userLogin(({ email, player }));
    // fetchApi();
    this.setState({ redirect: true });
  }

  activateButton() {
    const { email, player } = this.state;
    const validPlayer = '';
    const validEmail = /\S+@\S+.\S+/;
    if (player !== validPlayer && validEmail.test(email)) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  }

  render() {
    // ajuda do Rogerio P da silva, monstro!!
    const playLocalStorage = '{"player":{"name":"Nome da pessoa","assertions":0,"score":0,"gravatarEmail":"email@pessoa.com"}}';
    localStorage.setItem('state', playLocalStorage);
    const { disableButton, redirect } = this.state;
    // const { questions } = this.props;
    // console.log(questions.length);
    if (redirect) return <Redirect to="/trivia" />;
    return (
      <form>
        <label htmlFor="email">
          <input
            onChange={ this.handleonChange }
            id="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="Email"
          />
        </label>
        <label htmlFor="player">
          <input
            onChange={ this.handleonChange }
            id="player"
            data-testid="input-player-name"
            name="player"
            placeholder="Player"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleonClick }
          disabled={ disableButton }
        >
          Jogar
        </button>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userLogin: (payload) => dispatch(sendUserInfo(payload)),
  // fetchApi: () => dispatch(fetchApiQuestions()),
});

const mapStateToProps = (state) => ({
  questions: state.trivia.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
