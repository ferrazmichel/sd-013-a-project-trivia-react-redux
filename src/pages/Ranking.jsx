import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

const numberRanking = 10;

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      score: [],
    };

    this.loadRanking = this.loadRanking.bind(this);
  }

  componentDidMount() {
    this.loadRanking();
  }

  loadRanking() {
    const ranking = JSON.parse(localStorage.ranking);
    const rankingUppdate = [...ranking].slice(0, numberRanking);
    this.setState({ score: rankingUppdate });
  }

  render() {
    const { score } = this.state;

    return (
      <section className="container-fluid text-center">
        <div className="row col-md-5 shadow mx-auto p-5 bg-white mt-5">

          <h1>Ranking</h1>
          {
            score.map((jogador, index) => (
              <section key={ index }>
                <h5>{ index + 1}</h5>
                <img
                  src={ `https://www.gravatar.com/avatar/${md5(jogador.gravatarEmail).toString()}` }
                  alt={ jogador.name }
                  className="rounded-circle border border-white"
                />
                <span>{`${jogador.name}`}</span>
                <span>{jogador.score}</span>
              </section>))
          }
          <Link to="/">
            <div className="row mt-1">
              <button
                className="btn btn-primary btn-lg btn-block"
                type="button"
              >
                Início
              </button>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}
export default Ranking;
