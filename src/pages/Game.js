/**
 * Representa uma partida do jogo.
 * A pessoa usuária (player) é redirecionada para esta página após o login.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Question from '../components/Question';
import { timerToggle, toggleNextButton, updateTime } from '../actions/index';
import Header from '../components/Header';

const ONE_SECOND = 1000;
const NUMBER_OF_QUESTIONS = 5;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      seconds: 30,
      intervalId: null,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.chronometer = this.chronometer.bind(this);
    this.startCronometer = this.startCronometer.bind(this);
  }

  componentDidMount() {
    this.startCronometer();
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId); // Encerra o timer ao final de uma partida do jogo
  }

  startCronometer() {
    // Será utilizado em componentWillUnmount para encerrar o timer rodando em background
    const intervalId = setInterval(() => this.chronometer(), ONE_SECOND);
    this.setState((previous) => ({ ...previous, intervalId }));
  }

  nextQuestion() {
    const { index } = this.state;
    const { enable, history } = this.props;

    enable(false);

    // Se a última questão foi respondida
    if (index === NUMBER_OF_QUESTIONS - 1) {
      history.push('/feedback'); // Redireciona
    }
    this.setState((prev) => ({ index: prev.index + 1, seconds: 30 }));
  }

  chronometer() {
    const { seconds } = this.state;
    const { /* enable, */ timerIsOn, toggleTimer } = this.props;

    if (seconds > 0) {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    } else {
      document.querySelector('#incorrect').click();
      /* enable(true); */
    }

    if (timerIsOn) {
      sessionStorage.setItem('time', JSON.stringify(seconds));
      this.setState({ seconds: 0 });
      toggleTimer(false);
    }
  }

  render() {
    const { questions, loading, answered } = this.props; // Vem da store do redux
    const { index, seconds } = this.state;

    if (loading) return <h3>Loading...</h3>;

    return (
      <>
        <Header />
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={ 12 } md={ 6 }>
              <Question key={ index } question={ questions[index] } />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={ 12 } md={ 6 }>
              {answered && (
                <div className="d-grid gap-2 mt-5">
                  <Button
                    onClick={ this.nextQuestion }
                    type="button"
                    data-testid="btn-next"
                    variant="primary"
                    size="lg"
                  >
                    Próxima pergunta
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={ 12 } md={ 6 }>
              {!answered
                && <ProgressBar now={ seconds } className="mt-5" max={ 30 } min={ 0 } />}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  enable: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  toggleTimer: PropTypes.func.isRequired,
  timerIsOn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
  timerIsOn: state.game.timerIsOn,
  answered: state.game.answered,
});

const mapDispatchToProps = (dispatch) => ({
  enable: (bool) => dispatch(toggleNextButton(bool)),
  timer: (time) => dispatch(updateTime(time)),
  toggleTimer: (time) => dispatch(timerToggle(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
