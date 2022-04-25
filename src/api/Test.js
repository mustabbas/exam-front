import {fetchingTest,fetchTest} from '../redux/testsReducer/testsReducer';
import {fetchingSingelTest,fetchSingelTest} from '../redux/testsReducer/singelTestReducer';
import {addingTest,addTestDone} from '../redux/testsReducer/addTest';

const BASE_URL = 'https://mustexamapi.herokuapp.com/api/v1';
// const BASE_URL = 'http://127.0.0.1:3000/api/v1';

export const AddTestAction = (data,userToken) => async(dispatch) => {
    dispatch(addingTest());
    const formData = new FormData()
    formData.append('nameTest', data.nameTest);
    formData.append('descriptionTest', data.descriptionTest);
    formData.append('QuestionData', JSON.stringify(data.question));
    await fetch(`${BASE_URL}/test/create`, {
      method: 'POST',
      headers: {
        'Authorization': `${userToken}`,
      },
      body: formData,
    }).then((res) => res.json())
    .then((resResponse) => dispatch(addTestDone(resResponse)));  
};

export const GetTestAction = (userToken) => async(dispatch) => {
  dispatch(fetchingTest());
  await fetch(`${BASE_URL}/test`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => dispatch(fetchTest(resResponse)));  
};

export const GetSingelTestAction = (id,userToken) => async(dispatch) => {
  dispatch(fetchingSingelTest());
  await fetch(`${BASE_URL}/test/${id}/edit`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => dispatch(fetchSingelTest(resResponse)));  
};

export const UpdateTestAction = (id,data,userToken) => async(dispatch) => {
  dispatch(addingTest());
  const formData = new FormData()
  formData.append('nameTest', data.nameTest);
  formData.append('descriptionTest', data.descriptionTest);
  formData.append('QuestionData', JSON.stringify(data.question));
  await fetch(`${BASE_URL}/test/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `${userToken}`,
    },
    body: formData,
  }).then((res) => res.json())
  .then((resResponse) => dispatch(addTestDone(resResponse)));  
};

export const deleteTestAction = (id,userToken) => async(dispatch) => {
  await fetch(`${BASE_URL}/test/${id}/destroy`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${userToken}`,
    },
  }).then((res) => res.json())
  .then((resResponse) => console.log(resResponse));  
};