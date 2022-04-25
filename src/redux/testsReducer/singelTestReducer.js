const FETCHING_SINGEL_TEST = 'FETCHING_SINGEL_TEST';
const FETCH_SINGEL_TEST = 'FETCH_SINGEL_TEST';

export const fetchingSingelTest = () => ({
    type: FETCHING_SINGEL_TEST,
});

export const fetchSingelTest = (payload) => ({
  type: FETCH_SINGEL_TEST,
  payload,
});

const initialState = {
  test: [],
  loading: false,
  isFecthingDone:false,
  error: null,
};

const singelTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SINGEL_TEST:
        return { ...state, loading:true };
    case FETCH_SINGEL_TEST:
      return { ...state, test: action.payload,loading:false,isFecthingDone:true };
    default:
      return state;
  }
};

export default singelTestReducer;