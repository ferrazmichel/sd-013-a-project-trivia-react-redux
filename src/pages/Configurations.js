import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { changeSettings } from '../redux/actions';
import fetchCategories from '../services/fetchCategories';
import Button from '../components/Button';
import Select from '../components/Select';

class Configurations extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      saveDisabled: true,
      type: '',
    };

    this.getCategoriesOptions = this.getCategoriesOptions.bind(this);
    this.getDifficultiesOptions = this.getDifficultiesOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.mountCategories = this.mountCategories.bind(this);
    this.mountSettings = this.mountSettings.bind(this);
  }

  async componentDidMount() {
    const categories = await fetchCategories();
    const { storedSettings } = this.props;
    this.mountCategories(categories);
    this.mountSettings(storedSettings);
  }

  getCategoriesOptions() {
    const { categories } = this.state;

    return categories
      .map(({ id, name }) => (<option key={ id } value={ id }>{ name }</option>));
  }

  getDifficultiesOptions() {
    return ['easy', 'medium', 'hard'].map((difficultyOption, index) => (
      <option key={ index } value={ difficultyOption }>{ difficultyOption }</option>));
  }

  getTypeOptions() {
    const types = [{ type: 'multiple', name: 'Múltipla Escolha' },
      { type: 'boolean', name: 'Verdadeiro/Falso' }];
    return types.map((obj, index) => (
      <option key={ index } value={ obj.type }>{ obj.name }</option>
    ));
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
      saveDisabled: false,
    });
  }

  handleClickCancel() {
    const { history } = this.props;
    history.push('/');
  }

  handleClickSave() {
    const { category, difficulty, type } = this.state;
    const { setConfigs, history } = this.props;
    const thisConfig = { category, difficulty, type };
    setConfigs(thisConfig);
    history.push('/');
  }

  mountCategories(categories) {
    this.setState({
      categories,
    });
  }

  mountSettings(storedSettings) {
    const { difficulty, type, category } = storedSettings;
    this.setState({
      difficulty,
      type,
      category,
    });
  }

  render() {
    const { category, difficulty, type, saveDisabled } = this.state;
    const categoriesOptions = this.getCategoriesOptions();
    const difficultiesOptions = this.getDifficultiesOptions();
    const types = this.getTypeOptions();
    return (
      <>
        <Header />
        <Select
          classe="select-categories"
          id="category"
          labelName="Categorias"
          name="category"
          onChange={ this.handleChange }
          options={ categoriesOptions }
          value={ category }
        />
        <Select
          classe="select-difficulties"
          id="difficulty"
          labelName="Dificuldade"
          name="difficulty"
          onChange={ this.handleChange }
          options={ difficultiesOptions }
          value={ difficulty }
        />
        <Select
          classe="select-types"
          id="type"
          labelName="Tipo"
          name="type"
          onChange={ this.handleChange }
          options={ types }
          value={ type }
        />
        <Button
          className="btn-save-config"
          disabled={ saveDisabled }
          name="Salvar e Sair"
          onClick={ this.handleClickSave }
        />
        <Button
          className="btn-not-save-config"
          name="Sair sem Salvar"
          onClick={ this.handleClickCancel }
        />
      </>
    );
  }
}

Configurations.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setConfigs: PropTypes.func,
  storedSettings: PropTypes.shape({
    cattegory: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setConfigs: (thisConfig) => dispatch(changeSettings(thisConfig)),
});

const mapStateToProps = (state) => ({
  storedSettings: state.gameSettings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Configurations);
