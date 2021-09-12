import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class FeedbackScore extends Component {
  constructor() {
    super();
    this.numberAsserts = this.numberAsserts.bind(this);
  }

  numberAsserts() {
    const { rightQuestions } = this.props;
    if (rightQuestions === 0) {
      return (
        <div>
          <h3> Não acertou nenhuma pergunta! </h3>
        </div>
      );
    }
    return (
      <div>
        <h5>Acertos</h5>
        <h1>{ rightQuestions }</h1>
      </div>
    );
  }

  render() {
    const { finalScore } = this.props;
    return (
      <section className="text-center">
        <div>
          <h4>PONTUAÇÃO </h4>
          <h1>{ finalScore}</h1>
        </div>
        <div>
          {this.numberAsserts()}
        </div>
        <hr className="mb-4" />
        <Link to="/" className="text-decoration-none">
          <div className="row mt-1">
            <button
              className="btn btn-primary btn-lg btn-block  btn-start"
              type="button"
            >
              Jogar novamente
            </button>
          </div>
        </Link>
        <Link to="/ranking" className="text-decoration-none">
          <div className="row mt-1">
            <button
              className="btn btn-start btn-lg btn-block"
              type="button"
            >
              Ver Ranking
            </button>
          </div>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  rightQuestions: game.asserts,
  finalScore: game.score,
});

FeedbackScore.propTypes = {
  rightQuestions: PropTypes.number.isRequired,
  finalScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackScore);
