import React from 'react';
import { Link } from 'react-router-dom';
import './ConfigPage.css';

class ConfigPage extends React.Component {
  render() {
    return (
      <div className="config">
        <h1 className="title" data-testid="settings-title">Página de configuraçao</h1>
        <label htmlFor="num">
          <span>Quantidade de perguntas:</span>
          <input type="number" name="" id="" min="0" max="10" placeholder="1" />
        </label>

        <label htmlFor="dif">
          Dificuldade:
          <select name="dif" id="dif">
            <option value="anyDif">Qualquer dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium" selected>Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </label>

        <label htmlFor="cat">
          Categoria:
          <select name="cat" id="cat">
            <option value="anyCat">Qualquer categoria</option>
            <option value="music">Música</option>
            <option value="sport" selected>Esporte</option>
            <option value="history">História</option>
            <option value="geral">Conhecimentos gerais</option>
          </select>
        </label>

        <label htmlFor="tipo">
          Tipo:
          <select name="tipo" id="tipo">
            <option value="anyType">Qualquer tipo</option>
            <option value="true">Verdadeiro ou falso</option>
            <option value="multiple">Multipla escolha</option>
          </select>
        </label>

        <Link to="/">
          <button className="btn-config" type="button">Voltar</button>
        </Link>
      </div>
    );
  }
}

export default ConfigPage;
