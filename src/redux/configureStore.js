import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import testsReducer from './testsReducer/testsReducer';
import singelTestReducer from './testsReducer/singelTestReducer';
import usersReducer from './usersReducer/usersReducer';
import singelUserReducer from './usersReducer/singeluserReducer';
import loginReducer from './usersReducer/LoginReducer';
import addTestsReducer from './testsReducer/testsReducer';

const reducers = combineReducers({
    testsReducer,
    singelTestReducer,
    usersReducer,
    singelUserReducer,
    loginReducer,
    addTestsReducer
});
export default createStore(reducers, applyMiddleware(thunk, reduxLogger));
