import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendUserInfo } from '../actions';
import Dropdown from '../components/Dropdown';
import { fetchURL } from '../services';

const MAX_QUESTIONS = 50;
const MIN_QUESTIONS = 5;
const categoryURL = 'https://opentdb.com/api_category.php';
const DIFFICULT = ['Easy', 'Medium', 'Hard', 'Any'];
const TYPE = ['Multiple Choice', 'True/False'];
const INITIAL_STATE = {
  options: {
    questions: MIN_QUESTIONS,
    category: '',
    difficulty: '',
    type: '',
  },
};
class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      loading: 'onMount',
      options: {
        questions: MIN_QUESTIONS,
        category: '',
        difficulty: '',
        type: '',
      },
    };
    this.handleCategories = this.handleCategories.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
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

  handleOnChange({ target: { value } }) {
    let numberOfQuestions = Number(value);
    if (numberOfQuestions >= MAX_QUESTIONS) numberOfQuestions = MAX_QUESTIONS;
    if (numberOfQuestions <= MIN_QUESTIONS) numberOfQuestions = MIN_QUESTIONS;
    this.setState((prevState) => ({
      options: { ...prevState.options, ...{ questions: numberOfQuestions } },
    }));
  }

  handleOnClick({ target: { name, value } }) {
    this.setState((prevState) => ({
      options: { ...prevState.options, ...{ [name]: value } },
    }));
  }

  resetOptions() {
    this.setState((prevState) => ({
      options: { ...prevState.options, ...INITIAL_STATE,
      },
    }), () => {
      this.props.saveConfig(this.state.options);
    });
  }

  saveOptions() {
    const { options, categories } = this.state;
    const { questions, difficulty, category, type } = this.state;
    const categoryID = categories
      .find((category) => category.contains(options.category)).id;
    const { saveConfig } = this.props;
    saveConfig({
      options: {
        questions, difficulty, category: categoryID, type,
      },
    });
  }

  render() {
    const { categories, loading, options } = this.state;
    const { category, difficulty, type } = options;
    const { history, saveConfig } = this.props;
    return (
      <div className="config-main">
        <h1 data-testid="settings-title" className="config-title">SETUP ⚙</h1>
        { loading && (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">...</span>
          </div>)}
        { categories && (
          <div className="config-dropdown">
            <Dropdown onClick={ this.handleOnClick } title="Category" nameBtn={ category || 'Category' } options={ categories } />
            <Dropdown onClick={ this.handleOnClick } title="Difficulty" nameBtn={ difficulty || 'Difficulty' } options={ DIFFICULT } />
            <Dropdown onClick={ this.handleOnClick } title="Type" nameBtn={ type || 'Type' } options={ TYPE } />
            <div className="form-outline">
              <label className="form-label" htmlFor="typeNumber">
                <h2>Questions</h2>
                <input
                  type="number"
                  id="typeNumber"
                  className="form-control"
                  value={ options.numberOfQuestions }
                  onChange={ this.handleOnChange }
                  min={ MIN_QUESTIONS }
                  max={ MAX_QUESTIONS }
                />
              </label>
            </div>
            <div className="config-btn-holder">
              <button type="button" onClick={ this.saveOptions }> SAVE </button>
              <button type="button" onClick={ this.resetOptions }> RESET </button>
              <button type="button" onClick={ () => history.push('/') }> BACK </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveConfig: (payload) => dispatch(sendUserInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Config);
