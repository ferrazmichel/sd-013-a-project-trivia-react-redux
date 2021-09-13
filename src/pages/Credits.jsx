import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactLogo from '../files/trybelogo.svg';

class Credits extends Component {
  integrants() {
    return (
      <div>
        <h4>Projeto Realizado pelo Grupo 23</h4>
        <h5
          data-toggle="tooltip"
          data-placement="top"
          title="Clique para acessar o Githu!"
        >
          <a className="text-decoration-none text-white" href="https://github.com/marlondlacerda" rel="noopener noreferrer" target="_blank">
            MARLON LACERDA
          </a>
        </h5>
        <h5
          data-toggle="tooltip"
          data-placement="top"
          title="Clique para acessar o Githu!"
        >
          <a className="text-decoration-none text-white" href="https://github.com/LuizFJP" rel="noopener noreferrer" target="_blank">
            LUIZ PORTELA
          </a>
        </h5>
        <h5
          data-toggle="tooltip"
          data-placement="top"
          title="Clique para acessar o Githu!"
        >
          <a className="text-decoration-none text-white" href="https://github.com/icarofgomes" rel="noopener noreferrer" target="_blank">
            ICARO FERREIRA
          </a>
        </h5>
        <h5
          data-toggle="tooltip"
          data-placement="top"
          title="Clique para acessar o Githu!"
        >
          <a className="text-decoration-none text-white" href="https://github.com/rene-t13-trybe" rel="noopener noreferrer" target="_blank">
            CLEYTON RENÊ
          </a>
        </h5>
      </div>
    );
  }

  render() {
    return (
      <section className="container-fluid text-center ranking-page">
        <br />
        <div className="row col-md-5 shadow mx-auto p-2 btn-primary mt-2">
          <div className="d-flex align-items-baseline justify-content-around">
            <img src={ ReactLogo } alt="React Logo" />
            <h1 className>CREDITS</h1>
          </div>
          <hr className="mb-3" />
          { this.integrants() }
          <hr className="mb-3" />
          <div>
            <h4>O que foi aprendido nesse projeto:</h4>
            <li>Organização e trabalho em grupo.</li>
            <li>Prática de React, React-Redux, Github.</li>
            <li>
              Criar um store, reducers, actions
              e dispatchers Redux em aplicações React.
            </li>
            <li>Conectar Redux aos componentes React.</li>
            <li>
              Criar actions assíncronas na sua aplicação
              React que faz uso de Redux.
            </li>
          </div>
          <hr className="mb-3" />
          <div>
            <h4>Librarys:</h4>
            <h5 className="btn-start">
              <a className="text-decoration-none" href="https://github.com/mdevils/html-entities" rel="noopener noreferrer" target="_blank">html-entities</a>
            </h5>
            <h5 className="btn-start">
              <a className="text-decoration-none text-white" href="https://www.npmjs.com/package/react-sound" rel="noopener noreferrer" target="_blank">react-sound</a>
            </h5>
            <h5 className="btn-start">
              <a className="text-decoration-none" href="https://www.npmjs.com/package/react-countdown-circle-timer" rel="noopener noreferrer" target="_blank">React Countdown Circle Timer</a>
            </h5>
          </div>
          <hr className="mb-2" />
          <Link to="/" className="text-decoration-none">
            <div className="row mt-1">
              <button
                className="btn btn-start btn-lg btn-block"
                type="button"
              >
                VOLTAR
              </button>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}

export default Credits;
