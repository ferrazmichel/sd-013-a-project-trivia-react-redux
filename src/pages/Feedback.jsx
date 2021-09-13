import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  constructor() {
    super();
    this.numeroDeAcertos = this.numeroDeAcertos.bind(this);
  }

  numeroDeAcertos() {
    const { assertionsRedux } = this.props;
    const NUM = 3;
    if (assertionsRedux < NUM) return 'Podia ser melhor...';
    if (assertionsRedux >= NUM) return 'Mandou bem!';
  }

  render() {
    return (
      <>
        <HeaderFeedback />
        <p data-testid="feedback-text">{ this.numeroDeAcertos() }</p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">Ver Ranking</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsRedux: state.reducerPlacar.assertions,
});

Feedback.propTypes = {
  assertionsRedux: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
