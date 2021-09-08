import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
    this.trocaState = this.trocaState.bind(this);
  }

  componentDidMount() {
    const { emailUser } = this.props;
    const img = md5(emailUser).toString();
    this.trocaState(img);
  }

  trocaState(valor) {
    this.setState({ img: valor });
  }

  render() {
    const { state: { img }, props: { user, score /* , respondido */ } } = this;
    // const page1 = window.location('/game');
    // const page2 = window.location('/feedback');
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${img}` }
          alt="imagem"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          {user}
        </h3>
        <p data-testid="header-score">
          {score}
        </p>
      </div>
    );
  }
}
Header.propTypes = {
  emailUser: PropTypes.string,
  user: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
const mapStateToProps = (state) => ({
  emailUser: state.login.email,
  user: state.login.login,
});

export default connect(mapStateToProps)(Header);
