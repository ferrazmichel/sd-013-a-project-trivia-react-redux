import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      src: '',
    };

    this.mountHeader = this.mountHeader.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (player !== null) {
      this.mountHeader(player);
    }
  }

  mountHeader(player) {
    this.setState({
      name: player.name,
      src: player.gravatarUrl,
    });
  }

  render() {
    const { name, src } = this.state;
    const { thisScore } = this.props;

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ src } alt="imagem do avatar" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">
            Score:
            { thisScore }
          </h3>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  thisScore: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  thisScore: state.score.score,
});

export default connect(mapStateToProps)(Header);
