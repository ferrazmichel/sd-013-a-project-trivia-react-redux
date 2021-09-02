import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import fetchToken from '../redux/fetchs/fetchToken';

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

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.onValidation());
  }

  // Essa função vai ser executada quando clicar no botão "Jogar"
  onSubmit(event) {
    // Basicamente evita o reload de página quando der submit
    event.preventDefault();
    // Desconstrói direto do state o email e o playserName gravado
    const { email, playerName } = this.state;
    // Desconstroi o saveUser da props, criado pela mapDispatchToProps disparando a action actionSaveDataUser que vai bascicamente salvar na state o email e o playername
    const { saveUser } = this.props;
  }

  render() {
    const { email, playerName, validation } = this.state;
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

const mapDipatchToProps = (dispatch) => ({
  // A chave getToken e saveUser são as props do componente que vão ser invocados
  // E eu passo uma callback que vai ser o dispatch que vou realizar na action, no caso será a fetchToken
  // O data/payload vai conter o NOVO valor que vai ser passado e alterado na state da store
  getToken: (data) => dispatch(fetchToken(data)),
  saveUser: (data) => dispatch(actionSaveDataUser(data)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
