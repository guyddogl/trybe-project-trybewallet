import getCurrencies from '../../services';

export const SAVE_USER = 'SAVE_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function saveUser(payload) {
  return {
    type: SAVE_USER,
    payload,
  };
}

function actionTypeCurrencies(payload) {
  return {
    type: GET_CURRENCIES,
    payload,
  };
}

export const getCurrenciesThunk = () => async (dispatch) => {
  const apiResponse = await getCurrencies();
  dispatch(actionTypeCurrencies(apiResponse));
};
