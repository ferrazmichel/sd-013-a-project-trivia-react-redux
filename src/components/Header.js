import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Nav, Navbar } from 'react-bootstrap';
import fetchAvatar from '../fetchAvatar';

class Header extends React.Component {
  render() {
    const { gravatarEmail, score, name } = this.props;
    const avatar = fetchAvatar(gravatarEmail);

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={ avatar }
              alt="avatar"
              data-testid="header-profile-picture"
              width="50px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" data-testid="header-player-name">
                Nome:
                {' '}
                {name}
              </Nav.Link>
              <Nav.Link href="#" data-testid="header-score">
                { score }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
