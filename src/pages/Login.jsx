import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import fetchToken from '../redux/fetchs/fetchToken';
import { actionSaveDataUser } from '../redux/actions/index';

class Login extends React.Component {
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
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.onValidation());
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
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // A chave getToken e saveUser são as props do componente que vão ser invocados
  // E eu passo uma callback que vai ser o dispatch que vou realizar na action, no caso será a fetchToken
  // O data/payload vai conter o NOVO valor que vai ser passado e alterado na state da store
  getToken: (data) => dispatch(fetchToken(data)),
  saveUser: (data) => dispatch(actionSaveDataUser(data)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

// Faço a validação se os dados que recebi são válidos
Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
