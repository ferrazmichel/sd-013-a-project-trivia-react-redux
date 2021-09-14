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
    const { assertionsRedux, scoreTotal } = this.props;

    return (
      <>
        <HeaderFeedback />
        <p data-testid="feedback-text">{ this.numeroDeAcertos() }</p>

        <p>
          Placar Total:
          <span data-testid="feedback-total-score">{scoreTotal}</span>
        </p>

        <p>
          Número de Acertos:
          <span data-testid="feedback-total-question">{assertionsRedux}</span>
        </p>

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
  scoreTotal: state.reducerPlacar.score,
});

Feedback.propTypes = {
  assertionsRedux: PropTypes.number.isRequired,
  scoreTotal: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
