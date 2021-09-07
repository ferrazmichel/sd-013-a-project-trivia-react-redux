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
