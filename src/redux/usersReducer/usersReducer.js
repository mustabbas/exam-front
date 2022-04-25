const FETCHING_USERS = 'FETCHING_USERS';
const FETCH_USERS = 'FETCH_USERS';

export const fetchingUser = (payload) => ({
    type: FETCHING_USERS,
});

export const fetchUser = (payload) => ({
  type: FETCH_USERS,
  payload,
});

const initialState = {
  users: [],
  loading: false,
  isFecthingDone:false,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
        return { ...state, loading:true };
    case FETCH_USERS:
      return { ...state, users: action.payload,loading:false,isFecthingDone:true };
    default:
      return state;
  }
};

export default usersReducer;