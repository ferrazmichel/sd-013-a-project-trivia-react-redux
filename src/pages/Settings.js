import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveSettings } from '../actions';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      trivia_category: '',
      trivia_type: '',
      trivia_difficulty: '',
    };
    this.category = this.category.bind(this);
    this.selectTypes = this.selectTypes.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
  }

  selectTypes({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveConfig() {
    const { config } = this.props;

    config(this.state);
    const { history } = this.props;
    history.push('/');
  }

  category() {
    return (
      <label htmlFor="trivia_category">
        Select Category:
        <select name="trivia_category" onClick={ this.selectTypes }>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">TELA DE CONF</h1>
        {this.category()}
        <label htmlFor="trivia_difficulty">
          Select Difficulty:
          <select name="trivia_difficulty" onClick={ this.selectTypes }>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="trivia_type">
          Select Type:
          <select name="trivia_type" onClick={ this.selectTypes }>
            &gt;
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <button onClick={ this.saveConfig } type="button">Salvar Configurações</button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  config: (payload) => dispatch(saveSettings(payload)),
});
Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Settings);
