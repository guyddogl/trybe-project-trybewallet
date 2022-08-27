import { GET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
