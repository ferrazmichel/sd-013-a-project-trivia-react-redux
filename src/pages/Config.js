import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendUserInfo } from '../actions';
import Dropdown from '../components/Dropdown';
import { fetchURL } from '../services';

const MAX_QUESTIONS = 50;
const categoryURL = 'https://opentdb.com/api_category.php';
const DIFFICULT = ['Easy', 'Medium', 'Hard', 'Any'];
const TYPE = ['Multiple Choice', 'True/False'];
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      loading: 'onMount',
      options: {
        numberOfQuestions: 5,
        category: '',
        difficulty: '',
        type: '',
      },
    };
    this.handleCategories = this.handleCategories.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories() {
    // console.log('before Fetch', this.state.loading);
    // console.log('before Fetch categories =', this.state.categories);
    this.setState({ loading: true }, async () => {
      this.setState({ categories: (await fetchURL(categoryURL)).trivia_categories });
      this.setState({ loading: false });
      // console.log('after Fetch', this.state.loading);
      // console.log('after Fetch categories =', this.state.categories);
    });
  }

  handleOnChange(e) {
    if (Number(e.target.value) >= MAX_QUESTIONS) e.target.value = MAX_QUESTIONS;
    this.setState((prevState) => ({ ...prevState.options, ...{ numberOfQuestions: MAX_QUESTIONS } }));
  }

  render() {
    const { categories, loading } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        { loading && (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">...</span>
          </div>)}
        { categories && (
          <div>
            <Dropdown onClick={ (e) => console.log(e.target.name) } nameBtn="Categoria" options={ categories } />
            <Dropdown onClick={ (e) => console.log(e.target.name) } nameBtn="Dificuldade" options={ DIFFICULT } />
            <Dropdown onClick={ (e) => console.log(e.target.name) } nameBtn="Tipo" options={ TYPE } />
            <div className="form-outline">
              <label className="form-label" htmlFor="typeNumber">
                Number input
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  value="5"
                  onChange={ this.handleOnChange }
                  min="5"
                  max="50"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendUserConfig: (payload) => dispatch(sendUserInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Config);
