import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import InputCard from '../components/InputCard';
import Select from '../components/Select';
import { actionAddSetting } from '../redux/actions/index';

class Settings extends Component {
  constructor(props) {
    super(props);

    // State inicial vai ser as chaves abaixo
    this.state = {
      error: '',
      categoriesData: [],
      category: 'General Knowledge',
      loading: true,
      amount: 5,
      difficulty: 'any difficulty',
      type: 'any type',
    };

    // As funções abaixo serão habilitadas para serem usadas em todo o componente/page
    this.getCategory = this.getCategory.bind(this);
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.addSetting = this.addSetting.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  onHandlerChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  getCategory() {
    this.setState({ loading: true }, async () => {
      const resp = await fetch('https://opentdb.com/api_category.php');
      if (!resp.ok) this.setState({ error: 'ocorreu um erro com a requisição' });
      const { trivia_categories: categoriesData } = await resp.json();
      this.setState({ categoriesData, loading: false });
    });
  }

  addSetting() {
    const { dispatchSetting } = this.props;
    const { category, categoriesData, amount, difficulty, type } = this.state;
    const { id } = categoriesData.find(({ name }) => name === category);
    dispatchSetting({ id, amount, difficulty, type });
  }
