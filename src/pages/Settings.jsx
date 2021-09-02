import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div data-testid="settings-title">
        Settings Page
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Settings);

// Settings.propTypes = {

// };
