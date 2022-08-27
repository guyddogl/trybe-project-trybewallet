import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';

const { history } = renderWithRouterAndRedux(<App />);
const { pathname } = history.location;
const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';

beforeEach(() => {
  renderWithRouterAndRedux(<App />);
});

describe('Testa se a página de login renderiza corretamente', () => {
  test('Verifica se a rota está correta', () => {
    expect(pathname).toBe('/');
  });
  test('Verifica se o input e-mail existe', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica se o input password existe', () => {
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(inputPassword).toBeInTheDocument();
  });
  test('Verifica se o botão Entrar existe', () => {
    const buttonEntrar = screen.getByText('Entrar');
    expect(buttonEntrar).toBeInTheDocument();
  });
  test('Verifica se os inputs são validados', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const buttonEntrar = screen.getByText('Entrar');
    userEvent.type(inputEmail, 'email');
    userEvent.type(inputPassword, '12345');
    expect(buttonEntrar).toHaveAttribute('disabled');
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '123456');
    expect(buttonEntrar).not.toHaveAttribute('disabled');
  });
  test('Verifica se ao entrar a rota está correta', () => {
    const inputEmail = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    userEvent.type(inputEmail, 'teste@email.com');
    userEvent.type(inputPassword, '123456');
    const buttonEntrar = screen.getByText('Entrar');
    userEvent.click(buttonEntrar);
    expect(pathname).toBe('/');
  });
});
