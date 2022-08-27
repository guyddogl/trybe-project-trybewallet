import getCurrencies from '../../services';

export const SAVE_USER = 'SAVE_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const actionSaveUser = (payload) => ({ type: SAVE_USER, payload });

const actionGetCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const getCurrenciesThunk = () => async (dispatch) => {
  const apiResponse = await getCurrencies();
  dispatch(actionGetCurrencies(apiResponse));
};

export const actionAddExpense = (payload) => ({ type: ADD_EXPENSE, payload });
export const actionDeleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
