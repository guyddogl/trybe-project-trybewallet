import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

function userReducer(state = INITIAL_STATE, action) {
  console.log(action.payload);
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
