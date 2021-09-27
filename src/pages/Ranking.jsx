import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.rankingTeste = this.rankingTeste.bind(this);
  }

  componentDidMount() {
    this.rankingTeste();
  }

  rankingTeste() {
    const arrayStorage = JSON.parse(localStorage.getItem('rankin'));
    const arrayStrg = arrayStorage.map((item) => (item));
    const arrayOrdenado = arrayStrg.sort((a, b) => (b.score - a.score));
    console.log(arrayOrdenado);
    return arrayOrdenado.map((array, index) => (
      <div className="list-ranking" key={ index }>
        <div className="indice">
          <p>{(index) + 1}</p>
          <img src={ `https://www.gravatar.com/avatar/${md5(array.email).toString()}` } alt="imagem" />
        </div>
        <p data-testid={ `player-name-${index}` }>{array.nome}</p>
        <p data-testid={ `player-score-${index}` }>{array.score}</p>
      </div>
    ));
  }

  render() {
    return (
      <>
        <h1 className="title-ranking" data-testid="ranking-title"> Página de Ranking </h1>
        <div className="countainer-ranking">
          {this.rankingTeste()}
        </div>
        <Link to="feedback">
          <button className="btn-ranking" type="button">Voltar</button>
        </Link>
        <Link to="/">
          <button
            className="btn-ranking"
            type="button"
            data-testid="btn-go-home"
          >
            Go Home
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
