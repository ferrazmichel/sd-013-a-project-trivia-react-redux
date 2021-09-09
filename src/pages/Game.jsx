import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Pergunta from '../components/Pergunta';
import { registerGravatar } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };
    this.fetchGravatar = this.fetchGravatar.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  fetchGravatar() {
    const { email, gravatarReducer } = this.props;
    // const { gravatar } = this.state;
    const gravatarEmail = md5(email).toString();
    // fetch(`https://www.gravatar.com/avatar/${gravatarEmail}`);
    const linkImgGravatar = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    gravatarReducer(linkImgGravatar);
    this.setState({
      gravatar: linkImgGravatar,
    });
  }

  render() {
    const { gravatar } = this.state;
    const { nameUser } = this.props;
    return (
      <header>
        <img src={ gravatar } alt="imagemGravatar" data-testid="header-profile-picture" />
        <p>
          User:
          <span data-testid="header-player-name">
            { nameUser }
          </span>
        </p>
        <p>
          Score:
          <span data-testid="header-score">
            0
          </span>
        </p>
        Tela de game
        <Pergunta />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.player.playerName,
  email: state.player.playerEmail,
});

const mapDispatchToProps = (dispatch) => ({
  gravatarReducer: (gravatar) => dispatch(registerGravatar(gravatar)),
});

Game.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
