import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import './Game.css';
import { ReactComponent as ReactLogo } from '../files/trybelogo.svg';

const numberRanking = 10;

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      score: [],
    };

    this.loadRanking = this.loadRanking.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.loadRanking();
  }

  test() {
    const { score } = this.state;

    return score.map((jogador, index) => (
      <section
        className="row mb-1 align-items-baseline border border-white btn-start"
        key={ index }
      >
        <div className="col">
          { index + 1}
        </div>
        <div className="col">
          <img
            src={ `https://www.gravatar.com/avatar/${md5(jogador.gravatarEmail).toString()}` }
            alt={ jogador.name }
            className="rounded-circle border border-white mb-2 mt-2"
            width="50"
          />
        </div>
        <div className="col align-items-center">
          {`${jogador.name}`}
        </div>
        <div className="col">
          {jogador.score}
        </div>
      </section>));
  }

  loadRanking() {
    const ranking = JSON.parse(localStorage.ranking);
    const rankingUppdate = [...ranking].slice(0, numberRanking);
    this.setState({ score: rankingUppdate });
  }

  render() {
    return (
      <section className="container-fluid text-center ranking-page">
        <br />
        <div className="row col-md-5 shadow mx-auto p-2 btn-primary mt-2">
          <div className="d-flex align-items-baseline justify-content-around">
            <ReactLogo />
            <h1>Ranking</h1>
          </div>
          <hr className="mb-3" />
          <div className="row justify-content-center mx-auto">
            <section className="row mb-1 align-items-center">
              <div className="col">
                Top
              </div>
              <div className="col">Avatar</div>
              <div className="col align-items-center">Nome</div>
              <div className="col">Score</div>
            </section>
            <hr className="mb-4" />
            { this.test() }
          </div>
          <Link to="/" className="text-decoration-none">
            <div className="row mt-1">
              <button
                className="btn btn-start btn-lg btn-block"
                type="button"
              >
                Início
              </button>
            </div>
          </Link>
        </div>
        <br />
      </section>
    );
  }
}
export default Ranking;
