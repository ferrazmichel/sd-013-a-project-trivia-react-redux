import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Header.module.css';

class Header extends React.Component {
  render() {
    const { userName, score, gravatar } = this.props;

    return (
      <header className={ style.header }>
        <section className={ style.info }>
          <article className={ style.profile }>
            <img
              data-testid="header-profile-picture"
              src={ gravatar }
              alt="Gravatar Pic"
            />
            Player
            <span data-testid="header-player-name">{ userName }</span>
          </article>
        </section>
        <section className={ style.sectionScore }>
          <span className={ style.score }>
            Pontuação
          </span>
          <span className={ style.points } data-testid="header-score">{ score }</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userName: state.userReducer.name,
    score: state.gameReducer.score,
    gravatar: state.userReducer.gravatar,
  }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
};
