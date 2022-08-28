import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockCurrencies from './helpers/mockCurrencies';

const STATE = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    editor: false,
    idToEdit: 0,
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descrição da despesa',
        exchangeRates: mockCurrencies,
      },
      {
        id: 1,
        value: '12',
        currency: 'CAD',
        method: 'Cartão de Crédito',
        tag: 'Alimentação',
        description: 'Lanche',
        exchangeRates: mockCurrencies,
      },
      {
        id: 2,
        value: '43',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Lazer',
        description: 'God of War',
        exchangeRates: mockCurrencies,
      },
    ],
  },
};

const VALUE_INPUT_TEST_ID = 'value-input';
const DESCRIPTION_INPUT_TEST_ID = 'description-input';
const TOTAL_FIELD_TEST_ID = 'total-field';
const CURRENCY_FIELD_TEST_ID = 'header-currency-field';
const BUTTON_EDIT_TEST_ID = 'edit-btn';
const BUTTON_DELETE_TEST_ID = 'delete-btn';

describe('Testa a page Wallet', () => {
  test('Verifica se ao renderizar a rota está correta', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verifica se os inputs (Valor, Descrição) e os campos Total Field e Currency existem', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValor = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const currencyField = screen.getByTestId(CURRENCY_FIELD_TEST_ID);
    expect(inputValor).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão excluir a despesa é excluída', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
    const buttonDelete = screen.getAllByTestId(BUTTON_DELETE_TEST_ID);
    userEvent.click(buttonDelete[0]);
    userEvent.click(buttonDelete[1]);
    const expense = [
      {
        id: 2,
        value: '43',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Lazer',
        description: 'God of War',
        exchangeRates: mockCurrencies,
      },
    ];
    expect(store.getState().wallet.expenses).toEqual(expense);
  });

  test('Verifica se ao clicar no botão editar a despesa é editada', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
    const buttonEdit = screen.getAllByTestId(BUTTON_EDIT_TEST_ID);
    userEvent.click(buttonEdit[2]);
  });
});
