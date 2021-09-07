import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import fetchToken from '../redux/fetchs/fetchToken';
import { actionSaveDataUser } from '../redux/actions/index';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      playerName: '',
      validation: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  onValidation() {
    const min = 3;
    const { email, playerName } = this.state;
    const validation = !(/\w+@\w+.com/.test(email)
    && playerName.length > min
    && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  // Essa função vai ser executada quando clicar no botão "Jogar"
  onSubmit(event) {
    // Basicamente evita o reload de página quando der submit
    event.preventDefault();
    // Desconstrói direto do state o email e o playserName gravado
    const { email, playerName } = this.state;
    // Desconstroi o saveUser da props, criado pela mapDispatchToProps disparando a action actionSaveDataUser que vai bascicamente salvar na state o email e o playername
    const { saveUser } = this.props;
    saveUser({ email, playerName });
    // Aponta que o redirect da state é true, ou seja, login realizado com sucesso e pagina redirecionada
    this.setState({ redirect: true });
    const state = JSON.parse(localStorage.getItem('state')) || {};
    // Renova/Grava no localStorage as informações do state conforme abaixo, com zeramento de score/pontuação e assertions/acertos
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          ...state.player,
          name: playerName,
          gravatarEmail: email,
          score: 0,
          assertions: 0,
        },
      }),
    );
  }

  handleSettings(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.onValidation();
    });
  }

  render() {
    const { token } = this.props;
    const { email, playerName, validation, redirect } = this.state;

    // Se o redirect da state for true e também tiver o token então redireciona para a página /game
    if (redirect && token) { return <Redirect to="/game" />; }

    // O componente InputCard foi criado para resolver problemas de lint na questão de tamanho de uma função
    return (
      <main className="login-main">
        {/* <h1 className="trybe-trivia">Trybe Trivia</h1> */}
        <img className="logo-trivia1" src="trybe.png" alt="" />
        <img className="logo-trivia2" src="trivia.png" alt="" />
        <br />
        <form onSubmit={ this.onSubmit }>
          <Input
            labelText="Jogador"
            id="input-player-name"
            name="playerName"
            type="text"
            value={ playerName }
            onChange={ this.onHandlerChange }
          />
          <Input
            labelText="Email"
            id="input-gravatar-email"
            name="email"
            type="texto"
            value={ email }
            onChange={ this.onHandlerChange }
          />
          <br />
          <br />
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ validation }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button data-testid="btn-settings" type="button">
              Settings
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

// A função do mapDispatchToProps é despachar action para a store, com a finalidade de alterar o state da aplicação
// A função dispatch() serve para despachar uma action para o reducer
// Recebe como parametro uma dispatch, e retorna um objeto com chave e valor
const mapDipatchToProps = (dispatch) => ({
// A chave getToken e saveUser são as props do componente que vão ser invocadas
// E eu passo uma callback que vai ser o dispatch que vou realizar na action, no caso será a fetchToken
// O data/payload vai conter o NOVO valor que vai ser passado e alterado na state da store
  getToken: (data) => dispatch(fetchToken(data)),
  saveUser: (data) => dispatch(actionSaveDataUser(data)),
});

// A função mapStateToProps mapeia as states armazenadas na store para uma props
// Ou seja, caso eu quiser acessar os dados providos pelo reducer user, como o caso abaixo, eu devo acessar o caminho do state com o reducer desejado e nomear a prop que o receberá, que no caso abaixo é a token.
const mapStateToProps = (state) => ({
  token: state.user.token,
});

// Faço a validação se os dados que recebi são válidos
Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

// O connect é responsável por fazer a conexão do meu componente Login com o mapStateToProps e o mapDispatchToProps.
export default connect(mapStateToProps, mapDipatchToProps)(Login);
