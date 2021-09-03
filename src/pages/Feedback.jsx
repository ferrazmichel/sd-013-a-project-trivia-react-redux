import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

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
      <>
        <Header />
        <main>
          <div>
            <h3 data-testid="feedback-text">{msg}</h3>
            <p>
              Você fez um total de&nbsp;
              <span data-testid="feedback-total-score">{score}</span>
              &nbsp;pontos
            </p>
            <p>
              Acertou&nbsp;
              <span data-testid="feedback-total-question">{assertions}</span>
              &nbsp;questões!
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
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.gameReducer.score,
  assertions: state.gameReducer.assertions,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

// 39:17  error  Expected the depth of nested jsx elements to be <= 4, but found 5  react/jsx-max-depth
//  49:17  error  Expected the depth of nested jsx elements to be <= 4, but found 5  react/jsx-max-depth
