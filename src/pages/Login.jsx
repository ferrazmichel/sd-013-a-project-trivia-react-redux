import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import fetchToken from '../redux/fetchs/fetchToken';
import { actionSaveDataUser } from '../redux/actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // State inicial vai ser as chaves abaixo:
    this.state = {
      email: '',
      playerName: '',
      validation: true,
      redirect: false,
    };

    // As funções abaixo serão habilitadas para serem usadas em todo o componente/page
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

    // Para validação:
    // -> Valida se é email
    // -> Valida se o nome do jogador tem no mínimo 3 caracteres
    // -> Valida nome jogador tem caracteres de A-z
    const validation = !(/\w+@\w+.com/.test(email)
    && playerName.length > min
    && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  // Essa função vai ser executada quando clicar no botão "Jogar"
  onSubmit(event) {
    console.log('teste')
    // Basicamente evita o reaload de página quando der submit
    event.preventDefault();
    // Desconstrói direto do state o email e o playerName gravado
    const { email, playerName } = this.state;
    // Desconstrói o saveUser da props, criado pela mapDipatchToProps disparando a action actionSaveDataUser que vai basicamente salvar na state o email e o playerName
    const { saveUser } = this.props;
    saveUser({ email, playerName });
    // Aponta que o redirect da state é true, ou seja, login realizado com sucesso e pagina redirecionada
    this.setState({ redirect: true });
    console.log('Li aqui');
    // Busca no localStorage todas as informações que tem no state.
    // Para não dar undefined eu coloquei || {} para retornar objeto vazio
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

  // Tudo que for digitado nos campos, é alterado automaticamente na state
  // Conforme for digitando e guardando na state, o loginValidation é executado assíncrono, para ter uma validação instantânea conforme digitação
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.onValidation();
    });
  }

  render() {
    const { token } = this.props;
    const { email, playerName, validation, redirect } = this.state;

    // Se o redirect da state for true e também tiver o token então redireciona para a pagina /game
    if (redirect && token) { return <Redirect to="/game" />; }

    return (
      <form>
        <Input
          labelText="jogador"
          testid="input-player-name"
          name="playerName"
          type="text"
          value={ playerName }
          onChange={ this.handleChange }
        />
        <Input
          labelText="email"
          testid="input-gravatar-email"
          name="email"
          type="text"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ validation }
          onClick={ this.onSubmit }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

// A função do mapDispatchToProps é despachar action para a store, com a finalidade de alterar o state da aplicação
// A função dispatch() serve para despachar uma action para o reducer
// Recebe como parametro uma dispatch, e retorna um objeto com chave e valor
const mapDispatchToProps = (dispatch) => ({
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
  getToken: PropTypes.func,
  saveUser: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
