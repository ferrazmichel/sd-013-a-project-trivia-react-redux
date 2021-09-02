import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div></div>
    );
  }
}

const mapStateToProps = ({ user: { email, points, avatar } }) => ({
  email,
  points,
  avatar
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
}
export default connect(mapStateToProps, null)(Feedback);
