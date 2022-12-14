import getCurrencies from '../../services';

export const SAVE_USER = 'SAVE_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EDITOR_FALSE = 'SET_EDITOR_FALSE';

export const actionSaveUser = (payload) => ({ type: SAVE_USER, payload });
export const actionAddExpense = (payload) => ({ type: ADD_EXPENSE, payload });
export const actionDeleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
export const actionEditExpense = (payload) => ({ type: EDIT_EXPENSE, payload });
export const actionSetEditorFalse = (payload) => ({ type: SET_EDITOR_FALSE, payload });
export const actionGetCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });

export const getCurrenciesThunk = () => async (dispatch) => {
  const apiResponse = await getCurrencies();
  dispatch(actionGetCurrencies(apiResponse));
};
