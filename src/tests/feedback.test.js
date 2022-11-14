import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes para a página de feedback', () => {
  test('se ao clicar no botão PLAY AGAIN redireciona para a página inicial', ()=>{
    const { history } = renderWithRouterAndRedux(<App />);
    act(()=> {history.push('/feedback');})
    userEvent.click(screen.getByRole('button', { name: /Play Again/i }))
    expect(history.location.pathname).toBe('/') //https://stackoverflow.com/questions/60298279/spy-on-history-location-pathname-in-react-js-test
});
test('se ao clicar no botão RANKING redireciona para página de Ranking',()=>{
    const { history } = renderWithRouterAndRedux(<App />);
    act(()=>{history.push('/feedback');})
    userEvent.click(screen.getByRole('button', { name: /Ranking/i }))
    expect(history.location.pathname).toBe('/ranking') //https://stackoverflow.com/questions/60298279/spy-on-history-location-pathname-in-react-js-test
});
})