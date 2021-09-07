import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedbacks extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { textContent } }) {
    const { history } = this.props;

    if (textContent === 'Ver Ranking') {
      history.push('/ranking');
    }

    if (textContent === 'Jogar Novamente') {
      history.push('/gamepage');
    }
  }

  render() {
    const { correctAnswers, score } = this.props; // Vem do estado do Redux
    const WELL_PLAYED = 3;
    const questionX = (correctAnswers === 1 ? 'questão' : 'questões');

    return (
      <div>
        <Header />
        <section>
          <p data-testid="feedback-text">
            {correctAnswers >= WELL_PLAYED ? 'Mandou bem!' : 'Poderia ser melhor...'}
          </p>
          <p data-testid="feedback-total-question">
            {`Você acertou ${correctAnswers} ${questionX} de 5`}
          </p>
          <p data-testid="feedback-total-score">
            {`Você marcou ${score} pontos no total!`}
          </p>
          <div className="button-container">
            <Button
              dataTestId="btn-play-again"
              name="Jogar Novamente"
              onClick={ this.handleClick }
            />
            <Button
              dataTestId="btn-ranking"
              name="Ver Ranking"
              onClick={ this.handleClick }
            />
          </div>
        </section>
      </div>
    );
  }
}

Feedbacks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  correctAnswers: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.results.score,
  correctAnswers: state.results.correctAnswers,
});

export default connect(mapStateToProps, null)(Feedbacks);
