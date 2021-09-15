import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import { main } from './Feedback.module.css';

const assertionsThreshold = 3;

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { score, assertions } = this.props;
    const msg = assertionsThreshold > assertions ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <main className={ main }>
        <Header />
        <section>
          <h3 data-testid="feedback-text">{msg}</h3>
          <p>
            Você fez um total de
            <span data-testid="feedback-total-score">{score}</span>
            pontos
          </p>
          <p>
            Acertou
            <span data-testid="feedback-total-question">{assertions}</span>
            questões!
          </p>
          <Link
            to="/"
          >
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          <Link
            to="/ranking"
          >
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </section>
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};
