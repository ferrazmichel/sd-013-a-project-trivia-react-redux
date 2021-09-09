import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Performance extends React.Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <div>
          <h1>Placar Final</h1>
          <p data-testid="feedback-total-score">{score}</p>
        </div>
        <div>
          <h1>Número de perguntas certas</h1>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
  assertions: player.assertions,
});

Performance.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Performance);
