import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
