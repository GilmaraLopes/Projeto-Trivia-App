import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import logoheader from '../imagens/logoheader.png';
import estrela from '../imagens/Vector.png';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const getHash = md5(gravatarEmail).toString();
    return (
      <header>
        <img className="logo-game" src={ logoheader } alt="logo" />
        <div className="player">
          <img
            className="img-gravatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${getHash}` }
            alt="imagemPerfil"
          />
          <p
            className="play-name"
            data-testid="header-player-name"
          >
            { name }
          </p>
        </div>
        <div className="estrela">
          <img src={ estrela } alt="estrela" />
          <p
            className="play-score"
            data-testid="header-score"
          >
            { score }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
