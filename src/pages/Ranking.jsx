import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        Ranking Page
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(null, null)(Ranking);

// Ranking.propTypes = {

// };
