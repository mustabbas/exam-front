const FETCHING_TESTS = 'FETCHING_TESTS';
const FETCH_TESTS = 'FETCH_TESTS';

export const fetchingTest = (payload) => ({
    type: FETCHING_TESTS,
});

export const fetchTest = (payload) => ({
  type: FETCH_TESTS,
  payload,
});

const initialState = {
  tests: [],
  loading: false,
  isFecthingDone:false,
  error: null,
};

const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TESTS:
        return { ...state, loading:true };
    case FETCH_TESTS:
      return { ...state, tests: action.payload,loading:false,isFecthingDone:true };
    default:
      return state;
  }
};

export default testsReducer;