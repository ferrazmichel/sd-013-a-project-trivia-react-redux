import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { Alert, Badge, Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';

const MINIMAL_ASSERTIONS_TO_SUCCESS = 3;

class FeedbackPage extends Component {
  constructor() {
    super();

    this.rankingUpdate = this.rankingUpdate.bind(this);
  }

  componentDidMount() {
    this.rankingUpdate();
  }

  rankingUpdate() {
    const { player: { name, score, email } } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;

    const newRank = {
      name,
      score,
      picture,
    };
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));

    if (prevRanking) {
      localStorage.setItem('ranking', JSON.stringify([...prevRanking, newRank]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newRank]));
    }
  }

  renderSuccess() {
    return (
      <Alert variant="danger" data-testid="feedback-text" className="mt-3">
        Podia ser melhor...
      </Alert>
    );
  }

  renderFailure() {
    return (
      <Alert variant="sucess" data-testid="feedback-text" className="mt-3">
        Mandou bem!
      </Alert>
    );
  }

  renderBadge(value, textId) {
    return (
      <Badge bg="info" data-testid={ `feedback-total-${textId}` }>
        { value }
      </Badge>
    );
  }

  renderButtons() {
    return (
      <Row className="justify-content-md-center">
        <Col xs={ 12 } md={ 6 } lg={ 4 }>
          <div className="d-grid gap-2">
            <Link
              to="/"
              data-testid="btn-play-again"
              className="btn btn-outline-primary"
            >
              Play Again
            </Link>
            <Link
              to="/ranking"
              data-testid="btn-ranking"
              className="btn btn-outline-dark"
            >
              Ranking
            </Link>
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    const localState = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = localState.player;

    return (
      <>
        <Header />
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={ 12 } md={ 6 } lg={ 4 }>
              {
                (assertions < MINIMAL_ASSERTIONS_TO_SUCCESS)
                  ? this.renderSuccess()
                  : this.renderFailure()
              }
              <h2 className="mt-3">
                Pontos
                {' '}
                {this.renderBadge(score, 'score')}
              </h2>
              <h2>
                Acertos
                {' '}
                {this.renderBadge(assertions, 'question')}
              </h2>
            </Col>
          </Row>
          {this.renderButtons()}
        </Container>
      </>
    );
  }
}

export default FeedbackPage;
