// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getTrivia from '../services/fetchTrivia';
import { rightAnswer, scoreAction } from '../redux/actions';
import { pegaJogadorStorage, salvaJogadorStorage } from '../services/gameStorage';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestion: 0,
      color: false,
      timer: 30,
      correctAnswers: 0,
      sortedAnswers: [],
      singleAnswer: [],
      jogadores: [],
    };
  }

  componentDidMount() {
    this.renderQuestions();
    this.myTimer();
    this.pegaJogador();
  }

  renderQuestions = async () => {
    const { history } = this.props;
    const getToken = localStorage.getItem('token');
    const response = await getTrivia(getToken);
    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: response.results,
    }, () => {
      this.randomizeAnswers();
    });
  };

  myTimer = () => {
    const seconds = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((prev) => ({
          timer: prev.timer > 0 ? prev.timer - 1 : 0,
        }));
      }
    }, seconds);
  };

  clickNext = () => {
    const { history } = this.props;
    const FOUR = 4;
    this.setState((prev) => ({
      indexQuestion: (prev.indexQuestion + 1),
      timer: 30,
      color: false,
    }), () => {
      const { indexQuestion, sortedAnswers } = this.state;
      if (indexQuestion > FOUR) {
        this.adicionaJogador();
        history.push('/feedback');
      }
      this.setState({
        singleAnswer: sortedAnswers[indexQuestion],
      });
    });
  };

  randomizeAnswers = () => {
    const NUMBER = 0.5;
    const { questions } = this.state;
    // console.log(questions);
    const answer = questions.map((e) => [...e.incorrect_answers, e.correct_answer]);
    // console.log(answer);
    answer.forEach((e) => e.sort(() => Math.random() - NUMBER));
    this.setState({
      sortedAnswers: answer,
      singleAnswer: answer[0],
    });
  };

  mudarCor = (el, e) => (
    el === e.correct_answer
      ? '3px solid rgb(6, 240, 15)' : '3px solid red');

  calcScore = () => {
    const { indexQuestion, timer, questions } = this.state;
    const { dispatch, score } = this.props;
    const points = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (questions[indexQuestion].difficulty === 'easy') {
      return dispatch(scoreAction((score + points + (timer * easy))));
    }
    if (questions[indexQuestion].difficulty === 'medium') {
      return dispatch(scoreAction((score + points + (timer * medium))));
    }
    if (questions[indexQuestion].difficulty === 'hard') {
      return dispatch(scoreAction((score + points + (timer * hard))));
    }
  };

  clickAnswer = ({ target }) => {
    const answer = target.value;
    this.setState({
      color: true,
    });
    if (answer === 'correct') {
      this.calcScore();
      this.setState({
        correctAnswers: 1,
      }, () => {
        const { dispatch } = this.props;
        const { correctAnswers } = this.state;
        dispatch(rightAnswer(correctAnswers));
      });
    }
  };

  adicionaJogador = () => {
    const numero = 4;
    const { name, email, score } = this.props;
    const { jogadores, indexQuestion } = this.state;
    const objJogador = { name, email, score };
    if (indexQuestion >= numero) salvaJogadorStorage([...jogadores, objJogador]);
  };

  pegaJogador = () => {
    const jogadores = pegaJogadorStorage();
    if (jogadores) this.setState({ jogadores });
  };

  render() {
    const {
      questions, localScore, singleAnswer, color, timer, indexQuestion } = this.state;
    // console.log(singleAnswer);
    if (questions.length === 0) {
      return (
        <Header />
      );
    }
    return (
      <>
        <Header scoreType={ localScore } />
        {questions.map((e, i) => {
          if (i === indexQuestion) {
            return (
              <div className="box-quiz">

                <div key={ i }>
                  <div className="perguntas">
                    <p
                      // style={ color }
                      data-testid="question-category"
                    >
                      { e.category }

                    </p>
                    <p className="question" data-testid="question-text">{ e.question }</p>
                    <p className="timer">
                      { timer }
                    </p>
                  </div>
                  <div className="respostas" data-testid="answer-options">
                    {(singleAnswer).map((el, index) => (
                      <button
                        className="bt-resposta"
                        onClick={ this.clickAnswer }
                        disabled={ timer <= 0 }
                        type="button"
                        key={ index }
                        value={
                          el === e
                            .correct_answer ? 'correct' : 'incorrect'
                        }
                        data-testid={ el === e.correct_answer
                          ? 'correct-answer' : `wrong-answer-${index}` }
                        style={ {
                          border: color && (this.mudarCor(el, e)),

                        } }
                      >
                        { el }

                      </button>
                    ))}

                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
        {
          color && (
            <button
              className="bt-next"
              type="button"
              data-testid="btn-next"
              onClick={ this.clickNext }
            >
              Próxima Pergunta
            </button>)
        }

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

// Game.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };
Game.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Game);
