import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Option from '../components/Option';
import { setConfigs } from '../redux/actions';
import { categories, difficulties, types } from '../data';
import './configuracoes.css';

class Configuracoes extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '0',
      difficulty: '0',
      type: '0',
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    const { dispatchConfigs } = this.props;
    dispatchConfigs(this.state);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  renderSelects() {
    const { category, difficulty, type } = this.state;
    const INDEX_ADJUSTMENT = 8;
    return (
      <>
        <select
          name="category"
          value={ category }
          onChange={ this.handleChange }
          className="form-control select mb-3 fw-bold"
        >
          { categories.map((cat, index) => (
            <Option
              key={ index }
              value={ (index === 0) ? 0 : index + INDEX_ADJUSTMENT }
              name="category"
              text={ cat }
            />
          )) }
        </select>
        <select
          name="difficulty"
          value={ difficulty }
          onChange={ this.handleChange }
          className="form-control select mb-3 fw-bold"
        >
          { difficulties.map((dif, index) => (
            <Option
              key={ index }
              value={ dif.value }
              name="difficulty"
              text={ dif.text }
            />
          ))}
        </select>
        <select
          name="type"
          value={ type }
          onChange={ this.handleChange }
          className="form-control select mb-4 fw-bold"
        >
          {
            types.map((item, index) => (
              <Option key={ index } value={ item.value } name="type" text={ item.text } />
            ))
          }
        </select>
      </>);
  }

  render() {
    return (
      <div className="container">
        <h1
          className="text-center fw-bold mb-4 title"
          data-testid="settings-title"
        >
          Configurações
        </h1>
        { this.renderSelects() }
        <Link to="/" onClick={ this.handleClick } className="btn btn-config fw-bold">
          Salvar Configurações
        </Link>
      </div>
    );
  }
}

Configuracoes.propTypes = {
  dispatchConfigs: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  dispatchConfigs: (configs) => dispatch(setConfigs(configs)),
});

export default connect(null, mapDispatchToProps)(Configuracoes);
