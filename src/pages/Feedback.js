import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Header from '../components/Header';
import { scoreAction } from '../redux/actions';
import './Feedback.css';
import logofeed from '../imagens/logofeed.png';

class Feedback extends Component {
  playAgain = () => {
    const resetScore = 0;
    const { dispatch } = this.props;
    const { history } = this.props;
    dispatch(scoreAction(resetScore));
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const NUMBER = 3;
    return (
      <>
        {/* <Header scoreType={ score } /> */}
        <div className="box-feed">
          <img className="logofeed" src={ logofeed } alt="img" />
          <div className="feedback-box">
            {(assertions >= NUMBER)
              ? <p className="good" data-testid="feedback-text">Mandou bem!</p>
              : <p className="bad" data-testid="feedback-text">Podia ser melhor... </p>}
            <p
              data-testid="feedback-total-question"
            >

              Você acertou
              {' '}
              {assertions}
              {' '}
              questões!

            </p>
            <p data-testid="feedback-total-score">
              Um total de
              {' '}
              {score}
              {' '}
              pontos
            </p>
          </div>
          <div className="bts">
            <button
              className="novamente"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
            >
              Jogar Novamente
            </button>
            <button
              className="ranking"
              type="button"
              data-testid="btn-ranking"
              onClick={ this.goToRanking }
            >
              Ver Ranking

            </button>
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
