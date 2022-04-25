const ADDING_TESTS = 'ADDING_TESTS';
const ADDING_TESTS_DONE = 'ADD_TESTS_DONE';

export const addingTest = () => ({
    type: ADDING_TESTS,
});

export const addTestDone = (payload) => ({
  type: ADDING_TESTS_DONE,
  payload,
});

const initialState = {
  tests: [],
  loading: false,
  isAdd:false,
  error: null,
};

const addTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_TESTS:
        return { ...state, loading:true };
    case ADDING_TESTS_DONE:
      return { ...state, tests: action.payload,loading:false,isAdd:true };
    default:
      return state;
  }
};

export default addTestsReducer;