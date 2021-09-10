import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitQuestions } from '../redux/actions/fetchActions';
// import { fetchQuestions, categoriesList } from '../pages/pageFunctions/gameFuncs';
import Button from './Button';
import Select from './Select';

const random = 'random';
// const randomState = {
//   category: 'Random',
//   difficulty: 'Random',
//   type: 'Random',
//   randomGame: true,
// };

class Category extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      category: 'General Knowledge',
      difficulty: 'easy',
      type: 'boolean',
      randomGame: true,
    };

    this.setCategoriesList = this.setCategoriesList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchGameApi = this.fetchGameApi.bind(this);
    // this.randomGame = this.randomGame.bind(this);
  }

  async componentDidMount() {
    await this.setCategoriesList();
  }

  async setCategoriesList() {
    this.setState({
      categories: await categoriesList(),
    });
  }

  async handleChange({ target: { value, name } }) {
    await this.setState({
      [name]: value,
      randomGame: false,
    });
  }

  verifyRandomGame({ randomGame }) {
    if (randomGame) {
      return true;
    }
    return false;
  }

  randomGame() {
    this.setState({
      randomGame: true,
    });

    console.log('random game');
  }

  async fetchGameApi() {
    const { questions } = this.props;
    const ifIsRandomGame = await this.verifyRandomGame(this.state);
    if (ifIsRandomGame) {
      const request = await fetchQuestions(random);
      console.log(request);
      questions(request);
    } else if (!ifIsRandomGame) {
      const request = await fetchQuestions(this.state);

      return questions(request);
    }
  }

  render() {
    const { categories, category, difficulty, type } = this.state;
    return (
      <section>
        <Select
          id="select-category"
          name="category"
          labelText="Escolha a categoria: "
          options={ categories }
          onChange={ this.handleChange }
        />
        <Select
          id="select-difficulty"
          name="difficulty"
          labelText="Escolha a dificuldade: "
          options={ ['easy', 'medium', 'hard'] }
          value={ difficulty }
          onChange={ this.handleChange }
        />
        <Select
          id="select-question-type"
          name="type"
          labelText="Escolha o tipo de categoria: "
          options={ ['boolean', 'multiple'] }
          value={ type }
          onChange={ this.handleChange }
        />
        <Button
          id="submit"
          onClick={ () => this.fetchGameApi() }
          text="Iniciar Jogo"
        />
        <Button
          id="submit"
          onClick={ () => this.randomGame() }
          text="Random Game"
        />
        { category ? (
          <h2
            data-testid="question-category"
          >
            { category }
          </h2>
        ) : null }
      </section>
    );
  }
}

const { func } = PropTypes;

Category.propTypes = {
  questions: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  questions: (payload) => dispatch(submitQuestions(payload)),
});

export default connect(null, mapDispatchToProps)(Category);
