import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        GAME
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.userReducer.email,
  userName: state.userReducer.name,
});

export default connect(mapStateToProps)(Game);
