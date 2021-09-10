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
      saveEnabled: false,
      type: '',
    };

    this.getCategoriesOptions = getCategoriesOptions.bind(this);
    this.getDifficultiesOptions = getDifficultiesOptions.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleClickCancel = handleClickCancel.bind(this);
    this.handleClickSave = handleClickSave.bind(this);
    this.mountCategories = mountCategories.bind(this);
    this.mountSettings = mountSettings.bind(this);
  }

  componentDidMount() {
    const categories = fetchCategories();
    const { props: { storedSetting } } = this;
    mountCategories(categories);
    this.mountSettings(storedSetting);
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
      saveEnabled: true,
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

  mountSettings(storedSetting) {
    const { difficulty, type, category } = storedSetting;
    this.setState({
      difficulty,
      type,
      category,
    });
  }

  render() {
    const { category, difficulty, type, saveEnabled } = this.state;
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
          disabled={ saveEnabled }
          name="Salvar e Sair"
          onClick={ this.handleClickSave }
        />
        <Button
          className="btn-not-save-config"
          disabled="false"
          name="Sair sem Salvar"
          onClick={ this.handleClickCancel }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setConfigs: (thisConfig) => dispatch(changeSettings(thisConfig)),
});

const mapStateToProps = (state) => ({
  storeSetting: state.gameSettings,
});

Configurations.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setConfigs: PropTypes.func,
  storedSetting: PropTypes.shape({
    cattegory: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Configurations);
