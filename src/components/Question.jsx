/* eslint-disable react/jsx-closing-tag-location */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {} from '../redux/actions/saveCurPlayerScore';
import { fetchQuestions } from '../redux/actions/fetchActions';
import Answers from './Answers';

class Question extends React.Component {
  constructor() {
    super();

    this.state = { id: 0, activateOn: true, hide: false };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token } = this.props;

    getQuestions(token);
  }

  disableButton() {
    // essa função habilita o botão próximo quando a questão é selecionada
    this.setState({ activateOn: false, hide: true });
  }

  nextQuestion() {
    // vai incrementando até a quantidade de perguntas, falta fazer a
    // lógica de manda para a página de feedback
    // e reseta o time de volta para 30 segundos
    this.setState((id) => ({
      id: id.id + 1,
      activateOn: true,
    }));
  }

  renderQuestions(question) {
    const answers = [question.correct_answer, ...question.incorrect_answers].sort();
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.correct_answer}</p>
        <div>
          <Answers
            answers={ answers }
            correctAnswer={ question.correct_answer }
            // a função foi enviada como prop
            funcDisable={ this.disableButton }
          />
        </div>
      </div>
    );
  }

  renderButton() {
    const { activateOn } = this.state;
    return (
      <button
        type="button"
        disabled={ activateOn }
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
  }

  // FALTA REMOVER O BUG DAS CORES E RESETAR O TIME QUANDO CLICAR EM PRÓXIMO

  render() {
    const { questions } = this.props;
    const { id, hide } = this.state;
    const questionMap = questions.map((question) => this.renderQuestions(question));

    if (questions.length === 0) return <p>Loading...</p>;
    return (
      <div>
        <div>
          {questionMap[id]}
        </div>
        { hide ? this.renderButton() : null }
      </div>
    );
  }
}

Question.propTypes = {
  getQuestions: PropTypes.func,
  questions: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.fetchReducer.questions,
  token: state.fetchReducer.userToken,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(fetchQuestions(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
