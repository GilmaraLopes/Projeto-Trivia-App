import React, { Component } from 'react';
import './Settings.css';
import logosettings from '../imagens/logosettings.png';

class Settings extends Component {
  btnInicio = () => {
    const { history } = this.props;
    jogador(0, 0);
    history.push('/');
  };

  render() {
    return (
      <div
        className="settings"
        data-testid="settings-title"
      >
        <img className="logosettings" src={ logosettings } alt="logo-set" />
        <p className="title-config">CONFIGURAÇÕES</p>
        <select name="categoria" id="categoria">
          <option value="categoria">Categoria</option>
          <option value="historia">História</option>
          <option value="geografia">Geografia</option>
          <option value="filme">Filme</option>
        </select>
        <select name="dificuldade" id="dificuldade">
          <option value="dificuldade">Dificuldade</option>
          <option value="fácil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="difícil">Difícil</option>
        </select>
        <select name="tipo" id="tipo">
          <option value="tipo">Tipo</option>
          <option value="fácil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="difícil">Difícil</option>
        </select>

        <button
          type="button"
          className="bt-jog"
          onClick={ this.btnInicio }
        >
          JOGAR
        </button>
      </div>
    );
  }
}
export default Settings;
