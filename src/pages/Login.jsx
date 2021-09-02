import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Login Page
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Login);

// Login.propTypes = {

// };
