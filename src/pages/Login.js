import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import getToken from '../services/fetchToken';
import { requestEmail } from '../redux/actions';
import './Login.css';
import logo from '../imagens/logo.png';

const INITIAL_STATE = {
  name: '',
  email: '',
  btnDisable: true,
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validationLogin);
  };

  validationLogin = () => {
    const { email, name } = this.state;
    const validationEmail = /^.{3,}$/;
    const validationName = /^.{3,}$/;
    if (validationEmail.test(email) && validationName.test(name)) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  };

  startGame = async () => {
    const { history, dispatch } = this.props;
    const { email, name, score } = this.state;
    const data = await getToken();
    localStorage.setItem('token', data.token);
    dispatch(requestEmail(email, name, score));
    history.push('/jogodetrivia');
  };

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisable } = this.state;
    return (
      <div className="box-login">
        <img className="logo" src={ logo } alt="logo" />
        <form className="form">
          <label htmlFor="name">
            <input
              className="input-name"
              type="text"
              data-testid="input-player-name"
              id="name"
              name="name"
              value={ name }
              placeholder="Qual o seu nome?"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="email">

            <input
              className="input-email"
              type="email"
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              value={ email }
              placeholder="Qual o seu email?"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="bt-play"
            data-testid="btn-play"
            type="button"
            disabled={ btnDisable }
            onClick={ this.startGame }
          >
            PLAY
          </button>
          <button
            className="bt-config"
            data-testid="btn-settings"
            type="button"
            onClick={ this.btnSettings }
          >
            CONFIGURAÇÕES
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.payload,
});

export default connect(mapStateToProps)(Login);
