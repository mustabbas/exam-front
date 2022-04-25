const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
const LOGIN_DONE = 'LOGIN_DONE';

export const submitLogin = () => ({
    type: SUBMIT_LOGIN,
});

export const loginDone = (payload) => ({
  type: LOGIN_DONE,
  payload,
});

const initialState = {
  auth: [],
  loading: false,
  isFecthingDone:false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
        return { ...state, loading:true };
    case LOGIN_DONE:
      return { ...state, auth: action.payload,loading:false,isFecthingDone:true };
    default:
      return state;
  }
};

export default loginReducer;