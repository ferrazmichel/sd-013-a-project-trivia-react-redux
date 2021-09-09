import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FeedbackMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg1: 'Podia ser melhor...',
      msg2: 'Mandou bem!',
    };
  }

  render() {
    const { assertions } = this.props;
    const { msg1, msg2 } = this.state;
    const minValue = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">{ assertions < minValue ? msg1 : msg2 }</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

FeedbackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(FeedbackMessage);
