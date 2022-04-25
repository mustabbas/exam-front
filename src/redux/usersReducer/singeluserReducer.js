const FETCHING_SINGEL_USER = 'FETCHING_SINGEL_USER';
const FETCH_SINGEL_USER = 'FETCH_SINGEL_USER';

export const fetchingSingelUser = () => ({
    type: FETCHING_SINGEL_USER,
});

export const fetchSingelUser = (payload) => ({
  type: FETCH_SINGEL_USER,
  payload,
});

const initialState = {
  user: [],
  loading: false,
  isFecthingDone:false,
  error: null,
};

const singelUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SINGEL_USER:
        return { ...state, loading:true };
    case FETCH_SINGEL_USER:
      return { ...state, user: action.payload,loading:false,isFecthingDone:true };
    default:
      return state;
  }
};

export default singelUserReducer;