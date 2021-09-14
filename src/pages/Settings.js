import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setSettings } from '../redux/actions';
import logo from '../trivia.png';
import '../styles/Settings.css';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      difficulty: '',
      type: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    const { setParameters } = this.props;
    this.setState({
      [name]: value,
    }, () => {
      const { difficulty, type } = this.state;
      setParameters(difficulty, type);
    });
  }

  render() {
    return (
      <div className="settings">
        <div className="settings-container">
          <img src={ logo } alt="trivia logo" />
          <h1 data-testid="settings-title">
            Configurações
          </h1>
          <label htmlFor="difficulty">
            Dificuldade
            <select name="difficulty" onChange={ this.handleChange }>
              <option value="">Qualquer</option>
              <option value="easy">Fácil</option>
              <option value="medium">Médio</option>
              <option value="hard">Difícil</option>
            </select>
          </label>
          <label htmlFor="type">
            Tipo de pergunta
            <select name="type" onChange={ this.handleChange }>
              <option value="">Qualquer</option>
              <option value="multiple">Multipla escolha</option>
              <option value="boolean">Verdadeir/Falso</option>
            </select>
          </label>
          <Link to="/">
            <button
              className="btn-play"
              type="button"
            >
              JOGAR!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setParameters: (difficulty, type) => dispatch(setSettings(difficulty, type)),
});

Settings.propTypes = {
  setParameters: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
