/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    const { questions } = this.props; // Vem da store do redux

    return (
      <div>
        <Header />
        {/* Por enquanto o game está mostrando as 5 perguntas.
        Implementar aqui a lógica para mostrar uma pergunta por vez. */}
        {questions.map((q, idx) => <Question key={ idx } question={ q } />)}
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Game);
