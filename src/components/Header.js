import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
      placar: 0,
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
    const { state: { img, placar }, props: { user } } = this;
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
          {placar}
        </p>
      </div>
    );
  }
}
Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  emailUser: state.login.email,
  user: state.login.login,
});

export default connect(mapStateToProps)(Header);
