import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { updateConfig } from '../redux/actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      category: 'any',
      nQuestions: '5',
      diff: 'any',
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectDiff = this.selectDiff.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
    this.selectNumberQts = this.selectNumberQts.bind(this);
    this.formCategory = this.formCategory.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  saveConfig(e) {
    e.preventDefault();
    const { handleSubmit, history } = this.props;
    const { category, nQuestions, diff } = this.state;
    handleSubmit({ category, nQuestions, diff });
    history.push('/');
  }

  selectNumberQts() {
    return (
      <div className="row">
        <label htmlFor="trivia_number-questions">
          <h5>Números de Questões</h5>
          <select
            name="nQuestions"
            id="trivia_number-questions"
            className="form-control"
            onChange={ this.handleChange }
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    );
  }

  selectDiff() {
    return (
      <div className="row">
        <label htmlFor="form-diff-questions">
          <h5>Números de Questões</h5>
          <select
            name="diff"
            id="form-diff-questions"
            className="form-control"
            onChange={ this.handleChange }
          >
            <option value="any">Qualquer Dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium">Normal</option>
            <option value="hard">Díficil</option>
          </select>
        </label>
      </div>
    );
  }

  formCategory() {
    return (
      <div className="row">
        <label htmlFor="trivia_category">
          <h5>Qualquer Categoria</h5>
          <select
            name="category"
            id="trivia_category"
            className="form-control"
            onChange={ this.handleChange }
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Books  </option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="13">Musicals &amp; Theatres</option>
            <option value="14">Television</option>
            <option value="15">Video Games</option>
            <option value="16">Board Games</option>
            <option value="17">Nature</option>
            <option value="18">Computers</option>
            <option value="19">Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Comics</option>
            <option value="30">Gadgets</option>
            <option value="31">Japanese Anime &amp; Manga</option>
            <option value="32">Cartoon &amp; Animations</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    return (
      <section className="container-fluid text-center ranking-page">
        <br />
        <div className="row col-md-5 shadow mx-auto p-2 btn-primary mt-2">
          <div className="d-flex align-items-baseline justify-content-around">
            <h1><span role="img" aria-label="gear-emoji">⚙️</span></h1>
            <h1>Configurações</h1>
          </div>
          <hr className="mb-3" />
          <form action="submit">
            { this.selectNumberQts() }
            { this.formCategory() }
            { this.selectDiff() }
          </form>
          <hr className="mb-3 mt-3" />
          <div className="row mx-auto">
            <button
              type="submit"
              onClick={ this.saveConfig }
              className="btn btn-start btn-lg btn-block"
            >
              SALVAR CONFIGURAÇÕES
            </button>

            <Link to="/" className="text-decoration-none">
              <div className="row mt-1">
                <button
                  className="btn btn-start btn-lg btn-block"
                  type="button"
                >
                  VOLTAR
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (data) => dispatch(updateConfig(data)),
});

Settings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
