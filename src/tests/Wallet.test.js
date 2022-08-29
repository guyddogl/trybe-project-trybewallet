import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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
const BUTTON_ADD_TEST_ID = 'Adicionar despesa';
const BUTTON_SAVE_EDIT = 'Editar despesa';

afterEach(() => jest.clearAllMocks());

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

  test('Verificar se ao adicionar uma despesa os inputs são resetados', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
    const inputValor = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const buttonADD = screen.getByRole('button', { name: BUTTON_ADD_TEST_ID });
    userEvent.type(inputValor, '77');
    userEvent.type(inputDescription, 'Minha despesa');
    userEvent.click(buttonADD);
    expect(inputValor.innerHTML).toBe('');
    expect(inputDescription.innerHTML).toBe('');
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
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
    const buttonEdit = screen.getAllByTestId(BUTTON_EDIT_TEST_ID);
    userEvent.click(buttonEdit[0]);
    const buttonSaveEdit = screen.getAllByRole('button', { name: BUTTON_SAVE_EDIT })[0];
    const inputValor = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    userEvent.type(inputValor, '77');
    userEvent.type(inputDescription, 'Descreva despesa');
    userEvent.click(buttonSaveEdit);
    const expense = [
      {
        id: 0,
        value: '77',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descreva despesa',
        exchangeRates: mockCurrencies,
      },
    ];
    waitFor(() => expect(store.getState().wallet.expenses[0]).toEqual(expense[0]));
  });

  test('Verifica se ao adicionar a despesa ela existe no state', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
    const inputValor = screen.getByTestId(VALUE_INPUT_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_INPUT_TEST_ID);
    const buttonADD = screen.getByRole('button', { name: BUTTON_ADD_TEST_ID });
    userEvent.type(inputValor, '77');
    userEvent.type(inputDescription, 'Descrição a despesa');
    userEvent.click(buttonADD);
    const expense = [
      {
        id: 3,
        value: '77',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Descrição a despesa',
        exchangeRates: mockCurrencies,
      },
    ];
    await waitFor(() => expect(store.getState().wallet.expenses[3]).toEqual(expense[0]));
  });

  const EDITOR_TRUE = {
    wallet: {
      editor: true,
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
      ],
    },
  };

  test('Verifica se ao clicar no botão excluir a despesa é excluída', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: EDITOR_TRUE });
    const buttonDelete = screen.getAllByTestId(BUTTON_DELETE_TEST_ID);
    userEvent.click(buttonDelete[0]);
    const expense = [
    ];
    expect(store.getState().wallet.expenses).toEqual(expense);
  });

  test('Verifica o fetch da API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCurrencies),
    });
    renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
  });
});
